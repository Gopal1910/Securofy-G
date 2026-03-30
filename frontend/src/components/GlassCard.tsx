import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
}

const GlassCard = ({ children, className = "", glow = false, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`glass-card ${glow ? "neon-glow" : ""} p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
