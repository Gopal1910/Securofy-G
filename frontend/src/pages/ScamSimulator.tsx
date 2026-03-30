import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { ShieldAlert, ArrowRight, RotateCcw, CheckCircle, XCircle, Wifi, Battery, Signal } from "lucide-react";
import api from "../lib/api";
import { useTranslation } from "react-i18next";

interface Scenario {
  id: number;
  title: string;
  description: string;
  situation: string;
  sender?: string;
  options: { text: string; correct: boolean; feedback: string }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Suspicious Email",
    description: "You receive an urgent email from your bank.",
    sender: "support@bnk-secure-verify.com",
    situation: "Dear Customer, your account has been compromised. Click here immediately to verify your identity or your account will be frozen in 24 hours.",
    options: [
      { text: "Click the link and verify your identity", correct: false, feedback: "❌ Never click links in suspicious emails! The domain 'bnk-secure-verify.com' is not your real bank's domain." },
      { text: "Call your bank using the number on your card", correct: true, feedback: "✅ Correct! Always contact your bank through official channels to verify any claims." },
      { text: "Reply to the email asking for more details", correct: false, feedback: "❌ Never reply to suspicious emails. This confirms your email is active to scammers." },
    ],
  },
  {
    id: 2,
    title: "Phone Call Scam",
    description: "Someone calls claiming to be a bank executive.",
    sender: "+91 98XXX XXXXX",
    situation: "Hello, I'm calling from your bank's fraud department. We've detected suspicious activity on your account. I need your OTP to block the unauthorized transaction right now.",
    options: [
      { text: "Share the OTP to stop the transaction", correct: false, feedback: "❌ Banks NEVER ask for OTPs over phone. Sharing OTPs gives scammers access to your account." },
      { text: "Hang up and call your bank directly", correct: true, feedback: "✅ Correct! Always hang up and call your bank's official helpline to verify." },
      { text: "Ask them to prove they're from the bank", correct: false, feedback: "❌ Scammers can fake credentials. The safest action is to hang up and call officially." },
    ],
  },
  {
    id: 3,
    title: "Too-Good Investment",
    description: "A friend shares an investment opportunity on WhatsApp.",
    sender: "Friend • WhatsApp",
    situation: "Join this investment group! Guaranteed 50% returns in just 30 days. Over 10,000 people have already made money. Deposit ₹10,000 today and get ₹15,000 back!",
    options: [
      { text: "Invest ₹10,000 to try it out", correct: false, feedback: "❌ 'Guaranteed high returns' is the #1 red flag of a Ponzi scheme. No legitimate investment guarantees returns." },
      { text: "Research the company on SEBI's website", correct: true, feedback: "✅ Correct! Always verify investment schemes with SEBI (or your country's regulator) before investing." },
      { text: "Ask your friend if they made money", correct: false, feedback: "❌ Your friend might be unknowingly part of a pyramid scheme. Always do independent research." },
    ],
  },
];

const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="mx-auto w-full max-w-[360px]">
      {/* Phone outer shell */}
      <div className="relative rounded-[2.5rem] border-[3px] border-muted/40 bg-background p-1.5 shadow-2xl shadow-primary/10">
        {/* Inner bezel */}
        <div className="rounded-[2rem] border border-border/30 bg-card overflow-hidden">
          {/* Notch / Dynamic Island */}
          <div className="relative flex items-center justify-center pt-2 pb-1 bg-card">
            <div className="w-24 h-6 rounded-full bg-background border border-border/20" />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-1.5 text-[10px] text-muted-foreground">
            <span className="font-semibold">{time}</span>
            <div className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Screen content */}
          <div className="min-h-[480px] max-h-[540px] overflow-y-auto px-3 pb-4 scrollbar-thin">
            {children}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2 bg-card">
            <div className="w-28 h-1 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ScamSimulator = () => {
  const { t } = useTranslation();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleSelect = (optIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    if (scenario.options[optIdx].correct) setScore((s) => s + 1);
  };

  const handleNext = async () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario((c) => c + 1);
      setSelectedOption(null);
    } else {
      setCompleted(true);
      try {
        await api.post('/simulate', {
          scenarioType: 'Mixed',
          identifiedSafely: score >= 2 // pass mark
        });
      } catch (err) {
        console.error('Failed to save simulation result', err);
      }
    }
  };

  const handleReset = () => {
    setCurrentScenario(0);
    setSelectedOption(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">{t('simulator.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('simulator.subtitle')}</p>
      </motion.div>

      {/* Progress bar outside phone */}
      {!completed && (
        <div className="flex items-center gap-2 max-w-[360px] mx-auto">
          {scenarios.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i <= currentScenario ? "bg-primary" : "bg-muted/30"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
            {currentScenario + 1}/{scenarios.length}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <PhoneFrame>
              {/* App header inside phone */}
              <div className="flex items-center gap-2 px-2 py-2 border-b border-border/20 mb-3">
                <div className="p-1.5 rounded-lg bg-destructive/10">
                  <ShieldAlert className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-xs font-display font-semibold text-foreground">{scenario.title}</p>
                  {scenario.sender && (
                    <p className="text-[10px] text-muted-foreground">From: {scenario.sender}</p>
                  )}
                </div>
              </div>

              {/* Message bubble */}
              <div className="mx-1 mb-3">
                <div className="rounded-2xl rounded-tl-sm bg-muted/30 border border-border/20 p-3">
                  <p className="text-xs text-foreground leading-relaxed">{scenario.situation}</p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 text-right">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="px-1 space-y-2">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1">
                  What would you do?
                </p>
                {scenario.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileTap={selectedOption === null ? { scale: 0.97 } : {}}
                    onClick={() => handleSelect(i)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs ${
                      selectedOption === null
                        ? "border-border/30 hover:border-primary/50 active:bg-primary/5"
                        : selectedOption === i
                        ? opt.correct
                          ? "border-primary bg-primary/10"
                          : "border-destructive bg-destructive/10"
                        : opt.correct
                        ? "border-primary/30 bg-primary/5"
                        : "border-border/10 opacity-40"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 shrink-0">
                        {selectedOption !== null ? (
                          opt.correct ? (
                            <CheckCircle className="h-3.5 w-3.5 text-primary" />
                          ) : selectedOption === i ? (
                            <XCircle className="h-3.5 w-3.5 text-destructive" />
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full border border-border/30" />
                          )
                        ) : (
                          <div className="h-3.5 w-3.5 rounded-full border border-border/50" />
                        )}
                      </div>
                      <span className="text-foreground leading-snug">{opt.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Feedback */}
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-1 mt-3 space-y-2"
                >
                  <div className="p-2.5 rounded-xl bg-muted/20 border border-border/10 text-[11px] text-muted-foreground leading-relaxed">
                    {scenario.options[selectedOption].feedback}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 text-xs font-medium transition-colors"
                  >
                    {currentScenario < scenarios.length - 1 ? t('simulator.nextScenario') : "See Results"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </PhoneFrame>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <PhoneFrame>
              <div className="flex flex-col items-center justify-center min-h-[350px] text-center px-4 space-y-4">
                <div className="text-5xl font-display font-bold neon-text">{score}/{scenarios.length}</div>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {score === scenarios.length ? "Perfect Score!" : score >= 2 ? "Great Job!" : "Keep Learning!"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  You correctly identified {score} out of {scenarios.length} fraud scenarios.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 text-sm font-medium transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </button>
              </div>
            </PhoneFrame>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScamSimulator;
