import { Bell, Globe, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "bn", label: "বাংলা" }
];

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(() => localStorage.getItem("i18nextLng") || "en");
  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const handleLang = (code: string) => {
    setLang(code);
    localStorage.setItem("i18nextLng", code);
    i18n.changeLanguage(code);
    setShowLang(false);
  };

  return (
    <header className="h-16 border-b border-border/30 glass-card rounded-none flex items-center justify-between px-4 md:px-6 sticky top-0 z-[100] overflow-visible">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted/30 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <h2 className="font-display text-sm tracking-widest text-muted-foreground uppercase hidden sm:block">
          Command Center
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/30"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{languages.find(l => l.code === lang)?.label}</span>
          </button>
          {showLang && (
            <div className="absolute right-0 top-full mt-1 glass-card p-1 min-w-[140px] z-50 transform origin-top-right shadow-xl">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLang(l.code)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    lang === l.code ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* Logout Button */}
        <button 
          onClick={logout}
          className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors px-3 py-1.5 rounded-md hover:bg-destructive/10"
        >
          {t('nav.logout')}
        </button>

        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-display font-bold text-primary-foreground">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
