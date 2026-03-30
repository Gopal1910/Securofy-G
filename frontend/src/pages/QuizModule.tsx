import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { HelpCircle, Clock, CheckCircle, XCircle, RotateCcw, Brain, Zap, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../lib/api";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "What is the safest action when you receive a suspicious email claiming your bank account is compromised?",
    options: ["Click the link to check", "Delete the email", "Call your bank using official number", "Forward it to friends"],
    correct: 2,
    explanation: "Always contact your bank using the official phone number on your bank card or website, never through links in emails.",
  },
  {
    question: "Which of these is a red flag for a phishing website?",
    options: ["HTTPS in URL", "Misspelled domain name", "Company logo present", "Contact page available"],
    correct: 1,
    explanation: "Misspelled domain names (e.g., 'amaz0n.com') are a classic phishing indicator. Scammers create lookalike domains.",
  },
  {
    question: "An OTP (One-Time Password) should be shared with:",
    options: ["Bank customer care", "Family members", "Nobody", "Police"],
    correct: 2,
    explanation: "OTPs should NEVER be shared with anyone, not even bank officials. They are for your use only.",
  },
  {
    question: "What is a Ponzi scheme?",
    options: [
      "A legitimate investment strategy",
      "A fraud paying old investors with new investors' money",
      "A type of cryptocurrency",
      "A government savings scheme",
    ],
    correct: 1,
    explanation: "Ponzi schemes use money from new investors to pay returns to earlier investors, creating an illusion of legitimate returns.",
  },
  {
    question: "How can you verify if an investment opportunity is legitimate?",
    options: [
      "If a friend recommended it",
      "Check with the financial regulator (e.g., SEBI)",
      "If it has a professional website",
      "If returns are guaranteed",
    ],
    correct: 1,
    explanation: "Always verify investment schemes with your country's financial regulator. Guaranteed returns are a red flag.",
  },
];

const QuizModule = () => {
  const { t } = useTranslation();
  const [level, setLevel] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  // We could filter questions based on `level` here or load them. For now we use the existing set as a demo.
  const questionsToUse = questions; 


  const handleTimeout = useCallback(() => {
    setAnswers((prev) => [...prev, null]);
    if (currentQ < questionsToUse.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setTimeLeft(30);
    } else {
      finishQuiz(score);
    }
  }, [currentQ, score]);

  useEffect(() => {
    if (finished || selected !== null) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished, selected, handleTimeout]);

  const finishQuiz = async (finalScore: number) => {
    setFinished(true);
    try {
      await api.post('/quiz', {
        level: level || 'Beginner',
        score: finalScore,
        totalQuestions: questionsToUse.length
      });
    } catch (error) {
      console.error('Failed to submit quiz results', error);
    }
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setAnswers((prev) => [...prev, idx]);
    const newScore = idx === questionsToUse[currentQ].correct ? score + 1 : score;
    setScore(newScore);
  };

  const handleNext = () => {
    if (currentQ < questionsToUse.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setTimeLeft(30);
    } else {
      finishQuiz(score);
    }
  };

  const handleReset = () => {
    setLevel(null);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setTimeLeft(30);
    setAnswers([]);
  };

  if (!level) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-foreground">{t('quiz.title')}</h1>
          <p className="text-muted-foreground mt-1">Select your difficulty level</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'Beginner', icon: Brain, color: 'text-primary' },
            { id: 'Intermediate', icon: Zap, color: 'text-secondary' },
            { id: 'Advanced', icon: ShieldAlert, color: 'text-destructive' }
          ].map((l, i) => (
            <GlassCard key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center p-6 space-y-4">
                <div className={`p-4 rounded-full bg-muted/20 ${l.color}`}>
                  <l.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-display">{l.id}</h3>
                <p className="text-sm text-muted-foreground">Test your knowledge with {l.id.toLowerCase()} level questions.</p>
                <button 
                  onClick={() => setLevel(l.id)}
                  className="w-full mt-4 py-2 bg-primary/20 text-primary font-medium rounded-lg hover:bg-primary/30 transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  const q = questionsToUse[currentQ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">{t('quiz.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('quiz.subtitle')}</p>
      </motion.div>

      {!finished ? (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQ + 1}/{questionsToUse.length} ({level})
            </span>
            <div className={`flex items-center gap-1 text-sm font-medium ${timeLeft <= 10 ? "text-destructive" : "text-muted-foreground"}`}>
              <Clock className="h-4 w-4" />
              {timeLeft}s
            </div>
          </div>

          {/* Timer bar */}
          <div className="h-1 rounded-full bg-muted/30 mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <GlassCard glow className="space-y-6">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <h2 className="text-foreground font-medium">{q.question}</h2>
            </div>

            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={selected === null ? { scale: 1.01 } : {}}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`w-full text-left p-4 rounded-lg border text-sm transition-all ${
                    selected === null
                      ? "border-border/30 hover:border-primary/50 hover:bg-primary/5 text-foreground"
                      : i === q.correct
                      ? "border-primary bg-primary/10 text-foreground"
                      : selected === i
                      ? "border-destructive bg-destructive/10 text-foreground"
                      : "border-border/10 text-muted-foreground opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selected !== null ? (
                      i === q.correct ? (
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      ) : selected === i ? (
                        <XCircle className="h-4 w-4 text-destructive shrink-0" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-border/30 shrink-0" />
                      )
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-border/50 shrink-0" />
                    )}
                    {opt}
                  </div>
                </motion.button>
              ))}
            </div>

            {selected !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/20 text-sm text-muted-foreground">{q.explanation}</div>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 text-sm font-medium transition-colors"
                >
                  {currentQ < questionsToUse.length - 1 ? "Next Question" : "See Results"}
                </button>
              </motion.div>
            )}
          </GlassCard>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <GlassCard glow className="text-center space-y-4">
            <div className="text-5xl font-display font-bold neon-text">{score}/{questionsToUse.length}</div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {score === questionsToUse.length ? "Perfect!" : score >= 3 ? "Well Done!" : "Keep Practicing!"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {Math.round((score / questionsToUse.length) * 100)}% accuracy
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 text-sm font-medium transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default QuizModule;
