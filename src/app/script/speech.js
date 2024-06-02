import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/css/speech.css";

const Speech = ({ speeches, currentLevel }) => {
  const [filteredSpeeches, setFilteredSpeeches] = useState([]);
  const [currentSpeechIndex, setCurrentSpeechIndex] = useState(0);
  const [isSpeechVisible, setIsSpeechVisible] = useState(true);
  const router = useRouter();

  const speechContainerRef = useRef(null);

  useEffect(() => {
    const levelSpeeches = speeches.filter(
      (speech) => speech.s_num === currentLevel
    );
    setFilteredSpeeches(levelSpeeches);
    setCurrentSpeechIndex(0);
    setIsSpeechVisible(true);

    if (speechContainerRef.current) {
      speechContainerRef.current.focus();
    }
  }, [speeches, currentLevel]);

  const handleNextSpeech = () => {
    if (currentSpeechIndex < filteredSpeeches.length - 1) {
      setCurrentSpeechIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsSpeechVisible(false);
      // 대화를 모두 본 후 `/game/[level]`로 이동
      router.push(`/game/${currentLevel}`);
    }
  };

  const handleSkip = () => {
    setIsSpeechVisible(false);
    // 대화를 건너뛴 후 `/game/[level]`로 이동
    router.push(`/game/${currentLevel}`);
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

export default Speech;
