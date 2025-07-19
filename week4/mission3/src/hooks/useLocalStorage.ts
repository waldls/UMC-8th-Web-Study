// LocalStorage를 다루는 커스텀 훅
// key를 기준으로 값 저장, 가져오기, 삭제 기능 제공

export const useLocalStorage = (key: string) => {
  // 로컬 스토리지에 값 저장
  const setItem = (value: unknown) => {
    try {
      // JSON 문자열로 변환 후 저장
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  // 로컬 스토리지에서 값 가져오기
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      // 문자열을 다시 객체로 파싱
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.log(e);
    }
  };

  // 로컬 스토리지에서 해당 key 삭제
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};
