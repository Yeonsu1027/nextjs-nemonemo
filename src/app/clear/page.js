"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findClearData } from "@/app/api/clear";

const clearpage = () => {
  useEffect(() => {
    const userid = localStorage.getItem("loginId");
    // 로그인안했으면 로그인페이지로
    if (!userid) {
      window.location.href = "/user/login";
    }
  });
  // ----------------------------

  const router = useRouter();
  const [clearData, setClearData] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(true); // 로딩
  const [isCrayonVisible, setIsCrayonVisible] = useState(false);

  const handleClick = async () => {
    router.push("/");
  };

  const handleAnimationEnd = () => {
    setIsCrayonVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllClearData();
        setClearData(data);
      } catch (error) {
        console.error("Error fetching clear data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchAllClearData = async () => {
    const clearData = [];
    for (let i = 1; i <= 5; i++) {
      try {
        const userid = localStorage.getItem("loginId");
        const data = await findClearData(userid, i);
        if (data) clearData.push(data);
      } catch (error) {
        console.error(
          `Error fetching clear data for level ${i}:`,
          error
        );
      }
    }
    console.log("클리어데이터", clearData);
    return clearData;
  };

  const getImageSrc = () => {
    if (
      clearData[0]?.c_clear === 1 &&
      clearData[1]?.c_clear !== 1 &&
      clearData[2]?.c_clear !== 1 &&
      clearData[3]?.c_clear !== 1 &&
      clearData[4]?.c_clear !== 1
    ) {
      return "/img/smile.png";
    } else if (
      clearData[0]?.c_clear === 1 &&
      clearData[1]?.c_clear === 1 &&
      clearData[2]?.c_clear !== 1 &&
      clearData[3]?.c_clear !== 1 &&
      clearData[4]?.c_clear !== 1
    ) {
      return "/img/fish.png";
    } else if (
      clearData[0]?.c_clear === 1 &&
      clearData[1]?.c_clear === 1 &&
      clearData[2]?.c_clear === 1 &&
      clearData[3]?.c_clear !== 1 &&
      clearData[4]?.c_clear !== 1
    ) {
      return "/img/jellyfish.png";
    } else if (
      clearData[0]?.c_clear === 1 &&
      clearData[1]?.c_clear === 1 &&
      clearData[2]?.c_clear === 1 &&
      clearData[3]?.c_clear === 1 &&
      clearData[4]?.c_clear !== 1
    ) {
      return "/img/whale.png";
    } else if (
      clearData[0]?.c_clear === 1 &&
      clearData[1]?.c_clear === 1 &&
      clearData[2]?.c_clear === 1 &&
      clearData[3]?.c_clear === 1 &&
      clearData[4]?.c_clear === 1
    ) {
      return "/img/octopus.png";
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setIsCrayonVisible(true); // 크레용도 로딩끝나고 나오게
  };

  return (
    <div className="HM-main_body">
      <div className="clear_picture">
        {isImageLoading && <div className="spinner">Looding ...</div>}
        <img
          className={`fade-in ${isImageLoading ? "hidden" : ""}`}
          src={getImageSrc()}
          alt="clear image"
          onLoad={handleImageLoad}
          onClick={handleClick}
        />
      </div>
      {isCrayonVisible && (
        <img
          className="crayon"
          src="/img/crayon.png"
          onAnimationEnd={handleAnimationEnd}
        />
      )}
      {!isImageLoading && (
        <div className="clear_page_msg_box">
          <h1 className="clear_msg_new">
            <span>완</span>
            <span>성</span>
            <span>했</span>
            <span>어</span>
            <span>!</span>
            <span>!</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default clearpage;
