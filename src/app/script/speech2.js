import React, { useState, useEffect, useRef } from "react";
import "@/css/speech.css";

const Speech2 = () => {
  const initialSpeeches = [
    {
      s_num: 0,
      s_speaker: "A",
      s_message: "안녕, 왔구나!",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message:
        "내가 그림일기를 그리려 하는데 어떻게 그려야 할지 잘 모르겠더라고.",
    },
    {
      s_num: 0,
      s_speaker: "A",
      s_message: "내 이야기를 듣고 도와줄래?",
    },
  ];

  const [filteredSpeeches, setFilteredSpeeches] =
    useState(initialSpeeches);
  const [currentSpeechIndex, setCurrentSpeechIndex] = useState(0);
  const [isSpeechVisible, setIsSpeechVisible] = useState(false); // 처음에는 대화창을 숨기도록 설정

  const speechContainerRef = useRef(null);

  useEffect(() => {
    // 로컬 스토리지에서 이벤트 발생 여부 확인
    const eventOccurred = localStorage.getItem("eventOccurred");

    if (!eventOccurred) {
      // 이벤트가 발생하지 않았으면 대화 상자 표시
      setIsSpeechVisible(true);
    } else {
      // 이벤트가 발생한 경우, 대화 상자를 숨김
      setIsSpeechVisible(false);
    }
  }, []);

  const handleNextSpeech = () => {
    if (currentSpeechIndex < initialSpeeches.length - 1) {
      setCurrentSpeechIndex((prevIndex) => prevIndex + 1);
    } else {
      // 대화 상자가 닫힐 때 이벤트 발생 여부를 로컬 스토리지에서 제거
      localStorage.setItem("eventOccurred", true);
      setIsSpeechVisible(false);
    }
  };

  const handleSkip = () => {
    // 대화 상자가 닫힐 때 이벤트 발생 여부를 로컬 스토리지에서 제거
    localStorage.setItem("eventOccurred", true);
    setIsSpeechVisible(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "13") {
      event.preventDefault();
      handleNextSpeech();
    }
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
                    {filteredSpeeches[currentSpeechIndex]?.s_message}
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
        </div>
      )}
    </>
  );
};

export default Speech2;
