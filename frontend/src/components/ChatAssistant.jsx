import React, { useContext, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const ChatAssistant = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const {backendUrl} = useContext(ShopContext);

  const sendMessage = async () => {
  if (!input.trim()) return;

  // Add user message
  const newMessages = [...messages, { sender: "user", text: input }];
  setMessages(newMessages);
  setLoading(true);
  const userQuestion = input;
  setInput("");

  try {
   const res = await axios.post(`${backendUrl}/api/assistant/ask`, {
  question: userQuestion,
  description,
});


    setMessages([
      ...newMessages,
      { sender: "assistant", text: res.data.answer },
    ]);
  } catch (err) {
    setMessages([
      ...newMessages,
      { sender: "assistant", text: "Sorry, I couldn't get an answer." },
    ]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-2xl border overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-orange-500 text-white px-4 py-2">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 p-3 overflow-y-auto text-sm flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "ml-auto bg-orange-100 text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-xs">Thinking...</div>}
          </div>

          {/* Input */}
          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about this product..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 text-white px-4 text-sm hover:bg-orange-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;

