import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'outline';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
  dot = false
}) => {
  const variantStyles = {
    primary: 'bg-blue-50 text-[#0055ce] border border-blue-200/60',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/60',
    error: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/60',
    outline: 'bg-transparent text-slate-600 border border-slate-300'
  };

  const dotColors = {
    primary: 'bg-[#0055ce]',
    success: 'bg-emerald-600',
    warning: 'bg-amber-600',
    error: 'bg-rose-600',
    neutral: 'bg-slate-500',
    outline: 'bg-slate-400'
  };

  const sizeStyles = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium rounded',
    sm: 'text-xs px-2 py-0.5 font-medium rounded-md',
    md: 'text-sm px-2.5 py-1 font-semibold rounded-md'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans leading-none whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
