import React, { useState, useEffect } from "react";
import { phpQuestions, politicsQuestions } from "./questions";
import "./style.css";

export default function QuizApp() {
  // 当前题库动态状态，初始为 PHP 题库
  const [questions, setQuestions] = useState(phpQuestions);

  // 做题相关状态
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [records, setRecords] = useState(Array(phpQuestions.length).fill("unanswered"));
  const [reviewMode, setReviewMode] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // 切换题库：PHP 或 思政
  const switchBank = (bank) => {
    const newQs = bank === "php" ? phpQuestions : politicsQuestions;
    setQuestions(newQs);
    // 重置所有做题状态
    setIndex(0);
    setSelected([]);
    setScore(0);
    setShowAnswer(false);
    setReviewMode(false);
    setShowCard(false);
    setRecords(Array(newQs.length).fill("unanswered"));
  };

  // 当前题目
  const current = questions[index];
  if (!current) {
    return (
      <div className="container">
        <h1>🎉 恭喜你完成练习！</h1>
        <p>得分：{score} / {questions.length}</p>
      </div>
    );
  }

  // 兼容单/多选答案格式
  const answerArr = Array.isArray(current.answer)
    ? current.answer
    : typeof current.answer === "string"
      ? current.answer.split("")
      : [current.answer];

  const isMultiple =
    (typeof current.answer === "string" && current.answer.length > 1 && /^[A-Z]+$/.test(current.answer))
    || Array.isArray(current.answer);

  // 选项点击逻辑
  const toggleOption = (opt) => {
    if (showAnswer) return;
    if (!isMultiple) {
      setSelected([opt]);
    } else {
      const next = selected.includes(opt)
        ? selected.filter(o => o !== opt)
        : [...selected, opt];
      setSelected(next);
    }
  };

  // 判分
  const isCorrect = () => {
    if (!isMultiple) return selected[0] === answerArr[0];
    return [...selected].sort().join("") === [...answerArr].sort().join("");
  };

  // 提交答案
  const handleSubmit = () => {
    setShowAnswer(true);
    const correct = isCorrect();

    setRecords(prev => {
      const updated = [...prev];
      updated[index] = correct ? "correct" : "wrong";
      if (correct) {
        setScore(score + 1);
        setTimeout(() => {
          let nextIndex = index + 1;
          while (nextIndex < questions.length && updated[nextIndex] === "correct") {
            nextIndex++;
          }
          if (nextIndex >= questions.length) {
            setIndex(questions.length);
          } else {
            setShowAnswer(false);
            setSelected([]);
            setIndex(nextIndex);
          }
        }, 1000);
      }
      return updated;
    });
  };

  // 翻页
  const next = () => {
    setShowAnswer(false);
    setSelected([]);
    setIndex(Math.min(index + 1, questions.length - 1));
  };
  const prev = () => {
    setShowAnswer(false);
    setSelected([]);
    setIndex(Math.max(index - 1, 0));
  };

  // 答题卡跳题
  const handleCardClick = (idx) => {
    setIndex(idx);
    setSelected([]);
    setShowCard(false);
    setShowAnswer(reviewMode);
  };

  // 清空记录
  const handleClearRecords = () => {
    setRecords(Array(questions.length).fill("unanswered"));
    setScore(0);
    setIndex(0);
    setShowAnswer(false);
    setSelected([]);
    setShowCard(false);
  };

  useEffect(() => {
    setShowAnswer(reviewMode);
  }, [index, reviewMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, showAnswer, selected, reviewMode]);

  return (
    <div className="container">
      {/* 题库切换按钮 */}
      <div style={{ marginBottom: 20 }}>
        <button className="btn" onClick={() => switchBank("php")}>PHP 题库</button>
        <button className="btn" onClick={() => switchBank("politics")}>思政题库</button>
      </div>

      {/* 切换做题/背题 */}
      <div style={{ marginBottom: "20px" }}>
        <button className="btn" onClick={() => setReviewMode(!reviewMode)}>
          {reviewMode ? "返回做题模式" : "进入背题模式"}
        </button>
      </div>

      {/* 题干 */}
      <h2>{index + 1}、{current.question}</h2>

      {/* 选项列表 */}
      <ul className="option-list">
        {Object.entries(current.options).map(([k, v]) => {
          let liClass = "option-item";
          let radioClass = "custom-radio";

          if (showAnswer) {
            if (isMultiple) {
              if (answerArr.includes(k) && selected.includes(k)) {
                liClass += " correct-answer";
                radioClass += " correct";
              } else if (!answerArr.includes(k) && selected.includes(k)) {
                liClass += " wrong-answer";
                radioClass += " wrong";
              } else if (answerArr.includes(k)) {
                liClass += " correct-answer";
                radioClass += " correct";
              }
            } else {
              if (k === answerArr[0]) {
                liClass += " correct-answer";
                radioClass += " correct";
              } else if (selected.includes(k)) {
                liClass += " wrong-answer";
                radioClass += " wrong";
              }
            }
          } else if (selected.includes(k)) {
            liClass += " selected";
            radioClass += " checked";
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
        <button className="btn small" onClick={() => setShowCard(true)}>答题卡</button>
      </div>

      {/* 答题卡弹窗 */}
      {showCard && (
        <div className="card-popup-bg" onClick={() => setShowCard(false)}>
          <div className="card-popup" onClick={e => e.stopPropagation()}>
            <h3>答题卡（点击跳题）</h3>
            <div className="card-grid">
              {questions.map((q, idx) => {
                let label = null;
                if (idx === 0) label = "单选";
                if (idx === phpQuestions.length) label = "思政题开始"; // 如需标记
                // …也可根据 q.type 自动标签
                return (
                  <React.Fragment key={idx}>
                    {label && <div className="type-label">{label}</div>}
                    <button
                      className={`nav-btn ${records[idx]}${index === idx ? " active" : ""}`}
                      onClick={() => handleCardClick(idx)}
                    >{idx + 1}</button>
                  </React.Fragment>
                );
              })}
            </div>
            <div style={{ marginTop: 22, textAlign: "center" }}>
              <button className="btn danger" onClick={handleClearRecords}>🧹 一键清除做题记录</button>
            </div>
          </div>
        </div>
      )}

      <div className="card-float-btn" onClick={() => setShowCard(true)}>🗂️</div>
    </div>
  );
}
