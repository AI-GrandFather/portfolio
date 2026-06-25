"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AI_ASSISTANT_DEFAULTS } from "../lib/content";
import {
  hasBlockedSensitiveInput,
  redactSensitiveInput,
} from "../lib/pii-middleware";

export function ChatBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [guardrailError, setGuardrailError] = useState<string | null>(null);
  const {
    messages,
    input,
    handleInputChange,
    setInput,
    setMessages,
    isLoading,
    error,
    append,
  } = useChat({
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

  function getSafeMessage(content: string) {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return null;
    }

    const redacted = redactSensitiveInput(trimmedContent);
    if (hasBlockedSensitiveInput(redacted.redactions)) {
      setGuardrailError(
        "Please remove API keys, tokens, private keys, or payment card details before sending.",
      );
      return null;
    }

    setGuardrailError(null);
    return redacted.text;
  }

  const sendMessage = async (content: string) => {
    const safeMessage = getSafeMessage(content);
    if (!safeMessage) {
      return;
    }

    await append({ role: "user", content: safeMessage });
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safeMessage = getSafeMessage(input);
    if (!safeMessage) {
      return;
    }

    setInput("");
    void append({ role: "user", content: safeMessage });
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
            {(guardrailError || error) && (
              <p className="chat-error">
                {guardrailError ||
                  (() => {
                    try {
                      const parsed = JSON.parse(error?.message || "");
                      return parsed.error || "The assistant is unavailable.";
                    } catch {
                      return error?.message || "The assistant is unavailable.";
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

        <form className="chat-footer" onSubmit={submitMessage}>
          <input
            className="chat-input"
            value={input}
            onChange={(event) => {
              setGuardrailError(null);
              handleInputChange(event);
            }}
            placeholder="Ask a question..."
            maxLength={1500}
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
