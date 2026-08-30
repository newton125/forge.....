import React, { useState } from 'react';
import { ForgeLogo } from '../components/common/ForgeLogo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Building,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onNavigateHome: () => void;
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onNavigateHome,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');

  const { login, signup } = useAuth();
  const { success, error, info } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email || 'john.doe@aerotek.com', password || 'password123');
      } else {
        await signup({
          email,
          fullName,
          company,
          jobTitle,
          phone,
          role: 'customer',
          savedAddresses: []
        });
      }
      onSuccess();
    } catch (err: any) {
      error('Authentication Error', err.message || 'Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (userType: 'buyer' | 'admin') => {
    setLoading(true);
    try {
      if (userType === 'buyer') {
        await login('john.doe@aerotek.com', 'password123');
      } else {
        await login('sarah.admin@forge-industrial.com', 'adminpass123');
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <ForgeLogo variant="full" size="lg" tagline="PROFESSIONAL TOOLS" theme="light" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          {mode === 'login' ? 'Commercial Buyer Portal' : 'Open Corporate Procurement Account'}
        </h1>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          {mode === 'login'
            ? 'Sign in to access tax invoices, Net 30 purchasing, and live freight tracking.'
            : 'Get instant Net 30 credit evaluation and wholesale volume tier discounts.'}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Toggle Mode Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              mode === 'login' ? 'bg-white text-[#0055ce] shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              mode === 'signup' ? 'bg-white text-[#0055ce] shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Demo Fast Login Pills */}
        <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0055ce]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>One-Click Fast Demo Credentials:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('buyer')}
              className="px-2.5 py-1.5 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg text-[11px] font-semibold text-slate-800 text-left transition cursor-pointer"
            >
              🏢 Corporate Buyer <span className="block text-[9px] text-slate-400">John Doe (Aerotek)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-2.5 py-1.5 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg text-[11px] font-semibold text-slate-800 text-left transition cursor-pointer"
            >
              ⚙️ Plant Admin <span className="block text-[9px] text-slate-400">Sarah Jenkins (Admin)</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nile Fab Industries"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Lead Procurement Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Plant Direct Phone (+20)</label>
                <input
                  type="text"
                  required
                  placeholder="+20 10 1234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Corporate Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="purchasing@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => info('Password Reset', 'Password reset instructions dispatched to your corporate email.')}
                  className="text-[11px] text-[#0055ce] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0055ce]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#0055ce] hover:bg-[#0043a8] active:bg-[#00388e] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{mode === 'login' ? 'Access Procurement Portal' : 'Create Verified Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Protected by 256-bit enterprise SSL encryption</span>
        </div>
      </div>
    </div>
  );
};
