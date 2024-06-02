"use client";

import { playDataCheck } from "@/app/api/nemo_play";
import { Nemo_SelectAll, compareNemoData } from "@/app/api/nemo";
import "@/css/game.css";
import "@/css/ys_game.css";
import { useEffect, useState } from "react";
import Tutorial from "@/app/script/tutorial";
import { Message } from "@/app/script/message";

const first = ({ params }) => {
  useEffect(() => {
    const userid = localStorage.getItem("loginId");
    // 로그인안했으면 로그인페이지로
    if (!userid) {
      window.location.href = "/user/login";
    }
  });
  // -----------------
  const [message, setMessage] = useState(""); // 안내메시지
  const [hint, setHint] = useState([]); // 힌트숫자
  // 우클릭 체크용
  const [rightClickedInputs, setRightClickedInputs] = useState([]);
  // 힌트 숫자 체크용
  const [checkedSpans, setCheckedSpans] = useState([]);
  // 목숨
  const [life, setLife] = useState(["♥", "♥", "♥"]);

  const [user_id, setUser_id] = useState("");

  // const userid = localStorage.getItem("loginId");
  // const user_id = userid;
  useEffect(() => {
    const userid = localStorage.getItem("loginId");
    const user_id = userid;
    setUser_id(user_id);
  }, []);
  // 난이도 확인
  // 주소에서 p_num
  const p_num = Number(params.p_num);

  // 그림번호에따라 5개 난이도
  const getBlockCount = (p_num) => {
    switch (p_num) {
      case 1:
        return 5;
      case 2:
        return 7;
      case 3:
        return 9;
      case 4:
        return 11;
      case 5:
        return 15;
      default:
        return 5;
    }
  };

  // rows 배열 자동생성
  const blockCount = getBlockCount(p_num);
  // Array.from : 배열로 변환
  // {length : (Ex)5)} -> [, , , , ,] 초기값이 없는 배열 5의배열
  const rows = Array.from({ length: blockCount }, (_, i) => i + 1); // i에 1더한 값을 반환 ex)0~4 ->1~5
  // rows = [1,2,3~~~ p_num 의 return 값에 따라]

  // ----------------

  // 게임 패널티 메시지
  useEffect(() => {
    const savedMessage = localStorage.getItem("gameMessage");
    if (savedMessage) {
      setMessage(savedMessage);
      setTimeout(() => {
        setMessage("");
        localStorage.removeItem("gameMessage");
      }, 5000);
    }
  }, []);
  // --------------------------------

  // 정답테이블 힌트
  useEffect(() => {
    if (p_num) {
      const fetchHint = async () => {
        const hintData = await Nemo_SelectAll(p_num); // 정답테이블 조회
        setHint(hintData);
      };
      fetchHint();
    }
  }, [p_num]);

  // 힌트용 // 연속된 1의 합을계산
  const calculateContinuousSum = (blocks) => {
    let sum = 0; // 연속된합저장용
    let continuousSum = ""; // 최종결과 문자열

    // 모든 block이 0인 경우 - 1행의 데이터가 다 0
    if (blocks.every((block) => block === 0)) {
      return "0";
    }

    // 더하다가 0만나면 다시 0
    for (let block of blocks) {
      if (block === 1) {
        sum++;
      } else if (block === 0 && sum > 0) {
        continuousSum += `${sum} `; // continuousSum 에 더해둔값 추가
        sum = 0;
      }
    }

    // 마지막으로 1로 끝나는 경우
    if (sum > 0) {
      continuousSum += `${sum} `;
    }

    return continuousSum.trim(); // 숫자들 문자열반환
  };

  const checkCorrect = async (formData) => {
    const result = await compareNemoData(formData);
    console.log(result);

    if (result === "정답입니다") {
      // window.location.href = `/clear/${p_num}`;
      window.location.href = "/clear";
    } else if (result === "틀렸습니다") {
      setLife((prevLife) => {
        if (prevLife.length > 1) {
          return prevLife.slice(0, -1);
        } else {
          localStorage.setItem(
            "gameMessage",
            "목숨을 다 써서 현재 레벨이 초기화 됐어! 다시 그려보자!"
          );
          deleteaction();
          window.location.reload();
          return prevLife;
        }
      });
      // -----
      setMessage("틀렸어! 다시 잘생각해봐!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const gameaction = async (formData) => {
    for (let row of rows) {
      const gameData = {
        p_id: user_id,
        p_num: p_num,
        p_row_num: row,
      };

      for (let col = 1; col <= blockCount; col++) {
        gameData[`p_block${col}`] =
          formData.get(`p_block${row}_${col}`) === "on" ? 1 : 0;
      }

      await playDataCheck(gameData);
    }
  };

  const deleteaction = async () => {
    for (let row of rows) {
      const deleteData = {
        p_id: user_id,
        p_num: p_num,
        p_row_num: row,
      };

      for (let col = 1; col <= blockCount; col++) {
        deleteData[`p_block${col}`] = 0;
      }

      await playDataCheck(deleteData);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await gameaction(formData);

    setMessage("다그렸구나 이제 정답확인을 눌러봐!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleDelete = async (event) => {
    if (confirm("해당 스테이지를 초기화 하시겠습니까?")) {
      event.preventDefault();
      await deleteaction();
      setRightClickedInputs([]);
      setCheckedSpans([]); // Clear the checked spans
      localStorage.setItem(
        "gameMessage",
        "다 지웠어! 다시 잘 그려봐!"
      );
      window.location.reload();
      // setMessage("다 지웠어! 다시 잘 그려봐!");
      // setTimeout(() => {
      //   setMessage("");
      // }, 3000); // 3초 후 삭제
    }
  };

  const handleContextMenu = (event, row, col) => {
    event.preventDefault(); // 우클릭 안보이는게 기본상태
    const inputName = `p_block${row}_${col}`;
    setRightClickedInputs(
      (
        prev // 이전상태 prev
      ) =>
        prev.includes(inputName)
          ? // 클릭되어있으면.. 다시클릭했을떼 제거
            prev.filter((name) => name !== inputName)
          : // 아니면추가(우클릭)
            [...prev, inputName]
    );
  };

  const handleSpanClick = (id) => {
    setCheckedSpans((prev) =>
      prev.includes(id)
        ? prev.filter((spanId) => spanId !== id)
        : [...prev, id]
    );
  };

  if (!p_num) {
    return <div>Loading...</div>; // p_num이 아직 정의되지 않았을 때 로딩 상태를 표시합니다
  }

  return (
    <>
      <section className="game-container">
        <div className="blank"></div>
        <div className="game_block">
          <div className="sort">
            <div className="main-column-hint">
              <div className="column_hint"></div>
              {rows.map((column, index) => (
                <div
                  key={index}
                  id={`column${column}-hint`}
                  className="column_hint"
                >
                  {calculateContinuousSum(
                    hint.map((item) => item[`n_block${column}`])
                  )
                    .split(" ")
                    .map((num, i) => (
                      <span
                        key={i}
                        className={
                          checkedSpans.includes(
                            `column${column}-hint-${i}`
                          )
                            ? "span_check"
                            : ""
                        }
                        onClick={() =>
                          handleSpanClick(`column${column}-hint-${i}`)
                        }
                      >
                        {num}
                      </span>
                    ))}
                </div>
              ))}
            </div>
            <div className="main-form-container">
              <div className="row_hint">
                {hint.map((item, index) => (
                  <div
                    key={index}
                    id={`row${index + 1}_hint`}
                    className="hint"
                  >
                    {calculateContinuousSum(
                      rows.map(
                        (_, colIndex) =>
                          item[`n_block${colIndex + 1}`]
                      )
                    )
                      .split(" ")
                      .map((num, i) => (
                        <span
                          key={i}
                          className={
                            checkedSpans.includes(
                              `row${index + 1}-hint-${i}`
                            )
                              ? "span_check"
                              : ""
                          }
                          onClick={() =>
                            handleSpanClick(
                              `row${index + 1}-hint-${i}`
                            )
                          }
                        >
                          {num}
                        </span>
                      ))}
                  </div>
                ))}
              </div>
              <div className="main-input-box">
                <form method="POST" onSubmit={handleSubmit}>
                  {rows.map((row) => (
                    <div key={row} className={`p_row_num${row} row`}>
                      {rows.map((col) => (
                        <input
                          key={col}
                          type="checkbox"
                          name={`p_block${row}_${col}`}
                          onContextMenu={(event) =>
                            handleContextMenu(event, row, col)
                          }
                          className={
                            rightClickedInputs.includes(
                              `p_block${row}_${col}`
                            )
                              ? "right-clicked"
                              : ""
                          }
                        />
                      ))}
                      <input
                        type="hidden"
                        name="p_num"
                        value={p_num}
                      />
                      <input
                        type="hidden"
                        name="p_row_num"
                        value={row}
                      />
                    </div>
                  ))}
                  <div className="done_btn_box">
                    <button type="submit" className="done_btn">
                      다그렸다!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="side_box">
            <div id="lives" className="life_box">
              목숨 :　<p>{life}</p>
            </div>
            <div className="main-delete">
              <form method="POST" onSubmit={handleDelete}>
                <button id="ALL_DELETE"></button>
              </form>
            </div>
            <div className="clear">
              <form method="POST" action={checkCorrect}>
                <input name="p_id" value={user_id} hidden />
                <input name="p_num" value={p_num} hidden />
                <button type="submit" id="clear">
                  정답확인
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Message message={message} />
      <Tutorial />
    </>
  );
};

export default first;
