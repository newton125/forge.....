import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigateHome?: () => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigateHome,
  className = ''
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-xs font-medium text-slate-500 overflow-x-auto py-1 ${className}`}
    >
      <button
        type="button"
        onClick={onNavigateHome}
        className="flex items-center gap-1 hover:text-[#0055ce] transition shrink-0 cursor-pointer"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.active ? (
            <span className="text-slate-900 font-semibold truncate max-w-[200px] md:max-w-xs shrink-0">
              {item.label}
            </span>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="hover:text-[#0055ce] transition truncate shrink-0 cursor-pointer"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
