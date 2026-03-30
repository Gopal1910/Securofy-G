import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import GlassCard from "../components/GlassCard";
import { Shield, TrendingUp, AlertTriangle, BookOpen, Activity, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { io } from "socket.io-client";
import api from "../lib/api";
import { useTranslation } from "react-i18next";

const initialActivity = [
  { text: "Completed Phishing 101 module", time: "2 hours ago", icon: CheckCircle },
  { text: "New fraud alert: UPI scam detected", time: "5 hours ago", icon: AlertTriangle },
  { text: "Quiz score: 85% on Investment Scams", time: "1 day ago", icon: Activity },
  { text: "Simulator: Survived email phishing attack", time: "2 days ago", icon: Shield },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [activities, setActivities] = useState<any[]>(initialActivity);

  useEffect(() => {
    if (!user) return;
    
    const socket = io(api.defaults.baseURL?.replace('/api', '') || 'http://localhost:5000', {
      withCredentials: true
    });
    
    socket.emit('join_user_room', user._id);
    
    socket.on('activity_update', (update) => {
      let text = "New activity";
      let icon = Activity;
      
      if (update.type === 'quiz_completed') {
        text = `Quiz score: ${update.data.score}/${update.data.totalQuestions} on Level ${update.data.level}`;
        icon = CheckCircle;
      } else if (update.type === 'simulation_completed') {
        text = `Simulator: ${update.data.identifiedSafely ? 'Survived' : 'Failed'} ${update.data.scenarioType}`;
        icon = Shield;
      }

      const newActivity = { text, time: "Just now", icon };
      setActivities(prev => [newActivity, ...prev].slice(0, 10)); // keep last 10
    });
    
    return () => {
      socket.disconnect();
    };
  }, [user]);
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.subtitle')}</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Shield} label={t('dashboard.securityScore')} value="78/100" trend="+5" trendUp delay={0.1} />
        <StatCard icon={BookOpen} label={t('dashboard.lessonsCompleted')} value={12} trend="+3" trendUp delay={0.2} />
        <StatCard icon={AlertTriangle} label={t('dashboard.activeAlerts')} value={3} trend="-2" trendUp delay={0.3} />
        <StatCard icon={TrendingUp} label={t('dashboard.quizAccuracy')} value="85%" trend="+12%" trendUp delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Meter */}
        <GlassCard className="lg:col-span-1" delay={0.5}>
          <h3 className="font-display text-sm font-semibold text-foreground mb-4">{t('dashboard.riskLevel')}</h3>
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeDasharray={`${78 * 2.51} ${100 * 2.51}`}
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_6px_hsl(var(--neon-cyan)/0.6)]"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-display font-bold neon-text">78</span>
              </div>
            </div>
            <p className="text-sm text-primary mt-3 font-medium">{t('dashboard.lowRisk')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('dashboard.riskDesc')}</p>
          </div>
        </GlassCard>

        {/* Progress Chart */}
        <GlassCard className="lg:col-span-2" delay={0.6}>
          <h3 className="font-display text-sm font-semibold text-foreground mb-4">{t('dashboard.weeklyProgress')}</h3>
          <div className="space-y-4">
            {[
              { label: t('dashboard.phishing'), value: 90, color: "bg-primary" },
              { label: t('dashboard.upiFraud'), value: 65, color: "bg-secondary" },
              { label: t('dashboard.investmentScams'), value: 45, color: "bg-neon-purple" },
              { label: t('dashboard.otpFraud'), value: 80, color: "bg-primary" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground font-medium">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Activity Feed */}
      <GlassCard delay={0.8}>
        <h3 className="font-display text-sm font-semibold text-foreground mb-4">{t('dashboard.recentActivity')}</h3>
        <div className="space-y-3">
          {activities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/20 transition-colors"
            >
              <div className="p-1.5 rounded-md bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
