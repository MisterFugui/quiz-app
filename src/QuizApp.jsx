// QuizApp.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { phpQuestions, politicsQuestions } from "./questions";
import "./style.css";

export default function QuizApp() {
  // 题库类型与章节选择
  const [quizBank, setQuizBank] = useState(localStorage.getItem("quiz-bank") || "php");
  const [chapter, setChapter] = useState(
    Number(localStorage.getItem("quiz-chapter")) || 0
  );

  // 计算当前题集
  const questions = useMemo(
    () =>
      quizBank === "php"
        ? phpQuestions
        : politicsQuestions.filter((q) => q.chapter === chapter),
    [quizBank, chapter]
  );

  // 本章记录的存储 key
  const recordsKey = `quiz-records-${quizBank}-${chapter}`;

  // 做题相关状态
  const [index, setIndex] = useState(
    Number(localStorage.getItem("quiz-index")) || 0
  );
  const [selected, setSelected] = useState([]);
  const [answersMap, setAnswersMap] = useState(() =>
    Array(questions.length).fill([])
  );
  const [score, setScore] = useState(
    Number(localStorage.getItem("quiz-score")) || 0
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem(recordsKey);
    return saved
      ? JSON.parse(saved)
      : Array(questions.length).fill("unanswered");
  });

  // 卡片滚动保存
  const cardRef = useRef(null);
  const scrollPos = useRef(0);

  // 本地持久化通用项
  useEffect(() => {
    localStorage.setItem("quiz-bank", quizBank);
    localStorage.setItem("quiz-chapter", chapter);
    localStorage.setItem("quiz-index", index);
    localStorage.setItem("quiz-score", score);
  }, [quizBank, chapter, index, score]);

  // 本章记录持久化
  useEffect(() => {
    localStorage.setItem(recordsKey, JSON.stringify(records));
  }, [records, recordsKey]);

  // 切换题库／章节 —— 保留做题痕迹
  const switchBank = useCallback((newBank) => {
    setQuizBank(newBank);
    setChapter(0);
    setIndex(0);
  }, []);
  const switchChapter = useCallback((ch) => {
    setChapter(ch);
    setIndex(0);
  }, []);

  // 当 questions 改变时重置 answersMap & 加载本章 records
  useEffect(() => {
    setAnswersMap(Array(questions.length).fill([]));
    const saved = localStorage.getItem(recordsKey);
    setRecords(saved ? JSON.parse(saved) : Array(questions.length).fill("unanswered"));
  }, [questions, recordsKey]);

  // 进入题目时恢复上次 selected，并自动展示已做题目的答案
  useEffect(() => {
    setSelected(answersMap[index] || []);
    if (records[index] !== "unanswered") {
      setShowAnswer(true);
    } else {
      setShowAnswer(reviewMode);
    }
  }, [index, answersMap, records, reviewMode]);

  // 翻页
  const next = useCallback(() => {
    setShowAnswer(false);
    setIndex((i) => Math.min(i + 1, questions.length));
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

  // 当前题目
  const current = questions[index];

  // 筛选出答案格式
  const answerArr = current
    ? Array.isArray(current.answer)
      ? current.answer
      : typeof current.answer === "string"
      ? current.answer.split("")
      : [current.answer]
    : [];

  const isMultiple =
    current &&
    ((typeof current.answer === "string" &&
      current.answer.length > 1 &&
      /^[A-Z]+$/.test(current.answer)) ||
      Array.isArray(current.answer));

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
    setAnswersMap((m) => {
      const next = [...m];
      next[index] = selected;
      return next;
    });
    setRecords((prev) => {
      const updated = [...prev];
      updated[index] = isCorrect() ? "correct" : "wrong";
      if (isCorrect()) {
        setScore((s) => s + 1);
        setTimeout(() => {
          let n = index + 1;
          while (n < questions.length && updated[n] === "correct") n++;
          setShowAnswer(false);
          setIndex(Math.min(n, questions.length));
        }, 500);
      }
      return updated;
    });
  };

  // 清除本章做题痕迹
  const handleClearRecords = () => {
    setAnswersMap(Array(questions.length).fill([]));
    setRecords(Array(questions.length).fill("unanswered"));
    setScore(0);
    setIndex(0);
    setShowAnswer(false);
    setReviewMode(false);
    setShowCard(false);
    localStorage.removeItem(recordsKey);
  };

  // 答题卡跳题
  const handleCardClick = (i) => {
    setIndex(i);
    setShowCard(false);
  };

  // 打开答题卡时恢复滚动；关闭时记录滚动
  useEffect(() => {
    if (showCard && cardRef.current) {
      cardRef.current.scrollTop = scrollPos.current;
    }
  }, [showCard]);
  const onCardScroll = (e) => {
    scrollPos.current = e.target.scrollTop;
  };

  return (
    <div className="container">
      {/* 工具栏：题库+章节 */}
      <div className="toolbar">
        <button
          className={`btn ${quizBank === "php" ? "active" : ""}`}
          onClick={() => switchBank("php")}
        >
          PHP 题库
        </button>
        <button
          className={`btn ${quizBank === "politics" ? "active" : ""}`}
          onClick={() => switchBank("politics")}
        >
          思政题库
        </button>
        {quizBank === "politics" && (
          <select
            className="chapter-select"
            value={chapter}
            onChange={(e) => switchChapter(Number(e.target.value))}
          >
            {Array.from({ length: 18 }, (_, i) => (
              <option
                key={i}
                value={i}
                className={chapter === i ? "active" : ""}
              >
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

      {/* 主体内容：三种状态 */}
      {questions.length === 0 ? (
        <h2>本章暂无题目，请选择其它章节或题库。</h2>
      ) : index === questions.length ? (
        <div>
          <h1>🎉 恭喜你完成练习！</h1>
          <p>
            得分：{score} / {questions.length}
          </p>
        </div>
      ) : (
        <>
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
                    liClass += " correct-answer";
                    radioClass += " correct";
                  } else if (selected.includes(k)) {
                    liClass += " wrong-answer";
                    radioClass += " wrong";
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
                <li
                  key={k}
                  className={liClass}
                  onClick={() => toggleOption(k)}
                >
                  <span className={radioClass}>{k}</span>
                  <span className="option-text">{v}</span>
                </li>
              );
            })}
          </ul>

          {/* 操作区 */}
          <div className="nav-footer">
            <button
              className="btn small"
              onClick={prev}
              disabled={index === 0}
            >
              上一题
            </button>
            {!showAnswer && !reviewMode ? (
              <button
                className="btn"
                onClick={handleSubmit}
                disabled={selected.length === 0}
              >
                提交答案
              </button>
            ) : (
              <>
                <p className="answer">
                  ✅ 正确答案：{answerArr.join(", ")}
                </p>
                <button
                  className="btn small"
                  onClick={next}
                  disabled={index === questions.length}
                >
                  下一题
                </button>
              </>
            )}
            <button className="btn small" onClick={() => setShowCard(true)}>
              答题卡
            </button>
          </div>
        </>
      )}

      {/* 答题卡弹窗 */}
      {showCard && (
        <div
          className="card-popup-bg"
          onClick={() => setShowCard(false)}
        >
          <div
            className="card-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>答题卡（点击跳题）</h3>
            <div
              className="card-grid"
              ref={cardRef}
              onScroll={onCardScroll}
            >
              {questions.map((q, i) => {
                const prevType = i > 0 ? questions[i - 1].type : null;
                const showLabel = i === 0 || q.type !== prevType;
                return (
                  <React.Fragment key={i}>
                    {showLabel && (
                      <div className="type-label">
                        {q.type}
                      </div>
                    )}
                    <button
                      className={`nav-btn ${records[i]}${index === i ? " active" : ""}`}
                      onClick={() => handleCardClick(i)}
                    >
                      {i + 1}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
            <div
              className="toolbar"
              style={{ justifyContent: "space-between" }}
            >
              <button
                className="btn"
                onClick={() => setShowCard(false)}
              >
                ❌ 退出答题卡
              </button>
              <button
                className="btn danger"
                onClick={handleClearRecords}
              >
                🧹 一键清除做题痕迹
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="card-float-btn"
        onClick={() => setShowCard(true)}
      >
        🗂️
      </div>
    </div>
  );
}
