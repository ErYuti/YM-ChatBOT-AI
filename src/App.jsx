import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import AnswerBox from "./components/AnswerBox";

const App = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
    
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("qa-history") || "[]");
    setHistory(stored);
  }, []);

  const saveHistory = (q, a) => {
    const newEntry = { id: Date.now(), q, a };
    const updated = [newEntry, ...history.slice(0, 19)];
    setHistory(updated);
    localStorage.setItem("qa-history", JSON.stringify(updated));
  };

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const payload = { contents: [{ parts: [{ text: question }] }] };
      const res = await fetch(`${import.meta.env.VITE_GEMINI_API_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      const answer =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found.";
      setResult(answer);
      saveHistory(question, answer);
    } catch {
      setResult("❌ Failed to fetch answer.");
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = (id) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("qa-history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("qa-history");
  };

  return (
    <div
      className={dark ? "bg-zinc-900 text-white" : "bg-purple-100 text-black"}
    >
      <div className="grid md:grid-cols-5 min-h-screen overflow-hidden">
        <Sidebar
          history={history}
          deleteEntry={deleteEntry}
          clearHistory={clearHistory}
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(false)}
          dark={dark}
        />

        <main className="md:col-span-4 w-full p-4 sm:p-6 lg:p-10 flex flex-col gap-6">
          <Header
            dark={dark}
            toggleDark={() => setDark(!dark)}
            toggleSidebar={() => setSidebarOpen(true)}
          />
          <ChatBox
            question={question}
            setQuestion={setQuestion}
            askAI={askAI}
            loading={loading}
          />
          <AnswerBox result={result} />
        </main>
      </div>
    </div>
  );
};

export default App;
