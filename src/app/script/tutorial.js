import React, { useState, useEffect, useRef } from "react";
import "@/css/speech.css";

const Tutorial = () => {
  const tutorialMsg = [
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "안녕! 이전에 네모로직을 플레이해봤니?\n지금부터 그림그리는 방법을 알려줄거야\n자신있다면 오른쪽 위의 버튼을 눌러 바로 게임을 시작해도 좋아!",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "기본적인 규칙은 세가지야!\n1. 쓰인 숫자만큼의 연속된 칸을 칠해야 한다.\n2. 숫자와 숫자 사이에는 적어도 한칸을 비워야 한다.\n3. 숫자의 순서와 칠해진 칸의 순서는 일치해야 한다. ",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "간단히 말해 네모칸 위, 옆에 있는 숫자를 보고 네모칸을 색칠하면 돼!",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "자 이그림을 보면 좌측에 1 1 , 3 이라는 숫자를 볼 수 있지?",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "1 1 은 이렇게 한 칸 칠하고 띄우고 다시 한칸 칠하는 것을 의미하고\n3은 한 번에 3칸을 연속해서 칠하는 것을 말해.",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "하지만 이 경우엔 좌측의 힌트와는 맞지만 위의 힌트와 일치하지 않으니 정답이 아니겠지?\n이런식으로 유추해 나가면서 풀면돼!",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "퍼즐을 틀렸다면 목숨이 하나씩 줄어들거야\n목숨3개를 모두사용하면 현재플레이중인 스테이지가 초기화되니 신중하게 확인해! ",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "지우개 그림을 클릭하면 현재 스테이지의 플레이정보를 초기화할 수 있어! ",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "마우스 우클릭으로 플레이에는 영향을 주지않는 체크표시를 남길수 있어!\n완성된 부분은 힌트 숫자를 클릭하면 마찬가지로 체크해둘 수 있으니 참고해!",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "그림을 완성했으면 다그렸다! 버튼을 누르고 정답확인 버튼을 눌러봐!\n틀렸다면 내가 알려줄게",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "그리고 눈치 챘을지 모르겠지만 게임화면에 보이는 숫자말고도\n완성할 그림에 대한 힌트가 있어!",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "각 단계별로 게임을 시작할때 대화를 자세히 봐!\n무얼 그려야할지 알 수 있을거야!",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message: "그럼이제 열심히 그림을 완성해보자!",
    },
  ];

  const [filteredSpeeches, setFilteredSpeeches] =
    useState(tutorialMsg);
  const [currentSpeechIndex, setCurrentSpeechIndex] = useState(0);
  const [isSpeechVisible, setIsSpeechVisible] = useState(false);

  const speechContainerRef = useRef(null);

  useEffect(() => {
    const tutorialcheck = localStorage.getItem("tutorialcheck");

    if (!tutorialcheck) {
      setIsSpeechVisible(true);
    } else {
      setIsSpeechVisible(false);
    }
  }, []);

  const handleNextSpeech = () => {
    if (currentSpeechIndex < filteredSpeeches.length - 1) {
      setCurrentSpeechIndex((prevIndex) => prevIndex + 1);
    } else {
      localStorage.setItem("tutorialcheck", true);
      setIsSpeechVisible(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("tutorialcheck", true);
    setIsSpeechVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "13") {
      event.preventDefault();
      handleNextSpeech();
    }
  };

  const renderMessageWithLineBreaks = (message) => {
    return message.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      {isSpeechVisible && (
        <div
          className="conversationBox-back"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          ref={speechContainerRef}
        >
          {filteredSpeeches[currentSpeechIndex]?.s_speaker ===
            "A" && (
            <img
              src="/img/boy.png"
              className="avatar"
              alt="A의 아바타"
              priority={true}
              style={{
                opacity:
                  filteredSpeeches[currentSpeechIndex]?.s_speaker ===
                  "B"
                    ? 0.5
                    : 1,
              }}
            />
          )}
          <div id="conversationBox" className="conversation-box">
            <div id="speechContainer" className="speech-container">
              {filteredSpeeches.length > 0 && (
                <div className="speech-part">
                  <span className="num" style={{ display: "none" }}>
                    {filteredSpeeches[currentSpeechIndex]?.s_num}
                  </span>
                  <span
                    className="speaker"
                    style={{ display: "none" }}
                  >
                    {filteredSpeeches[currentSpeechIndex]?.s_speaker}
                  </span>
                  <span
                    className="message"
                    style={{
                      color:
                        filteredSpeeches[currentSpeechIndex]
                          ?.s_speaker === "A"
                          ? "green"
                          : "black",
                    }}
                  >
                    {renderMessageWithLineBreaks(
                      filteredSpeeches[currentSpeechIndex]?.s_message
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button id="skipButton" onClick={handleSkip}>
            건너뛰기
          </button>
          {filteredSpeeches.length > 1 && (
            <button id="nextButton" onClick={handleNextSpeech}>
              &#187;&#187;
            </button>
          )}
          <div className="tuto_img_box">
            {currentSpeechIndex === 3 && (
              <img
                src="/img/tuto1.png"
                alt="튜토리얼 이미지"
                className="tuto_img"
                width="500px"
              />
            )}
            {currentSpeechIndex === 4 && (
              <img
                src="/img/tuto2.png"
                alt="튜토리얼 이미지"
                className="tuto_img"
                width="500px"
              />
            )}
            {currentSpeechIndex === 5 && (
              <img
                src="/img/tuto3.png"
                alt="튜토리얼 이미지"
                className="tuto_img"
                width="500px"
              />
            )}
            {currentSpeechIndex === 6 && (
              <img
                src="/img/life.png"
                alt="목숨"
                className="tuto_img"
                width="300px"
              />
            )}

            {currentSpeechIndex === 7 && (
              <img
                src="/img/eraser_icon.png"
                alt="지우개그림"
                className="tuto_img"
                width="300px"
              />
            )}
            {currentSpeechIndex === 8 && (
              <img
                src="/img/right_click.png"
                alt="가이드"
                className="tuto_img"
                width="500px"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Tutorial;
