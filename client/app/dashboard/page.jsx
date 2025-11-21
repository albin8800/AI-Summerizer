"use client";

import api from "@/lib/axios";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import SummaryCard from "@/components/SummaryCard";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const textareaRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [text]);

  const handleSend = async () => {
  if (!text.trim()) return;

  setLoading(true);

  try {
    const res = await api.post("/summary/create", {
      originalText: text,
      tone: "neutral",
    });

    const newSummary = res.data.data;
    setHistory((prev) => [newSummary, ...prev]);
    setText("");
  } catch (error) {
    console.log("Error generating summary:", error);
  } finally {
    setLoading(false);
  }
};


  const loadHistory = async () => {
    try {
      const res = await api.get("/summary/list");
      setHistory(res.data.data);
    } catch (error) {
      console.log("Error loading history:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F8F8F8] pb-32">
      <div className="w-full max-w-4xl h-[88px] bg-white pl-6 rounded-full mt-6 flex items-center justify-start gap-6 px-6 shadow-sm">
        <div
          onClick={() => setSidebarOpen(true)}
          className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center cursor-pointer"
        >
          <img className="w-6 h-6" src="/images/icons/menu.svg" alt="menu" />
        </div>

        <h1 className="text-[16px] font-semibold text-black">AI Summarizer</h1>
      </div>

      <div className="w-full max-w-4xl mt-6 px-6">
        <div className="text-xl font-semibold text-gray-700">
          👋 Hi {user?.name}, welcome to AI Summarizer
        </div>
      </div>

      {/* HISTORY LIST */}
      <div className="w-full max-w-4xl mt-4 px-6 space-y-5">
        {history.length === 0 ? (
          <div className="text-gray-500 mt-10 text-center">
            No summaries yet — paste your text below to generate one.
          </div>
        ) : (
          history.map((item) => (
            <SummaryCard
              key={item._id}
              original={item.originalText}
              summary={item.summaryText}
            />
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full pb-4 px-4">
        <div className="flex justify-center w-full">
          <div className="flex w-full max-w-4xl min-h-16 border bg-white border-[#CDCDCD] rounded-2xl gap-4 px-6 items-start py-3 shadow">
            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter or paste long text here..."
              className="w-full outline-none border-0 resize-none overflow-hidden bg-transparent text-[15px] leading-5"
              style={{ maxHeight: "200px" }}
            />

            <div
              onClick={!loading ? handleSend : null}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                loading
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-[#F8F8F8] hover:bg-[#EDEDED] cursor-pointer"
              }`}
            >
              {!loading ? (
                <img
                  className="w-6 h-6"
                  src="/images/icons/send.svg"
                  alt="send"
                />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-out`}
      >
        <div className="p-6 flex flex-col gap-6">
          <div
            className="flex justify-end cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <img
              src="/images/icons/close.svg"
              className="w-6 h-6"
              alt="close"
            />
          </div>

          <h2 className="text-xl font-semibold">Menu</h2>
          <hr />

          <button
            onClick={() => {
              loadHistory();
              setSidebarOpen(false);
            }}
            className="text-left text-[16px] font-medium text-gray-700 hover:text-black"
          >
            📜 History
          </button>

          <button
            onClick={logout}
            className="text-left text-[16px] font-medium text-gray-700 hover:text-black"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
