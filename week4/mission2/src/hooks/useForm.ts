import { ChangeEvent, useEffect, useState } from "react";

// useForm을 사용할 때 넘길 props 타입 정의
interface UseFormProps<T> {
  initialValue: T; // 폼의 초기 값 (예: { email: '', password: '' })
  validate: (values: T) => Record<keyof T, string>;
  // 값을 검증하는 함수. 예: 이메일 형식이 맞는지 확인해서 오류 메시지를 리턴
}

// 제네릭 타입 T를 사용하여 어떤 폼에도 재사용 가능하도록 설계
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  // 실제 입력값 저장 (예: { email: 'abc@naver.com', password: '1234' })
  const [values, setValues] = useState(initialValue);

  // 어떤 인풋이 focus되었다가 빠졌는지 추적 (예: { email: true, password: false })
  const [touched, setTouched] = useState<Record<string, boolean>>();

  // 에러 메시지 저장 (예: { email: '이메일이 유효하지 않습니다' })
  const [errors, setErrors] = useState<Record<string, string>>();

  // 입력값이 바뀔 때마다 실행되는 함수 (예: 이메일에 글자를 입력할 때)
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 이전 값 복사해서 유지
      [name]: text, // 해당 필드만 새 값으로 바꿈
    });
  };

  // 인풋에서 포커스가 빠졌을 때 실행 (touched 상태 true로 설정)
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 특정 필드에 대해 value, onChange, onBlur 등을 자동으로 바인딩해주는 함수
  const getInputProps = (name: keyof T) => {
    const value = values[name]; // 해당 인풋의 현재 값

    // 사용자가 입력할 때 실행되는 이벤트 핸들러
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    // 인풋 포커스가 해제될 때 실행되는 핸들러
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur }; // 인풋에 바로 spread로 쓸 수 있음
  };

  // 입력값이 바뀔 때마다 검증 로직 실행 -> 에러 메시지 업데이트
  useEffect(() => {
    const newErrors = validate(values); // 검증 함수 실행해서 에러 가져옴
    setErrors(newErrors); // 에러 상태 업데이트
  }, [validate, values]); // values나 validate 함수가 바뀔 때마다 실행됨

  // 훅을 사용하는 컴포넌트에게 제공하는 값들
  return { values, errors, touched, getInputProps };
}

export default useForm;
