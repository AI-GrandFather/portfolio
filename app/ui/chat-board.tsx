"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { AI_ASSISTANT_DEFAULTS } from "../lib/content";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const starterMessages: Message[] = [
  {
    role: "assistant",
    content: AI_ASSISTANT_DEFAULTS.greeting,
  },
];

export function ChatBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  async function sendMessage(message: string) {
    const trimmed = message.trim();
    if (!trimmed || isSending) return;

    setError("");
    setIsSending(true);
    setInput("");
    setMessages((current) => [...current, { role: "user", content: trimmed }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-10),
        }),
      });
      const payload = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "The assistant could not respond.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: payload.reply! },
      ]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The assistant is unavailable.");
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className={`chat-toggle ${isOpen ? "active" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        )}
      </button>

      {/* Popup Window */}
      <div className={`chat-popup ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <h3>Athar&apos;s AI</h3>
          <p>Ask about the work or your next build.</p>
        </div>

        <div className="chat-body">
          <div className="chat-log" ref={chatLogRef}>
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={index}>
                <p>{message.content}</p>
              </div>
            ))}
            {isSending && (
              <div className="chat-message assistant">
                <p className="typing-dots"><span>.</span><span>.</span><span>.</span></p>
              </div>
            )}
            {error && <p className="chat-error">{error}</p>}
          </div>

          <div className="quick-prompts">
            {AI_ASSISTANT_DEFAULTS.questions.map((q) => (
              <button key={q} onClick={() => void sendMessage(q)} disabled={isSending}>
                {q}
              </button>
            ))}
          </div>
        </div>

        <form className="chat-footer" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            maxLength={900}
            disabled={isSending}
          />
          <button type="submit" className="chat-send-btn" disabled={isSending || !input.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </form>
      </div>
    </>
  );
}
