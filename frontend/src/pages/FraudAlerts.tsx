import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { AlertTriangle, Shield, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const alerts = [
  {
    id: 1,
    title: "UPI Fraud Alert: Fake QR Codes",
    severity: "high",
    description: "Multiple reports of fraudulent QR codes circulating via WhatsApp promising cashback. Scanning these codes debits money from your account.",
    time: "10 minutes ago",
  },
  {
    id: 2,
    title: "Phishing Campaign: Fake Tax Refund",
    severity: "high",
    description: "A mass phishing email campaign targeting taxpayers with fake refund claims. The emails contain malicious links mimicking government websites.",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "New SIM Swap Scam Technique",
    severity: "medium",
    description: "Scammers are using social media data to answer security questions and initiate SIM swaps. Enable SIM lock with your carrier.",
    time: "5 hours ago",
  },
  {
    id: 4,
    title: "Crypto Investment Scam Ring Busted",
    severity: "low",
    description: "Law enforcement has identified a fraudulent crypto investment platform that scammed users of ₹50 Crore. Affected users should report to cybercrime portal.",
    time: "1 day ago",
  },
  {
    id: 5,
    title: "Banking Trojan Targeting Mobile Apps",
    severity: "high",
    description: "A new Android trojan disguised as a utility app is stealing banking credentials. Avoid installing apps from unofficial sources.",
    time: "1 day ago",
  },
];

const severityConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "High Risk" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", label: "Medium" },
  low: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", label: "Low" },
};

const FraudAlerts = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">{t('alerts.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('alerts.subtitle')}</p>
      </motion.div>

      <div className="space-y-4">
        {alerts.map((alert, i) => {
          const sev = severityConfig[alert.severity as keyof typeof severityConfig];
          return (
            <GlassCard
              key={alert.id}
              delay={i * 0.1}
              className={`border ${sev.border} ${alert.severity === "high" ? "pulse-alert" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${sev.bg} shrink-0`}>
                  {alert.severity === "high" ? (
                    <AlertTriangle className={`h-5 w-5 ${sev.color}`} />
                  ) : (
                    <Shield className={`h-5 w-5 ${sev.color}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-sm font-semibold text-foreground">{alert.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sev.bg} ${sev.color} font-medium`}>
                      {sev.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{alert.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default FraudAlerts;
