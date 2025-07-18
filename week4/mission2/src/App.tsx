import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

const router = createBrowserRouter([
  {
    path: "/", // 홈 경로
    element: <HomeLayout />, // element에는 대부분 공유하는 레이아웃들을 적어줌
    errorElement: <NotFoundPage />, // 에러났을 경우
    children: [
      { index: true, element: <HomePage /> }, // 홈 경로를 의미
      { path: "login", element: <LoginPage /> }, // 로그인 페이지
      { path: "signup", element: <SignupPage /> }, // 회원가입 페이지
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />; // 라우터 연결
}

export default App;
