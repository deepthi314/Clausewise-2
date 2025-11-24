import React, { useState } from "react";
import { chatbotService } from "../services/chatbotService";

const ChatbotUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const send = async e => {
    e.preventDefault();
    if (!input) return;
    const userMsg = { role: "user", content: input };
    setMessages(m => [...m, userMsg]);
    const res = await chatbotService.ask(input);
    const botMsg = { role: "assistant", content: res.answer };
    setMessages(m => [...m, botMsg]);
    setInput("");
  };
  return (
    <div>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "msg user" : "msg bot"}>{m.content}</div>
        ))}
      </div>
      <form onSubmit={send} className="chat-input">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about Indian law" />
        <button type="submit">Send</button>
      </form>
      <div className="disclaimer">ClauseWise provides analysis only. Consult a lawyer for legal advice.</div>
    </div>
  );
};

export default ChatbotUI;