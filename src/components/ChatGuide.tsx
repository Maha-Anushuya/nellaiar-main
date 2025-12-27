import { useState } from "react";

export default function ChatGuide() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function send() {
    try {
      const r = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      
      const data = await r.json();

      setMessages((m) => [...m, { role: "user", text: input }, { role: "bot", text: data.reply }]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((m) => [...m, { role: "bot", text: "Sorry, there was an error processing your request." }]);
    }
  }

  return (
    <div>
      <div>{messages.map((m, i) => <p key={i}><b>{m.role}:</b> {m.text}</p>)}</div>
      <input value={input} onChange={(e) => setInput(e.target.value)} className="border p-2" />
      <button onClick={send}>Send</button>
    </div>
  );
}
