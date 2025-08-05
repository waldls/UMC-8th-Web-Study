import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";

type NavbarProps = {
  onHoverChange: (hovered: boolean) => void;
};

const Navbar = ({ onHoverChange }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const { data: userInfo, isSuccess } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    staleTime: 1000 * 60,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="relative bg-black dark:bg-gray-100 shadow-md w-full z-10">
      <div className="flex items-center justify-between flex-wrap p-4">
        {/* ☰ 아이콘 */}
        <div
          onMouseEnter={() => onHoverChange(true)}
          onMouseLeave={() => onHoverChange(false)}
          className="text-2xl mr-4 cursor-pointer text-pink-600"
        >
          ☰
        </div>

        {/* 타이틀 */}
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 text-base md:text-xl font-bold text-pink-600 dark:text-black text-center whitespace-nowrap"
        >
          SpinningSpinning Dolimpan 🌀
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex items-center gap-x-4 ml-auto">
          {!accessToken ? (
            <>
              <Link
                to="/login"
                className="text-sm  text-pink-600 dark:text-black hover:text-pink-700"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-sm  text-pink-600 dark:text-black hover:text-pink-700"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              {accessToken && isSuccess && (
                <span className="text-sm  text-pink-600 dark:text-black whitespace-nowrap truncate max-w-[150px]">
                  {userInfo?.data.name}님 반갑습니다.
                </span>
              )}

              <button
                onClick={handleLogout}
                className="text-sm text-pink-600 dark:text-black hover:text-pink-700"
              >
                로그아웃
              </button>
              <Link
                to="/my"
                className="text-sm  text-pink-600 dark:text-black hover:text-pink-700"
              >
                마이 페이지
              </Link>
            </>
          )}
          <Link
            to="/search"
            className="text-sm  text-pink-600 dark:text-black hover:text-pink-700"
          >
            검색
          </Link>
        </div>

        {/* 모바일 메뉴 (선택적으로 드롭다운이나 메뉴 아이콘 가능) */}
        <div className="md:hidden ml-auto">
          {/* 여기에 모바일 메뉴 버튼 넣을 수 있음 */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
