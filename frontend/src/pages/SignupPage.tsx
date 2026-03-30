import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck, Mail, Lock, User, Loader2 } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const { register, user } = useAuth();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />

      <div className="glass-card w-full max-w-md p-8 rounded-2xl border border-border/50 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <span className="font-display font-bold text-2xl text-primary">Securofy</span>
          </Link>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">{t('auth.create_account')}</h1>
          <p className="text-muted-foreground text-sm mt-2 text-center">Join Securofy and protect yourself from digital fraud.</p>
        </div>

        <div className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg text-center">{error}</div>}

          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            setError('');
            try {
              await register({ name, email, password });
            } catch (err: any) {
              setError(err.response?.data?.message || 'Registration failed');
            } finally {
              setIsLoading(false);
            }
          }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t('auth.name')}</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t('auth.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t('auth.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  readOnly={false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-all flex justify-center items-center"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : t('auth.create_account')}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          {t('auth.have_account')}{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">{t('auth.login')}</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

