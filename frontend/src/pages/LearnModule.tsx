import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { BookOpen, ChevronDown, ChevronUp, Shield, Smartphone, TrendingUp, Lock, Play, Video } from "lucide-react";
import { useTranslation } from "react-i18next";

const categories = [
  {
    title: "Phishing Attacks",
    icon: Shield,
    lessons: [
      {
        title: "What is Phishing?",
        content: "Phishing is a type of social engineering attack where attackers disguise as trustworthy entities via email, text, or websites to steal sensitive information like passwords, credit card numbers, and personal data. Always verify the sender before clicking any links.",
        videoUrl: "https://www.youtube.com/embed/XBkzBrXlle0",
        videoTitle: "Understanding Phishing Attacks",
      },
      {
        title: "Email Phishing Red Flags",
        content: "Watch for: misspelled domains (goog1e.com), urgent language, generic greetings, suspicious attachments, and requests for personal information. Legitimate companies never ask for passwords via email.",
        videoUrl: "https://www.youtube.com/embed/Y7zNlEMDmI4",
        videoTitle: "How to Spot Phishing Emails",
      },
      {
        title: "How to Protect Yourself",
        content: "Enable 2FA on all accounts, use a password manager, verify URLs before entering credentials, keep software updated, and report suspicious emails to your IT department.",
        videoUrl: "https://www.youtube.com/embed/aO858HyFbKI",
        videoTitle: "Protecting Against Phishing",
      },
    ],
  },
  {
    title: "OTP Fraud",
    icon: Lock,
    lessons: [
      {
        title: "Understanding OTP Scams",
        content: "Scammers call pretending to be bank officials and ask you to share OTPs. Remember: No bank will ever ask for your OTP. An OTP is a one-time password meant only for you.",
        videoUrl: "https://www.youtube.com/embed/PWVN3Rq4gzw",
        videoTitle: "OTP Fraud Explained",
      },
      {
        title: "Common OTP Fraud Techniques",
        content: "SIM swapping, fake customer care calls, social media impersonation, and QR code scams are common methods used to steal OTPs.",
        videoUrl: "https://www.youtube.com/embed/3aj3MOgnKCc",
        videoTitle: "OTP Fraud Prevention Tips",
      },
    ],
  },
  {
    title: "Investment Scams",
    icon: TrendingUp,
    lessons: [
      {
        title: "Ponzi & Pyramid Schemes",
        content: "These schemes promise high returns with little risk. They use new investors' money to pay earlier investors. If returns seem too good to be true, they probably are.",
        videoUrl: "https://www.youtube.com/embed/t6AEwqKI0CE",
        videoTitle: "How Ponzi Schemes Work",
      },
      {
        title: "Crypto Scams",
        content: "Fake ICOs, pump-and-dump schemes, and fraudulent exchanges. Always research before investing and use only regulated platforms.",
        videoUrl: "https://www.youtube.com/embed/usjce4_hfnc",
        videoTitle: "Cryptocurrency Scam Warning Signs",
      },
    ],
  },
  {
    title: "UPI Fraud",
    icon: Smartphone,
    lessons: [
      {
        title: "QR Code Scams",
        content: "Scammers send QR codes claiming you'll receive money, but scanning actually debits your account. Never scan QR codes to RECEIVE money – QR codes are only for SENDING money.",
        videoUrl: "https://www.youtube.com/embed/x1USgJspFJk",
        videoTitle: "QR Code Scam Awareness",
      },
      {
        title: "Fake Payment Apps",
        content: "Fraudsters create fake payment screenshots or apps that mimic real UPI apps. Always verify payments in your bank statement, not just the app notification.",
        videoUrl: "https://www.youtube.com/embed/0v1aDyx4GWg",
        videoTitle: "Fake Payment App Detection",
      },
    ],
  },
];

const LearnModule = () => {
  const { t } = useTranslation();
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">{t('video.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('video.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((cat, catIdx) => (
          <GlassCard key={catIdx} delay={catIdx * 0.1} className="cursor-pointer">
            <button
              onClick={() => setExpandedCategory(expandedCategory === catIdx ? null : catIdx)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-sm font-semibold text-foreground">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.lessons.length} lessons</p>
                </div>
              </div>
              {expandedCategory === catIdx ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence>
              {expandedCategory === catIdx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-2">
                    {cat.lessons.map((lesson, lessonIdx) => {
                      const key = `${catIdx}-${lessonIdx}`;
                      return (
                        <div key={key} className="rounded-lg bg-muted/20 overflow-hidden">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedLesson(expandedLesson === key ? null : key);
                            }}
                            className="w-full flex items-center justify-between p-3 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-primary/70" />
                              <span className="text-sm text-foreground">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Video className="h-3.5 w-3.5 text-secondary" />
                              <ChevronDown
                                className={`h-4 w-4 text-muted-foreground transition-transform ${
                                  expandedLesson === key ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </button>
                          <AnimatePresence>
                            {expandedLesson === key && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-3 pb-3 space-y-3"
                              >
                                {/* Video Section */}
                                <div className="relative rounded-lg overflow-hidden border border-border/30 bg-background/50">
                                  {showVideo === key ? (
                                    <div className="aspect-video">
                                      <iframe
                                        src={lesson.videoUrl}
                                        title={lesson.videoTitle}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      />
                                    </div>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowVideo(key);
                                      }}
                                      className="w-full aspect-video flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all group"
                                    >
                                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors neon-glow">
                                        <Play className="h-5 w-5 text-primary ml-0.5" />
                                      </div>
                                      <span className="text-xs text-muted-foreground font-medium">
                                        {lesson.videoTitle}
                                      </span>
                                    </button>
                                  )}
                                </div>

                                {/* Text Content */}
                                <div className="p-3 rounded-lg bg-muted/10 border border-border/10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="h-3.5 w-3.5 text-primary/60" />
                                    <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
                                      Reading Material
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {lesson.content}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default LearnModule;
