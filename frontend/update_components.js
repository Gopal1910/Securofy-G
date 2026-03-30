const fs = require('fs');
const path = require('path');

const srcPaths = [
  {
    file: 'FraudAlerts.tsx',
    replacements: [
      { from: 'import { ShieldAlert, AlertTriangle, ShieldCheck, Search, ChevronDown, CheckCircle } from "lucide-react";', to: 'import { ShieldAlert, AlertTriangle, ShieldCheck, Search, ChevronDown, CheckCircle } from "lucide-react";\nimport { useTranslation } from "react-i18next";' },
      { from: 'const FraudAlerts = () => {', to: 'const FraudAlerts = () => {\n  const { t } = useTranslation();' },
      { from: '<h1 className="text-3xl font-display font-bold text-foreground">Fraud Alerts</h1>', to: '<h1 className="text-3xl font-display font-bold text-foreground">{t("alerts.title")}</h1>' },
      { from: '<p className="text-muted-foreground mt-1">Stay updated on the latest financial scams and threats.</p>', to: '<p className="text-muted-foreground mt-1">{t("alerts.subtitle")}</p>' }
    ]
  },
  {
    file: 'LearnModule.tsx',
    replacements: [
      { from: 'import { Play, CheckCircle, Clock } from "lucide-react";', to: 'import { Play, CheckCircle, Clock } from "lucide-react";\nimport { useTranslation } from "react-i18next";' },
      { from: 'const LearnModule = () => {', to: 'const LearnModule = () => {\n  const { t } = useTranslation();' },
      { from: '<h1 className="text-3xl font-display font-bold text-foreground">Learning Modules</h1>', to: '<h1 className="text-3xl font-display font-bold text-foreground">{t("video.title")}</h1>' },
      { from: '<p className="text-muted-foreground mt-1">Master digital security through interactive video lessons</p>', to: '<p className="text-muted-foreground mt-1">{t("video.subtitle")}</p>' },
      { from: '<p className="text-muted-foreground mt-1">Master digital security through interactive lessons</p>', to: '<p className="text-muted-foreground mt-1">{t("video.subtitle")}</p>' }
    ]
  },
  {
    file: 'QuizModule.tsx',
    replacements: [
      { from: 'import { CheckCircle, XCircle, ArrowRight, RotateCcw, AlertTriangle, Trophy } from "lucide-react";', to: 'import { CheckCircle, XCircle, ArrowRight, RotateCcw, AlertTriangle, Trophy } from "lucide-react";\nimport { useTranslation } from "react-i18next";' },
      { from: 'const QuizModule = () => {', to: 'const QuizModule = () => {\n  const { t } = useTranslation();' },
      { from: '<h1 className="text-3xl font-display font-bold text-foreground">Security Quiz</h1>', to: '<h1 className="text-3xl font-display font-bold text-foreground">{t("quiz.title")}</h1>' },
      { from: '<p className="text-muted-foreground mt-1">Test your knowledge on digital fraud prevention</p>', to: '<p className="text-muted-foreground mt-1">{t("quiz.subtitle")}</p>' }
    ]
  },
  {
    file: 'ScamSimulator.tsx',
    replacements: [
      { from: 'import { ShieldAlert, ArrowRight, RotateCcw, CheckCircle, XCircle, Wifi, Battery, Signal } from "lucide-react";\nimport { ShieldAlert, ArrowRight, RotateCcw, CheckCircle, XCircle, Wifi, Battery, Signal } from "lucide-react";', to: 'import { ShieldAlert, ArrowRight, RotateCcw, CheckCircle, XCircle, Wifi, Battery, Signal } from "lucide-react";' }
    ]
  }
];

srcPaths.forEach(({ file, replacements }) => {
  const filePath = path.join('c:\\\\Users\\\\mgopa\\\\OneDrive\\\\Desktop\\\\Securofy MERN\\\\src\\\\pages', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(rep => {
      content = content.replace(rep.from, rep.to);
    });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
