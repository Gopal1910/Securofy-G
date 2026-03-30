import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { User, Award, BookOpen, Shield, Target, TrendingUp } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const achievements = [
  { title: "Phishing Pro", desc: "Complete all phishing modules", unlocked: true },
  { title: "Quiz Master", desc: "Score 100% on a quiz", unlocked: true },
  { title: "Simulator Survivor", desc: "Pass all scam simulations", unlocked: false },
  { title: "Alert Reader", desc: "Read 10 fraud alerts", unlocked: false },
  { title: "Voice Explorer", desc: "Use voice chat feature", unlocked: true },
  { title: "Streak Keeper", desc: "7-day learning streak", unlocked: false },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">{t('profile.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('profile.subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <GlassCard glow className="lg:col-span-1 text-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="font-display text-lg font-semibold text-foreground mt-4">{user?.name || 'User'}</h2>
          <p className="text-sm text-muted-foreground">Security Apprentice</p>
          <div className="mt-4 pt-4 border-t border-border/20 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-display font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Lessons</p>
            </div>
            <div>
              <p className="text-lg font-display font-bold text-foreground">85%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div>
              <p className="text-lg font-display font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Badges</p>
            </div>
          </div>
        </GlassCard>

        {/* Progress */}
        <GlassCard className="lg:col-span-2" delay={0.1}>
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Progress Overview
          </h3>
          <div className="space-y-4">
            {[
              { label: "Phishing Awareness", value: 90, icon: Shield },
              { label: "Fraud Detection", value: 65, icon: Target },
              { label: "Financial Literacy", value: 45, icon: BookOpen },
              { label: "Quiz Performance", value: 85, icon: Award },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Achievements */}
      <GlassCard delay={0.3}>
        <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" /> Achievements
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className={`p-3 rounded-lg text-center ${
                ach.unlocked ? "bg-primary/10 border border-primary/30" : "bg-muted/10 border border-border/20 opacity-50"
              }`}
            >
              <Award className={`h-6 w-6 mx-auto ${ach.unlocked ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-xs font-medium text-foreground mt-2">{ach.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{ach.desc}</p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default ProfilePage;
