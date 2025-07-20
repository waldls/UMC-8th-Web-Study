import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./context/AuthContext";
import MyPage from "./pages/MyPage";
import ProtectedLayout from "./layouts/ProtectedLayout";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
];

// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

// public + protected 라우트를 모두 포함시켜 하나의 라우터 구성
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    // 전역 인증 상태를 위한 Provider로 감싸기
    <AuthProvider>
      {/* 생성한 라우터를 application에 적용 */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
