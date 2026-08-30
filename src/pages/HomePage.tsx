import React from 'react';
import { Product, Category, CategoryId } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import {
  ShieldCheck,
  Zap,
  Truck,
  FileText,
  ArrowRight,
  Sparkles,
  Cpu,
  Wrench,
  Flame,
  Wind,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  categories: Category[];
  featuredProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categoryId: CategoryId | 'all') => void;
  onNavigate: (view: string, payload?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  categories,
  featuredProducts,
  onSelectProduct,
  onSelectCategory,
  onNavigate
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-blue-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-sky-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-violet-500" />;
      default:
        return <Cpu className="w-5 h-5 text-slate-600" />;
    }
  };

  const partnerBrands = [
    'DeWalt Industrial',
    'Milwaukee Tool',
    'Makita Pro',
    'Fluke Instruments',
    'Miller Electric',
    '3M Safety',
    'Ingersoll Rand',
    'Mitutoyo Japan',
    'Wilton Vises',
    'Simpson Strong-Tie'
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#14161b] text-white overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6">
        <div className="absolute inset-0 bg-linear-to-r from-[#0055ce]/30 via-slate-900/90 to-slate-950/95 z-10" />
        
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80"
          alt="Industrial Manufacturing Workshop"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 lg:py-28 flex flex-col justify-between">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Next-Gen Heavy Equipment Procurement</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              PRECISION ENGINEERED. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-200 to-white">
                INDUSTRIAL GRADE.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              Direct OEM distribution of certified brushless power tools, precision CNC measuring instruments, ANSI-compliant PPE, and heavy plant equipment with Commercial Net 30 terms.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  onNavigate('catalog');
                }}
                className="px-6 py-3.5 bg-[#0055ce] hover:bg-[#0a6cff] active:bg-[#0043a8] text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-900/40 flex items-center gap-2 transition duration-200 cursor-pointer"
              >
                <span>Browse Industrial Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onSelectCategory('power-tools');
                  onNavigate('catalog');
                }}
                className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white text-sm font-semibold rounded-xl border border-slate-700 transition cursor-pointer backdrop-blur-xs"
              >
                <span>Power Tools Line</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">10,000+</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">OEM Certified SKUs</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">99.8%</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">On-Time Dock Dispatch</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">ISO 9001</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Quality Guaranteed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">Net 30</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Commercial Credit Line</div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0055ce]">
              Categorized Supply Chain
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Industrial Hardware Departments
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigate('catalog');
            }}
            className="text-xs font-bold text-[#0055ce] hover:text-[#0043a8] flex items-center gap-1.5 cursor-pointer group"
          >
            <span>View All 8 Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate('catalog');
              }}
              className="group bg-white rounded-xl border border-slate-200/80 hover:border-[#0055ce]/40 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition border border-slate-100 group-hover:border-blue-100">
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  {cat.itemCount}+ items
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0055ce] transition leading-snug">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-[#0055ce] group-hover:underline">
                <span>Browse Products</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Precision Equipment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0055ce]">
              Field-Tested Reliability
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Precision Engineered Equipment
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigate('catalog');
            }}
            className="text-xs font-bold text-[#0055ce] hover:text-[#0043a8] flex items-center gap-1.5 cursor-pointer group"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              layout="grid"
            />
          ))}
        </div>
      </section>

      {/* Brand Partners Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Trusted OEM Manufacturer Network
          </span>
          <p className="text-xs text-slate-500 mt-1">
            Direct factory authorized distributor for world-leading industrial toolmakers
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {partnerBrands.map((brand, i) => (
            <div
              key={i}
              className="px-4 py-2.5 bg-white rounded-lg border border-slate-200/80 text-xs font-bold text-slate-700 shadow-2xs hover:border-[#0055ce] hover:text-[#0055ce] transition cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
