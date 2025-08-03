import type { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null); // 응답 데이터를 저장할 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지를 저장할 상태
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 중 여부를 저장할 상태

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // 요청 시작 시 로딩 상태로 설정
      try {
        const { data } = await axiosClient.get(url, { ...options });
        setData(data);
      } catch {
        setError("데이터를 가져오는데 에러가 발생했습니다.");
      } finally {
        setIsLoading(false); // 요청 종료 시 로딩 상태 해제
      }
    };
    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
