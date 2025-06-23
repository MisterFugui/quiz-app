// QuizApp.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { phpQuestions, politicsQuestions } from "./questions";
import "./style.css";

export default function QuizApp() {
  // 题库类型与章节选择
  const [bank, setBank] = useState(localStorage.getItem("quiz-bank") || "php");
  const [chapter, setChapter] = useState(
    Number(localStorage.getItem("quiz-chapter")) || 0
  );

  // 计算当前题集
  const questions = useMemo(
    () =>
      bank === "php"
        ? phpQuestions
        : politicsQuestions.filter((q) => q.chapter === chapter),
    [bank, chapter]
  );

  // 做题相关状态
  const [index, setIndex] = useState(
    Number(localStorage.getItem("quiz-index")) || 0
  );
  const [selected, setSelected] = useState([]);
  const [answersMap, setAnswersMap] = useState(() =>
    Array(questions.length).fill([])
  ); // 每题已选答案
  const [score, setScore] = useState(
    Number(localStorage.getItem("quiz-score")) || 0
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("quiz-records");
    return saved
      ? JSON.parse(saved)
      : Array(questions.length).fill("unanswered");
  });

  // 本地持久化
  useEffect(() => {
    localStorage.setItem("quiz-bank", bank);
    localStorage.setItem("quiz-chapter", chapter);
    localStorage.setItem("quiz-index", index);
    localStorage.setItem("quiz-score", score);
    localStorage.setItem("quiz-records", JSON.stringify(records));
  }, [bank, chapter, index, score, records]);

  // 切换题库／章节 —— 保留做题痕迹
  const switchBank = useCallback((newBank) => {
    setBank(newBank);
    setChapter(0);
    setIndex(0);
  }, []);
  const switchChapter = useCallback((ch) => {
    setChapter(ch);
    setIndex(0);
  }, []);

  const current = questions[index];

  // 进入题目时恢复上次 selected，并自动展示已做题目的答案
  useEffect(() => {
    setSelected(answersMap[index] || []);
    // 如果已经做过，则自动显示答案
    if (records[index] !== "unanswered") {
      setShowAnswer(true);
    } else {
      setShowAnswer(reviewMode);
    }
  }, [index, answersMap, records, reviewMode]);

  // 翻页
  const next = useCallback(() => {
    setShowAnswer(false);
    setIndex((i) => Math.min(i + 1, questions.length - 1));
  }, [questions.length]);
  const prev = useCallback(() => {
    setShowAnswer(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  // 键盘翻页
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // 全部题做完
  if (!current) {
    return (
      <div className="container">
        <h1>🎉 恭喜你完成练习！</h1>
        <p>
          得分：{score} / {questions.length}
        </p>
      </div>
    );
  }

  // 答案格式兼容
  const answerArr = Array.isArray(current.answer)
    ? current.answer
    : typeof current.answer === "string"
    ? current.answer.split("")
    : [current.answer];
  const isMultiple =
    (typeof current.answer === "string" &&
      current.answer.length > 1 &&
      /^[A-Z]+$/.test(current.answer)) ||
    Array.isArray(current.answer);

  // 选项点击
  const toggleOption = (opt) => {
    if (showAnswer) return;
    if (!isMultiple) {
      setSelected([opt]);
    } else {
      setSelected((sel) =>
        sel.includes(opt) ? sel.filter((o) => o !== opt) : [...sel, opt]
      );
    }
  };

  // 判分
  const isCorrect = () =>
    !isMultiple
      ? selected[0] === answerArr[0]
      : [...selected].sort().join("") === [...answerArr].sort().join("");

  // 提交
  const handleSubmit = () => {
    setShowAnswer(true);
    // 保存本题 selected
    setAnswersMap((m) => {
      const next = [...m];
      next[index] = selected;
      return next;
    });
    // 记录对错
    setRecords((prev) => {
      const updated = [...prev];
      updated[index] = isCorrect() ? "correct" : "wrong";
      if (isCorrect()) {
        setScore((s) => s + 1);
        // 自动跳到下一个未答题
        setTimeout(() => {
          let n = index + 1;
          while (n < questions.length && updated[n] === "correct") n++;
          if (n < questions.length) {
            setShowAnswer(false);
            setIndex(n);
          }
        }, 500);
      }
      return updated;
    });
  };

  // 清除做题痕迹
  const handleClearRecords = () => {
    setAnswersMap(Array(questions.length).fill([]));
    setRecords(Array(questions.length).fill("unanswered"));
    setScore(0);
    setIndex(0);
    setShowAnswer(false);
    setReviewMode(false);
    setShowCard(false);
  };

  // 答题卡跳题
  const handleCardClick = (i) => {
    setIndex(i);
    setShowCard(false);
  };

  return (
    <div className="container">
      {/* 工具栏：题库+章节 */}
      <div className="toolbar">
        <button className="btn" onClick={() => switchBank("php")}>
          PHP 题库
        </button>
        <button className="btn" onClick={() => switchBank("politics")}>
          思政题库
        </button>
        {bank === "politics" && (
          <select
            className="chapter-select"
            value={chapter}
            onChange={(e) => switchChapter(Number(e.target.value))}
          >
            {Array.from({ length: 18 }, (_, i) => (
              <option key={i} value={i}>
                {i === 0 ? "导论" : `${i} 章`}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* 切换做题/背题 */}
      <div className="toolbar">
        <button className="btn" onClick={() => setReviewMode((r) => !r)}>
          {reviewMode ? "返回做题模式" : "进入背题模式"}
        </button>
      </div>

      {/* 题干 */}
      <h2>
        {index + 1}、{current.question}
      </h2>

      {/* 选项列表 */}
      <ul className="option-list">
        {Object.entries(current.options).map(([k, v]) => {
          let liClass = "option-item";
          let radioClass = "custom-radio";
          if (showAnswer) {
            if (isMultiple) {
              if (answerArr.includes(k)) {
                radioClass += " correct";
                liClass += " correct-answer";
              } else if (selected.includes(k)) {
                radioClass += " wrong";
                liClass += " wrong-answer";
              }
            } else {
              if (k === answerArr[0]) {
                radioClass += " correct";
                liClass += " correct-answer";
              } else if (selected.includes(k)) {
                radioClass += " wrong";
                liClass += " wrong-answer";
              }
            }
          } else if (selected.includes(k)) {
            radioClass += " checked";
            liClass += " selected";
          }
          return (
            <li key={k} className={liClass} onClick={() => toggleOption(k)}>
              <span className={radioClass}>{k}</span>
              <span className="option-text">{v}</span>
            </li>
          );
        })}
      </ul>

      {/* 操作区 */}
      <div className="nav-footer">
        <button className="btn small" onClick={prev} disabled={index === 0}>
          上一题
        </button>
        {!showAnswer && !reviewMode && (
          <button className="btn" onClick={handleSubmit} disabled={selected.length === 0}>
            提交答案
          </button>
        )}
        {(showAnswer || reviewMode) && (
          <>
            <p className="answer">✅ 正确答案：{answerArr.join(", ")}</p>
            <button className="btn small" onClick={next} disabled={index === questions.length - 1}>
              下一题
            </button>
          </>
        )}
        <button className="btn small" onClick={() => setShowCard(true)}>
          答题卡
        </button>
      </div>

      {/* 答题卡弹窗 */}
      {showCard && (
        <div className="card-popup-bg" onClick={() => setShowCard(false)}>
          <div className="card-popup" onClick={(e) => e.stopPropagation()}>
            <h3>答题卡（点击跳题）</h3>
            <div className="card-grid">
              {questions.map((_, i) => (
                <button
                  key={i}
                  className={`nav-btn ${records[i]}${index === i ? " active" : ""}`}
                  onClick={() => handleCardClick(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="toolbar" style={{ justifyContent: "space-between" }}>
              <button className="btn" onClick={() => setShowCard(false)}>
                ❌ 退出答题卡
              </button>
              <button className="btn danger" onClick={handleClearRecords}>
                🧹 一键清除做题痕迹
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card-float-btn" onClick={() => setShowCard(true)}>
        🗂️
      </div>
    </div>
  );
}
