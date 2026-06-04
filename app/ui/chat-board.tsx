"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AI_ASSISTANT_DEFAULTS } from "../lib/content";

export function ChatBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error, append } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "initial-greeting",
        role: "assistant",
        content: AI_ASSISTANT_DEFAULTS.greeting,
      },
    ],
  });

  const chatLogRef = useRef<HTMLDivElement>(null);
  const isConversationActive = messages.length > 1;

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  function resetChat() {
    setMessages([
      {
        id: "initial-greeting",
        role: "assistant",
        content: AI_ASSISTANT_DEFAULTS.greeting,
      },
    ]);
  }

  const sendMessage = async (content: string) => {
    await append({ role: 'user', content });
  };

  return (
    <>
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

      <div className={`chat-popup ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          {isConversationActive && (
            <button className="chat-back-btn" onClick={resetChat} aria-label="Back to starter questions">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
          )}
          <h3>Chat with Athar</h3>
        </div>

        <div className="chat-body">
          <div className="chat-log" ref={chatLogRef}>
            {messages.map((message) => (
              <div className={`chat-message ${message.role}`} key={message.id}>
                <div className="message-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="chat-message assistant">
                <p className="typing-dots"><span>.</span><span>.</span><span>.</span></p>
              </div>
            )}
            {error && (
              <p className="chat-error">
                {(() => {
                  try {
                    const parsed = JSON.parse(error.message);
                    return parsed.error || "The assistant is unavailable.";
                  } catch {
                    return error.message || "The assistant is unavailable.";
                  }
                })()}
              </p>
            )}
          </div>

          {!isConversationActive && (
            <div className="quick-prompts">
              {AI_ASSISTANT_DEFAULTS.questions.map((q) => (
                <button key={q} onClick={() => void sendMessage(q)} disabled={isLoading}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="chat-footer" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question..."
            maxLength={900}
            disabled={isLoading}
          />
          <button type="submit" className="chat-send-btn" disabled={isLoading || !input.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </form>
      </div>
    </>
  );
}
