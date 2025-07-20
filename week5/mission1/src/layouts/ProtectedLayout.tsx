import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  // 현재 로그인 상태(accessToken)를 context에서 가져옴
  const { accessToken } = useAuth();

  // accessToken이 없으면 → 로그인하지 않은 상태이므로 /login으로 이동
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
    // replace를 주면 뒤로가기 눌러도 /login 이전 경로로 안 돌아감
  }

  // accessToken이 존재하면 → 로그인된 상태이므로 하위 라우트 렌더링
  return <Outlet />;
};

export default ProtectedLayout;
