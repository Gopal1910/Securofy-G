import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, Volume2, VolumeX, Trash2 } from "lucide-react";
import api from "../lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string[]> = {
  phishing: [
    "Always check the sender's email address carefully.",
    "Never click links from unknown sources."
  ],
  otp: [
    "Never share your OTP with anyone.",
    "Your OTP is like a password."
  ],
  investment: [
    "Avoid guaranteed high-return investments.",
    "Verify platforms with SEBI."
  ],
  default: [
    "I'm your AI financial assistant.",
    "Stay alert from fraud and scams."
  ]
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Securofy AI 🤖 Ask me about fraud, phishing, or financial safety."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm Securofy AI 🤖 Ask me about fraud, phishing, or financial safety."
      }
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await api.post("/chat", { message: input });
      const reply = res.data?.reply || res.data?.response;

      if (!reply) throw new Error("Invalid response");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply }
      ]);

      if (voiceEnabled && "speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(reply);
        speechSynthesis.speak(utter);
      }
    } catch (err) {
      const fallback =
        mockResponses.default[
          Math.floor(Math.random() * mockResponses.default.length)
        ];

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fallback }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
    };

    recognition.start();
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-[999] h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
          >
            <MessageCircle className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat UI */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            className="
              fixed bottom-0 right-0 z-[999]
              w-full sm:w-[380px]
              h-[100dvh] sm:h-[520px]
              flex flex-col overflow-hidden
              rounded-none sm:rounded-xl
              bg-[#0f172a] sm:bg-[#0f172a]/80
              sm:backdrop-blur-xl
              border border-white/10
            "
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-white/10 bg-[#0f172a]">
              <div>
                <h3 className="text-white font-semibold">Securofy AI</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>

              <div className="flex gap-2">
                <button onClick={handleClearChat}>
                  <Trash2 className="text-gray-400 w-4" />
                </button>
                <button onClick={() => setVoiceEnabled(!voiceEnabled)}>
                  {voiceEnabled ? (
                    <Volume2 className="text-blue-400 w-4" />
                  ) : (
                    <VolumeX className="text-gray-400 w-4" />
                  )}
                </button>
                <button onClick={() => setOpen(false)}>
                  <X className="text-gray-400 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 text-sm max-w-[80%] rounded-xl ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-[#1e293b] text-gray-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-gray-400 text-sm">Typing...</div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#0f172a] flex gap-2">
              <button onClick={handleVoiceInput}>
                <Mic
                  className={`w-5 ${
                    isListening ? "text-red-400" : "text-gray-400"
                  }`}
                />
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about scams..."
                className="flex-1 bg-[#1e293b] text-white px-3 py-2 rounded-lg outline-none"
              />

              <button onClick={handleSend}>
                <Send className="text-blue-400 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;