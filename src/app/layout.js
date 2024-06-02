"use client";
import { useEffect, useState } from "react";
import "@/css/main.css";
import "@/css/main_screen.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const [userid, setUserid] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserid = localStorage.getItem("loginId");
    setUserid(storedUserid);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginId");
    setUserid(null);
    // router.push("/"); // 로그아웃 후 홈 페이지로 이동 - 홈에서 로그아웃하면 화면남음
    window.location.reload(); // 새로고침.. 모든게임화면에서 로그인검사 추가
  };

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gaegu&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Gasoek+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="HM-main_container">
        <header className="HM-main_header">
          <div className="HM-main_sketch"></div>
        </header>
        <div className="HM-main_body">{children}</div>
        <nav className="HM-main_nav">
          <ul>
            <li>
              <Link href="/">홈</Link>
            </li>
            {!userid ? (
              <>
                <li>
                  <Link href="/user/join">회원가입</Link>
                </li>
                <li>
                  <Link href="/user/login">로그인</Link>
                </li>
              </>
            ) : (
              <li>
                <a href="#" onClick={handleLogout}>
                  로그아웃
                </a>
              </li>
            )}
          </ul>
        </nav>
      </body>
    </html>
  );
}
