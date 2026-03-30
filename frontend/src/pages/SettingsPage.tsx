import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { Settings as SettingsIcon, Globe, Volume2, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../lib/api";

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(() => localStorage.getItem("i18nextLng") || "en");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleLangChange = async (code: string) => {
    setLang(code);
    localStorage.setItem("i18nextLng", code);
    i18n.changeLanguage(code);
    try {
      await api.put('/users/profile', { language: code });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your experience</p>
      </motion.div>

      <div className="max-w-2xl space-y-4">
        {/* Language */}
        <GlassCard delay={0.1}>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-display text-sm font-semibold text-foreground">Language</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { code: "en", label: "English" },
              { code: "hi", label: "हिन्दी" },
              { code: "mr", label: "मराठी" },
              { code: "bn", label: "বাংলা" },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => handleLangChange(l.code)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  lang === l.code
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Voice */}
        <GlassCard delay={0.2}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground">Voice Output</h3>
                <p className="text-xs text-muted-foreground">AI chatbot speaks responses aloud</p>
              </div>
            </div>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`relative h-6 w-11 rounded-full transition-colors ${voiceEnabled ? "bg-primary" : "bg-muted"}`}
            >
              <motion.div
                animate={{ x: voiceEnabled ? 20 : 2 }}
                className="absolute top-1 h-4 w-4 rounded-full bg-foreground"
              />
            </button>
          </div>
        </GlassCard>

        {/* Notifications */}
        <GlassCard delay={0.3}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground">Notifications</h3>
                <p className="text-xs text-muted-foreground">Receive fraud alert notifications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative h-6 w-11 rounded-full transition-colors ${notifications ? "bg-primary" : "bg-muted"}`}
            >
              <motion.div
                animate={{ x: notifications ? 20 : 2 }}
                className="absolute top-1 h-4 w-4 rounded-full bg-foreground"
              />
            </button>
          </div>
        </GlassCard>

        {/* Theme */}
        <GlassCard delay={0.4}>
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground">Theme</h3>
              <p className="text-xs text-muted-foreground">Securofy is optimized for dark mode</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-primary bg-primary/10 text-center text-sm text-primary font-medium">
              Dark (Active)
            </div>
            <div className="p-3 rounded-lg border border-border/30 text-center text-sm text-muted-foreground cursor-not-allowed opacity-50">
              Light (Coming Soon)
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default SettingsPage;
