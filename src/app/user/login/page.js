"use client";
import { loginUser } from "@/app/api/members";
import "@/css/join.css";
import "@/css/ys_join.css";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    m_id: "",
    m_pw: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loginHandler = async () => {
    const { m_id, m_pw } = formData;
    const result = await loginUser(m_id, m_pw);
    if (!m_id) {
      setMessage("ID를 입력해주세요");
      return;
    }
    if (!m_pw) {
      setMessage("비밀번호를 입력해주세요");
      return;
    }
    if (!result) {
      setMessage("ID 또는 비밀번호를 확인해주세요");
      return;
    } else {
      localStorage.setItem("loginId", m_id);
      window.location.href = "/";
    }
  };

  return (
    <>
      <form method="POST" className="join">
        <div>{message}</div>
        <div>
          <input
            placeholder="ID"
            name="m_id"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="PASSWORD"
            name="m_pw"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="button"
            className="button"
            onClick={loginHandler}
          >
            로그인
          </button>

          <Link className="join_link button" href="/user/join">
            회원가입
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
