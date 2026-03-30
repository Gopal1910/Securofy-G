import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  BookOpen,
  Bot,
  Award,
  ShieldCheck,
  PlayCircle,
  Menu,
  X,
  Sparkles,
  Clock,
  TrendingUp,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Helper component for Features to keep the main return clean
  const FeatureCard = ({ icon, title, description }) => (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass-card p-6 md:p-8 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 group bg-muted/5 backdrop-blur-sm"
    >
      <div className="mb-4 p-3 rounded-xl bg-background border border-border group-hover:bg-primary/10 group-hover:border-primary/30 inline-block transition-all">
        {React.cloneElement(icon, { className: "h-8 w-8" })}
      </div>
      <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-['Orbitron',sans-serif] overflow-x-hidden">

      {/* --- NAVBAR WITH LOGO --- */}
      <nav className="sticky top-0 z-50 glass-card border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">

            {/* LOGO AREA */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <ShieldCheck className="h-8 w-8 text-primary z-10 relative" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all"></div>
              </div>
              {/* Logo Text / Image */}
              <span className="font-bold text-xl tracking-wider text-primary">
                SECUROFY
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'features', 'about', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-xs font-semibold uppercase tracking-widest"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground px-3">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-bold bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,168,107,0.4)] transition-all">
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-8 space-y-6 text-center">
                {['home', 'features', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors uppercase tracking-widest"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-6 border-t border-border/10 flex flex-col gap-4">
                  <Link to="/login" className="w-full py-3 rounded-lg border border-border">Login</Link>
                  <Link to="/signup" className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold">Sign Up</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1">

        {/* --- HERO SECTION --- */}
        <section id="home" className="relative py-16 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-[0.3em]">AI-Powered Financial Security</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1]">
              STAY SAFE FROM<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-primary/70">
                DIGITAL FRAUD
              </span>
            </h1>

            <p className="text-base md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed px-4 font-light">
              Learn, Detect, and Prevent Online Scams with Securofy. Understand the tactics scammers use and empower yourself with financial literacy.
            </p>

            {/* Stats - Fully Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-12 px-4">
              <div className="p-6 rounded-2xl bg-muted/5 border border-border/50 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-2xl font-bold tracking-tighter">Interactive</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Learning Modules</p>
              </div>
              <div className="p-6 rounded-2xl bg-muted/5 border border-border/50 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <PlayCircle className="h-6 w-6" />
                  <span className="text-2xl font-bold tracking-tighter">Real-World</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Scam Simulations</p>
              </div>
              <div className="p-6 rounded-2xl bg-muted/5 border border-border/50 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Clock className="h-6 w-6" />
                  <span className="text-2xl font-bold tracking-tighter">24/7</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">AI Chat Support</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link to="/signup" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,168,107,0.3)]">
                Get Started Free
              </Link>
              <a href="#features" className="w-full sm:w-auto px-10 py-4 rounded-xl border border-border bg-background/50 hover:bg-muted/30 transition-all font-medium text-lg">
                Watch Demo
              </a>
            </div>
          </motion.div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Security Arsenal</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to stay protected against modern digital threats.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<ShieldAlert className="text-red-500" />}
              title="Fraud Alerts"
              description="Real-time notifications about the latest ongoing digital scams and suspicious activities."
            />
            <FeatureCard
              icon={<PlayCircle className="text-blue-500" />}
              title="Scam Simulator"
              description="Experience realistic simulated phishing and scam attempts in a safe, controlled environment."
            />
            <FeatureCard
              icon={<Bot className="text-purple-500" />}
              title="AI Chatbot"
              description="Got a suspicious email? Ask our AI assistant instantly to analyze it and give a risk assessment."
            />
            <FeatureCard
              icon={<BookOpen className="text-emerald-500" />}
              title="Learning Modules"
              description="Bite-sized, interactive lessons covering essential financial literacy and core cybersecurity."
            />
            <FeatureCard
              icon={<Award className="text-amber-500" />}
              title="Quiz System"
              description="Test your knowledge, earn badges, and track your progress as you level up your skills."
            />
            <FeatureCard
              icon={<Zap className="text-orange-500" />}
              title="Rapid Response"
              description="Step-by-step guides on what to do if you've already been targeted by a scammer."
            />
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="py-24 px-4 bg-muted/10 border-y border-border/30 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">Why Securofy?</h2>
            <div className="space-y-8 text-base md:text-xl text-muted-foreground font-light leading-relaxed px-2">
              <p>
                In an era where digital deception is increasingly sophisticated, traditional security measures are no longer enough.
                <span className="text-foreground font-semibold"> The best defense is an educated, vigilant user.</span>
              </p>
              <div className="p-8 rounded-3xl bg-background/50 border border-primary/20 backdrop-blur-sm">
                <p className="text-foreground font-medium italic">
                  "Our purpose is to create a generation of digitally immune individuals by combining financial literacy with proactive AI assistance."
                </p>
              </div>
              <p>
                Through realistic simulations and gamified learning, we empower you to recognize scams <i>before</i> they happen, safeguarding your assets and peace of mind.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer id="contact" className="glass-card border-t border-border/30 py-16 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <span className="font-bold text-2xl tracking-wider text-primary">SECUROFY</span>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Empowering individuals with AI-driven protection, financial literacy, and robust defense against digital scams. Join 10k+ users staying safe online.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase text-sm tracking-[0.2em]">Platform</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6 uppercase text-sm tracking-[0.2em]">Legal</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Securofy. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {/* Social Icons */}
            <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;