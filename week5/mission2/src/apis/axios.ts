import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

/*
  - 요청 인터셉터 : accessToken을 매 요청 헤더에 자동으로 붙여줌
  - 응답 인터셉터 : 응답이 401일 경우 -> refreshToken으로 재발급 시도
                    성공하면 -> 원래 요청을 한 번만 재시도
                    실패하면 -> 토큰 다 지우고 /login 으로 보냄
  - 중복 요청 방지 : refreshPromise를 공유해서 동시에 여러 401이 떠도 딱 한 번만 refresh 요청
*/

// axios 요청 설정에 사용할 커스텀 인터페이스
// _retry는 이 요청이 재시도된 것인지 여부를 나타내는 플래그
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 하나의 전역 Promise 변수로 refresh 요청을 관리하여 중복 요청 방지
let refreshPromise: Promise<string> | null = null;

// axios 인스턴스 생성 (모든 API 요청은 이 인스턴스를 통해 보내짐)
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// ✅ 요청 인터셉터 : 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // LocalStorage에서 accessToken을 가져옴
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 붙여서 인증 정보 전달
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 config를 반환해야 요청이 실제 전송됨
    return config;
  },
  // 요청 인터셉터에서 에러가 발생한 경우
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터 : 401 에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 성공적이면 그대로 전달

  async (error) => {
    // 실패한 요청 객체 (재시도 여부를 확인하기 위해 커스텀 타입 사용)
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 1. 인증 실패(401)이며, 아직 재시도한 적 없는 요청인 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // 1-1. 리프레시 토큰 자체도 만료된 경우 (로그인 페이지로 강제 이동)
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        // 새로고침 또는 리다이렉트로 로그인 페이지로 유도
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 1-2. 아직 재시도하지 않은 요청이므로, 재시도 플래그를 설정
      originalRequest._retry = true;

      // 1-3. 현재 진행 중인 refresh 요청이 없다면 새로 요청
      if (!refreshPromise) {
        // refresh 요청 실행 후, 프라미스를 전역 변수에 할당.
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          // refresh token을 이용해서 새로운 access token을 요청
          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          // 새 토큰을 localStorage에 저장
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );

          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          // 새 accessToken을 리턴해서 다음 로직에서 사용되게 함
          return data.data.accessToken;
        })()
          .catch((error) => {
            // refresh 요청도 실패한 경우: 로그인 유지 불가 → 로그아웃 처리
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            // refreshPromise가 끝났으면 null로 초기화해서 다음 요청을 받을 준비
            refreshPromise = null;
          });
      }

      // 1-4. refreshPromise가 완료되면 → 원래 요청에 새 토큰으로 Authorization 헤더 붙이고 재시도
      return refreshPromise.then((newAccessToken) => {
        // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업뎃
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 업데이트 된 원본 요청을 재시도
        return axiosInstance.request(originalRequest);
      });
    }

    // 2. 401이 아닌 다른 오류라면 그냥 에러 반환
    return Promise.reject(error);
  }
);
