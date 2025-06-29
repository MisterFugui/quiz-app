// QuizApp.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { phpQuestions, politicsQuestions } from "./questions";
import "./style.css";


export default function QuizApp() {
  // —— 题库与章节 ——
  const [quizBank, setQuizBank] = useState(localStorage.getItem("quiz-bank") || "php");
  const [chapter, setChapter] = useState(Number(localStorage.getItem("quiz-chapter")) || 0);

  // 生成题目列表
  const questions = useMemo(() => {
    return quizBank === "php"
      ? phpQuestions
      : politicsQuestions.filter((q) => q.chapter === chapter);
  }, [quizBank, chapter]);

  // 本章记录的 key
  const recordsKey = `quiz-records-${quizBank}-${chapter}`;

  // —— 状态定义 ——
  const [index, setIndex] = useState(Number(localStorage.getItem("quiz-index")) || 0);
  const [selected, setSelected] = useState([]);
  // **这里改用 Array.from，避免 .fill([]) 引用同一数组**
  const [answersMap, setAnswersMap] = useState(() =>
    Array.from({ length: questions.length }, () => [])
  );
  const [score, setScore] = useState(Number(localStorage.getItem("quiz-score")) || 0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [showCard, setShowCard] = useState(false);
  // **记录状态也改用 Array.from**
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem(recordsKey);
    return saved
      ? JSON.parse(saved)
      : Array.from({ length: questions.length }, () => "unanswered");
  });

  // 卡片滚动位置信息
  const cardRef = useRef(null);
  const scrollPos = useRef(0);

  // —— 持久化：加载本章记录 ——
  useEffect(() => {
    // 重置答案映射
    setAnswersMap(Array.from({ length: questions.length }, () => []));
    // 加载本章记录
    const saved = localStorage.getItem(recordsKey);
    setRecords(saved
      ? JSON.parse(saved)
      : Array.from({ length: questions.length }, () => "unanswered"));
  }, [questions, recordsKey]);

  // —— 持久化：仅在 records 变更时保存 ——
  useEffect(() => {
    localStorage.setItem(recordsKey, JSON.stringify(records));
  }, [records, recordsKey]);

  // —— 持久化：其它通用项 ——
  useEffect(() => {
    localStorage.setItem("quiz-bank", quizBank);
    localStorage.setItem("quiz-chapter", chapter);
    localStorage.setItem("quiz-index", index);
    localStorage.setItem("quiz-score", score);
  }, [quizBank, chapter, index, score]);

  // 切换题库 / 章节时重置所有 UI 状态
  const switchBank = useCallback((newBank) => {
    setQuizBank(newBank);
    setChapter(0);
    setIndex(0);
    setScore(0);
    setShowAnswer(false);
    setReviewMode(false);
    setShowCard(false);
  }, []);
  const switchChapter = useCallback((ch) => {
    setChapter(ch);
    setIndex(0);
    setScore(0);
    setShowAnswer(false);
    setReviewMode(false);
    setShowCard(false);
  }, []);

  // 进入题目时恢复上次选项 & 自动展示
  useEffect(() => {
    setSelected(answersMap[index] || []);
    setShowAnswer(records[index] !== "unanswered" ? true : reviewMode);
  }, [index, answersMap, records, reviewMode]);

  // 翻页回调
  const next = useCallback(() => {
    setShowAnswer(false);
    setIndex((i) => Math.min(i + 1, questions.length));
  }, [questions.length]);
  const prev = useCallback(() => {
    setShowAnswer(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  // 键盘翻页
  const handleKey = useCallback((e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  }, [next, prev]);
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // 当前题 & 格式化答案
  const current = questions[index];
  const answerArr = current
    ? Array.isArray(current.answer)
      ? current.answer
      : typeof current.answer === "string"
      ? current.answer.split("")
      : [current.answer]
    : [];
  const isMultiple = current &&
    ((typeof current.answer === "string" && current.answer.length > 1 && /^[A-Z]+$/.test(current.answer)) ||
      Array.isArray(current.answer));

  // 选项点击逻辑
  const toggleOption = (opt) => {
    if (showAnswer) return;
    if (!isMultiple) setSelected([opt]);
    else setSelected((sel) =>
      sel.includes(opt) ? sel.filter((o) => o !== opt) : [...sel, opt]
    );
  };

  const isCorrect = () =>
    !isMultiple
      ? selected[0] === answerArr[0]
      : [...selected].sort().join("") === [...answerArr].sort().join("");

  // 提交
  const handleSubmit = () => {
    setShowAnswer(true);
    setAnswersMap((m) => {
      const nxt = [...m];
      nxt[index] = selected;
      return nxt;
    });
    setRecords((prev) => {
      const upd = [...prev];
      upd[index] = isCorrect() ? "correct" : "wrong";
      if (isCorrect()) {
        setScore((s) => s + 1);
        setTimeout(() => {
          if (index === questions.length - 1) {
            setIndex(questions.length);
            setShowAnswer(true);
          } else {
            let n = index + 1;
            while (n < questions.length && upd[n] === "correct") n++;
            setShowAnswer(false);
            setIndex(n);
          }
        }, 500);
      }
      return upd;
    });
  };

  // 清除本章痕迹
  const handleClearRecords = () => {
    setAnswersMap(Array.from({ length: questions.length }, () => []));
    setRecords(Array.from({ length: questions.length }, () => "unanswered"));
    setScore(0);
    setIndex(0);
    setShowAnswer(false);
    setReviewMode(false);
    setShowCard(false);
    localStorage.removeItem(recordsKey);
  };

  // 答题卡跳题 & 滚动记忆
  const handleCardClick = (i) => { setIndex(i); setShowCard(false); };
  useEffect(() => {
    if (showCard && cardRef.current) {
      cardRef.current.scrollTop = scrollPos.current;
    }
  }, [showCard]);
  const onCardScroll = (e) => { scrollPos.current = e.target.scrollTop; };

  return (
    <div className="container">
      {/* 工具栏：题库 + 章节 */}
      <div className="toolbar">
        <button className={`btn ${quizBank==="php"?"active":""}`} onClick={()=>switchBank("php")}>PHP 题库</button>
        <button className={`btn ${quizBank==="politics"?"active":""}`} onClick={()=>switchBank("politics")}>思政题库</button>
        {quizBank==="politics" && (
          <select className="chapter-select" value={chapter} onChange={e=>switchChapter(Number(e.target.value))}>
            {Array.from({length:18},(_,i)=>(
              <option key={i} value={i}>{i===0?"导论":`${i} 章`}</option>
            ))}
          </select>
        )}
      </div>

      {/* 做题/背题 切换 */}
      <div className="toolbar">
        <button className="btn" onClick={()=>setReviewMode(r=>!r)}>
          {reviewMode?"返回做题模式":"进入背题模式"}
        </button>
      </div>

      {/* 主体 */}
      {questions.length===0 ? (
        <h2>本章暂无题目，请选择其它章节或题库。</h2>
      ) : index===questions.length ? (
        <div><h1>🎉 恭喜完成！</h1><p>得分：{score} / {questions.length}</p></div>
      ) : (
        <>
          <h2>{index+1}、{current.question}</h2>
          <ul className="option-list">
            {Object.entries(current.options).map(([k,v])=>{
              let liC="option-item", rdC="custom-radio";
              if(showAnswer){
                if(isMultiple){
                  if(answerArr.includes(k)){ liC+=" correct-answer"; rdC+=" correct"; }
                  else if(selected.includes(k)){ liC+=" wrong-answer"; rdC+=" wrong"; }
                } else {
                  if(k===answerArr[0]){ liC+=" correct-answer"; rdC+=" correct"; }
                  else if(selected.includes(k)){ liC+=" wrong-answer"; rdC+=" wrong"; }
                }
              } else if(selected.includes(k)){
                liC+=" selected"; rdC+=" checked";
              }
              return (
                <li key={k} className={liC} onClick={()=>toggleOption(k)}>
                  <span className={rdC}>{k}</span>
                  <span className="option-text">{v}</span>
                </li>
              );
            })}
          </ul>
          <div className="nav-footer">
            <button className="btn small" onClick={prev} disabled={index===0}>上一题</button>
            {!showAnswer && !reviewMode ? (
              <button className="btn" onClick={handleSubmit} disabled={selected.length===0}>提交答案</button>
            ) : (
              <>
                <p className="answer">✅ 正确答案：{answerArr.join(", ")}</p>
                <button className="btn small" onClick={next} disabled={index===questions.length}>下一题</button>
              </>
            )}
            <button className="btn small" onClick={()=>setShowCard(true)}>答题卡</button>
          </div>
        </>
      )}

      {/* 答题卡 */}
      {showCard && (
        <div className="card-popup-bg" onClick={()=>setShowCard(false)}>
          <div className="card-popup" onClick={e=>e.stopPropagation()}>
            <h3>答题卡（点击跳题）</h3>
            <div className="card-grid" ref={cardRef} onScroll={onCardScroll}>
              {questions.map((q,i)=>{
                const prevType = i>0?questions[i-1].type:null;
                const showLabel = i===0 || q.type!==prevType;
                return (
                  <React.Fragment key={i}>
                    {showLabel && <div className="type-label">{q.type}</div>}
                    <button
                      className={`nav-btn ${records[i]}${index===i?" active":""}`}
                      onClick={()=>handleCardClick(i)}
                    >
                      {i+1}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="toolbar" style={{justifyContent:"space-between"}}>
              <button className="btn" onClick={()=>setShowCard(false)}>❌ 退出答题卡</button>
              <button className="btn danger" onClick={handleClearRecords}>🧹 清除本章痕迹</button>
            </div>
          </div>
        </div>
      )}

      <div className="card-float-btn" onClick={()=>setShowCard(true)}>🗂️</div>
    </div>
  );
}
