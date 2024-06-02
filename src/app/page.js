"use client";
import { useEffect, useState } from "react";
// import { selectAll } from "@/app/api/speech";
import { findClearData } from "@/app/api/clear.js";
// import { useRouter } from "next/navigation";
import Speech from "./script/speech";
import Speech2 from "./script/speech2";
import { speech_SelectAll } from "./api/speeches";

export default function Main() {
  // 로그인 여부 확인
  useEffect(() => {
    const userid = localStorage.getItem("loginId");
    // 로그인안했으면 로그인페이지로
    if (!userid) {
      window.location.href = "/user/login";
    }
  });
  //------------------스피치
  const [currentLevel, setCurrentLevel] = useState(null); // 현재 레벨을 상태로 유지합니다.
  const [speeches, setSpeeches] = useState([]);
  useEffect(() => {
    const fetchSpeeches = async () => {
      const response = await speech_SelectAll();
      console.log(response);
      setSpeeches(response);
    };
    fetchSpeeches();
  }, []);

  //--------------------------------------------

  const speechclick = (e) => {
    console.log("?");
    const target = Number(
      e.target.closest("div").id.split("LEVEL")[1]
    );
    console.log(target);
    setCurrentLevel(target);
  };

  // boss가 section 이어서..
  const speechclickboss = (e) => {
    console.log("?");
    const target = Number(
      e.target.closest("section").id.split("LEVEL")[1]
    );
    console.log(target);
    setCurrentLevel(target);
  };

  const [clearData, setClearData] = useState([]);
  // 레벨4끝나고나면 클릭하게 깜빡이는용도
  const [animationComplete, setAnimationComplete] = useState(false);
  // 보스스테이지 등장 용도
  const [onclickboss, setOnclickboss] = useState(false);
  // 날짜 표시
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  // 화면뜰때 처리할것들
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
    const date = new Date();
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth() + 1);
    setCurrentDay(date.getDate());
  }, []);
  // ----------------------

  // 클리어데이터가져오기
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
  // 4레벨 그림 나타나고 전부다 깜빡이는 용도
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };
  // 보스스테이지 나오는 용도
  const bossstage = () => {
    setOnclickboss(true);
  };

  // 보스스테이지 용도2 - 4단계까지 다진행되야 눌렀을때 보스나오게
  const handleClick = (event, condition, callback) => {
    if (condition) {
      callback(event);
    }
  };

  //----------------------

  // const viewList = speech.map((item, index) => (
  //   <li key={index}>
  //     <strong>{item.s_speaker}</strong>
  //   </li>
  // ));

  return (
    <main>
      <div className="HM-home_container">
        <div className="HM-home_top">
          <div className="HM-home_first_menu">
            <div className="HM-home_weather">
              <label>
                <span>날씨</span>
              </label>
            </div>
            <div className="HM-home_img">
              <img src="/img/sun.png" alt="Sun" />
              <img src="/img/cloud.png" alt="Cloud" />
              <img src="/img/rainy.png" alt="Rainy" />
              <img src="/img/snow.png" alt="Snow" />
            </div>
            <div>
              <label className="HM-home_cal">
                <span>{currentYear}년</span>{" "}
                <span>{currentMonth}월</span>{" "}
                <span>{currentDay}일</span>
              </label>
            </div>
          </div>
          <div className="HM-home_second_menu">
            <label>제목 : 수족관을 다녀왔다!</label>
          </div>
        </div>
        {clearData.length > 0 && clearData[4]?.c_clear !== 1 && (
          <div className="HM-home_picture">
            <div>
              <div id="LEVEL3" className="YS_p_div">
                {clearData.length > 0 &&
                clearData[2]?.c_clear === 1 ? (
                  <img
                    className={`YS_picture_c ${
                      clearData[0]?.c_clear === 1 &&
                      clearData[1]?.c_clear === 1 &&
                      clearData[2]?.c_clear === 1 &&
                      clearData[3]?.c_clear !== 1
                        ? "fade-in"
                        : ""
                    }${animationComplete ? "next_level5" : ""}`}
                    src="/img/jellyfish.png"
                    alt="jellyfish Image"
                    width={200}
                    height={200}
                    onClick={(e) =>
                      handleClick(e, animationComplete, bossstage)
                    }
                  />
                ) : (
                  <img
                    className={`YS_picture ${
                      clearData[0]?.c_clear === 1 &&
                      clearData[1]?.c_clear === 1 &&
                      clearData[2]?.c_clear !== 1 &&
                      clearData[3]?.c_clear !== 1
                        ? "next_level"
                        : ""
                    }`}
                    src="/img/question.png"
                    alt="Question Image"
                    width={200}
                    height={200}
                    onClick={speechclick}
                  />
                )}
              </div>
              <div id="LEVEL1" className="YS_p_div">
                {clearData.length > 0 &&
                clearData[0]?.c_clear === 1 ? (
                  <img
                    className={`YS_picture_c ${
                      clearData[0]?.c_clear === 1 &&
                      clearData[1]?.c_clear !== 1 &&
                      clearData[2]?.c_clear !== 1 &&
                      clearData[3]?.c_clear !== 1
                        ? "fade-in"
                        : ""
                    }${animationComplete ? "next_level5" : ""}`}
                    src="/img/smile.png"
                    alt="Smile Image"
                    width={200}
                    height={200}
                    onClick={(e) =>
                      handleClick(e, animationComplete, bossstage)
                    }
                  />
                ) : (
                  <img
                    className={`YS_picture ${
                      clearData[0]?.c_clear !== 1 &&
                      clearData[1]?.c_clear !== 1 &&
                      clearData[2]?.c_clear !== 1 &&
                      clearData[3]?.c_clear !== 1
                        ? "next_level"
                        : ""
                    }`}
                    src="/img/question.png"
                    alt="Question Image"
                    width={200}
                    height={200}
                  />
                )}
              </div>
            </div>
            <div>
              <div id="LEVEL4" className="YS_p_div">
                {clearData.length > 0 &&
                clearData[3]?.c_clear === 1 ? (
                  <img
                    className={`YS_picture_c ${
                      clearData[0]?.c_clear === 1 &&
                      clearData[1]?.c_clear === 1 &&
                      clearData[2]?.c_clear === 1 &&
                      clearData[3]?.c_clear === 1
                        ? "fade-in"
                        : ""
                    } ${animationComplete ? "next_level5" : ""}`}
                    src="/img/whale.png"
                    alt="whale Image"
                    width={200}
                    height={200}
                    onAnimationEnd={handleAnimationEnd}
                    onClick={(e) =>
                      handleClick(e, animationComplete, bossstage)
                    }
                  />
                ) : (
                  <img
                    className={`YS_picture ${
                      clearData[0]?.c_clear === 1 &&
                      clearData[1]?.c_clear === 1 &&
                      clearData[2]?.c_clear === 1 &&
                      clearData[3]?.c_clear !== 1
                        ? "next_level"
                        : ""
                    }`}
                    src="/img/question.png"
                    alt="Question Image"
                    width={200}
                    height={200}
                    onClick={speechclick}
                  />
                )}
              </div>
              <div id="LEVEL2" className="YS_p_div">
                {clearData.length > 0 &&
                clearData[1]?.c_clear === 1 ? (
                  <img
                    className={`YS_picture_c ${
                      clearData[0]?.c_clear === 1 &&
                      clearData[1]?.c_clear === 1 &&
                      clearData[2]?.c_clear !== 1 &&
                      clearData[3]?.c_clear !== 1
                        ? "fade-in"
                        : ""
                    }${animationComplete ? "next_level5" : ""}`}
                    src="/img/fish.png"
                    alt="fish Image"
                    width={200}
                    height={200}
                    onClick={(e) =>
                      handleClick(e, animationComplete, bossstage)
                    }
                  />
                ) : (
                  <img
                    className={`YS_picture ${
                      clearData[0]?.c_clear === 1 &&
                      clearData[1]?.c_clear !== 1 &&
                      clearData[2]?.c_clear !== 1 &&
                      clearData[3]?.c_clear !== 1
                        ? "next_level"
                        : ""
                    }`}
                    src="/img/question.png"
                    alt="Question Image"
                    width={200}
                    height={200}
                    onClick={speechclick}
                  />
                )}
              </div>
            </div>
            <section
              className={`ex-mark ${onclickboss ? "" : "hidden"}`}
              id="LEVEL5"
            >
              <img
                className="YS_picture next_level"
                src="img/ex-mark.png"
                onClick={speechclickboss}
              />
            </section>
          </div>
        )}
        {clearData.length === 0 && (
          <div className="HM-home_picture">
            <div>
              <div id="LEVEL3" className="YS_p_div">
                <img
                  className="YS_picture"
                  src="/img/question.png"
                  alt="Question Image"
                  width={200}
                  height={200}
                />
              </div>
              <div id="LEVEL1" className="YS_p_div">
                <img
                  className="YS_picture next_level"
                  src="/img/question.png"
                  alt="Question Image"
                  width={200}
                  height={200}
                  onClick={speechclick}
                />
              </div>
            </div>
            <div>
              <div id="LEVEL4" className="YS_p_div">
                <img
                  className="YS_picture"
                  src="/img/question.png"
                  alt="Question Image"
                  width={200}
                  height={200}
                />
              </div>
              <div id="LEVEL2" className="YS_p_div">
                <img
                  className="YS_picture"
                  src="/img/question.png"
                  alt="Question Image"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        )}

        {clearData.length > 0 && clearData[4]?.c_clear === 1 && (
          <>
            <div className="complete_img_box">
              <img
                className="YS_picture fade-in"
                src="/img/complete_img.png"
              />
            </div>
            <section className="ex-mark hidden" id="LEVEL5">
              <img
                className="YS_picture next_level"
                src="img/ex-mark.png"
              />
            </section>
          </>
        )}

        <h1
          className={`clear_msg ${
            clearData[4]?.c_clear === 1 ? "show_clear fade-in" : ""
          }`}
        >
          <span>C</span>
          <span>L</span>
          <span>E</span>
          <span>A</span>
          <span>R</span>
          <span>!</span>
        </h1>
        <div className="HM-home_diary">
          {clearData.length > 0 && clearData[0]?.c_clear === 1 ? (
            <section className="YS_border-bottom ">
              <h2
                className={`YS_diary_row ${
                  clearData[1]?.c_clear !== 1 &&
                  clearData[2]?.c_clear !== 1 &&
                  clearData[3]?.c_clear !== 1
                    ? "fade-in"
                    : ""
                }`}
              >
                어제 수족관에 놀러갔었다!
              </h2>
            </section>
          ) : (
            <section className="YS_border-bottom">
              <h2 className="YS_diary_row_n">　</h2>
            </section>
          )}
          {clearData.length > 0 && clearData[1]?.c_clear === 1 ? (
            <section className="YS_border-bottom">
              <h2
                className={`YS_diary_row ${
                  clearData[0]?.c_clear === 1 &&
                  clearData[2]?.c_clear !== 1 &&
                  clearData[3]?.c_clear !== 1
                    ? "fade-in"
                    : ""
                }`}
              >
                작고 귀여운 흰 동가리도 보고
              </h2>
            </section>
          ) : (
            <section className="YS_border-bottom">
              <h2 className="YS_diary_row_n">　</h2>
            </section>
          )}
          {clearData.length > 0 && clearData[2]?.c_clear === 1 ? (
            <section className="YS_border-bottom">
              <h2
                className={`YS_diary_row ${
                  clearData[0]?.c_clear === 1 &&
                  clearData[1]?.c_clear === 1 &&
                  clearData[3]?.c_clear !== 1
                    ? "fade-in"
                    : ""
                }`}
              >
                알록달록한 조명빛을 받는 해파리와
              </h2>
            </section>
          ) : (
            <section className="YS_border-bottom">
              <h2 className="YS_diary_row_n">　</h2>
            </section>
          )}
          {clearData.length > 0 && clearData[3]?.c_clear === 1 ? (
            <section className="YS_border-bottom">
              <h2
                className={`YS_diary_row ${
                  clearData[0]?.c_clear === 1 &&
                  clearData[1]?.c_clear === 1 &&
                  clearData[2]?.c_clear === 1 &&
                  clearData[3]?.c_clear !== 1
                    ? "fade-in"
                    : ""
                }`}
              >
                멋진 흰돌고래를 보고
              </h2>
            </section>
          ) : (
            <section className="YS_border-bottom">
              <h2 className="YS_diary_row_n">　</h2>
            </section>
          )}
          {clearData.length > 0 && clearData[4]?.c_clear === 1 ? (
            <section className="YS_border-bottom">
              <h2
                className={`YS_diary_row ${
                  clearData[0]?.c_clear === 1 &&
                  clearData[1]?.c_clear === 1 &&
                  clearData[2]?.c_clear === 1 &&
                  clearData[3]?.c_clear === 1
                    ? "fade-in"
                    : ""
                }`}
              >
                엄청 커다란 문어를 만났다!
              </h2>
            </section>
          ) : (
            <section className="YS_border-bottom">
              <h2 className="YS_diary_row_n">　</h2>
            </section>
          )}
          {clearData.length > 0 && clearData[4]?.c_clear === 1 ? (
            <section className="YS_border-bottom">
              <h2
                className={`YS_diary_row ${
                  clearData[0]?.c_clear === 1 &&
                  clearData[1]?.c_clear === 1 &&
                  clearData[2]?.c_clear === 1 &&
                  clearData[3]?.c_clear === 1
                    ? "fade-in"
                    : ""
                }`}
              >
                참 재밌었다!
              </h2>
            </section>
          ) : (
            <section className="YS_border-bottom">
              <h2 className="YS_diary_row_n">　</h2>
            </section>
          )}
        </div>
        {currentLevel !== null && (
          <Speech speeches={speeches} currentLevel={currentLevel} />
        )}
        <Speech2 />
      </div>
    </main>
  );
}
