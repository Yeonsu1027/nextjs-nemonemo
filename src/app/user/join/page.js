"use client";
import { findByUser, joinUser } from "@/app/api/members";
import "@/css/join.css";
import { useState } from "react";

const Join = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    m_id: "",
    m_pw: "",
    re_pw: "",
    m_nick: "",
  });

  const joinHandler = async () => {
    const { m_id, m_pw, re_pw } = formData;

    if (!m_id) {
      setMessage("id를 입력해주세요");
      return;
    }
    const result = await findByUser(m_id);

    if (result != null) {
      setMessage("이미 사용중인 id입니다");
      return;
    }
    if (!m_pw) {
      setMessage("비밀번호를 입력해주세요");
      return;
    }
    if (!re_pw) {
      setMessage("비밀번호 확인을 입력해주세요");
      return;
    }
    if (m_pw !== re_pw) {
      setMessage("비밀번호와 비밀번호확인 값이 다릅니다.");
      return;
    }

    await joinUser(formData);

    alert("회원가입이 완료되었습니다!");
    window.location.href = "/user/login";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <form className="join">
        <div>{message}</div>
        <div>
          <input
            placeholder="ID"
            name="m_id"
            value={formData.m_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="비밀번호"
            name="m_pw"
            type="password"
            value={formData.m_pw}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="비밀번호확인"
            className="re_pw"
            name="re_pw"
            type="password"
            value={formData.re_pw}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            placeholder="NICKNAME"
            name="m_nick"
            value={formData.m_nick}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="button"
            className="join button"
            onClick={joinHandler}
          >
            회원가입
          </button>
        </div>
      </form>
    </>
  );
};

export default Join;
