import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, Volume2, VolumeX, Trash2 } from "lucide-react";
import api from "../lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string[]> = {
  phishing: ["Always check the sender's email address carefully. If it looks suspicious, delete it!", "Never click links from unknown sources. Verify with your bank directly."],
  otp: ["Remember, genuine bank representatives will never ask for your OTP.", "Your OTP is like a digital key. Don't share it with anyone over phone or email!"],
  investment: ["If an investment promises guaranteed high returns with zero risk, it's likely a scam.", "Always verify investment platforms with official regulators like SEBI."],
  default: ["I'm your AI financial security assistant. I can help you understand phishing, detect scams, learn about fraud prevention, and explain financial concepts.", "Always stay vigilant! Don't trust urgent emails or SMS demanding immediate payment or details."]
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm **Securofy AI**, your financial security assistant. Ask me anything about fraud prevention, phishing, or financial safety! 🛡️" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleClearChat = () => {
    setMessages([
      { role: "assistant", content: "Hello! I'm **Securofy AI**, your financial security assistant. Ask me anything about fraud prevention, phishing, or financial safety! 🛡️" },
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
      const res = await api.post('/chat', { message: input });
      const response = res.data?.reply || res.data?.response;
      
      if (response) {
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
        if (voiceEnabled && "speechSynthesis" in window) {
           const utterance = new SpeechSynthesisUtterance(response.replace(/[*#_]/g, ""));
           utterance.rate = 0.9;
           speechSynthesis.speak(utterance);
        }
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (e) {
      console.error("Chat API error:", e);
      
      // Smart local fallback to ensure it ALWAYS works for the user
      const lowerInput = input.toLowerCase();
      let fallbackCat = "default";
      if (lowerInput.includes("phishing") || lowerInput.includes("email") || lowerInput.includes("link")) {
        fallbackCat = "phishing";
      } else if (lowerInput.includes("otp") || lowerInput.includes("password") || lowerInput.includes("code")) {
        fallbackCat = "otp";
      } else if (lowerInput.includes("invest") || lowerInput.includes("money") || lowerInput.includes("return")) {
        fallbackCat = "investment";
      }
      
      const possibleReplies = mockResponses[fallbackCat];
      const fallbackReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
      
      setMessages((prev) => [...prev, { role: "assistant", content: fallbackReply }]);
      
      if (voiceEnabled && "speechSynthesis" in window) {
         const utterance = new SpeechSynthesisUtterance(fallbackReply.replace(/[*#_]/g, ""));
         utterance.rate = 0.9;
         speechSynthesis.speak(utterance);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg animate-glow-pulse"
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[999] w-full sm:w-[380px] h-[100dvh] sm:h-[520px] rounded-none sm:rounded-xl bg-background flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 pt-[max(1rem,env(safe-area-inset-top))] border-b border-border flex items-center justify-between bg-background">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow-pulse">
                  <MessageCircle className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">Securofy AI</h3>
                  <p className="text-xs text-primary">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  title="Delete Chat"
                  className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  {voiceEnabled ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-2 rounded-xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-border bg-background">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening ? "bg-destructive/20 text-destructive" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about financial safety..."
                  className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;