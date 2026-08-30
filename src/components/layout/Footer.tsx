import React from 'react';
import { ForgeLogo } from '../common/ForgeLogo';
import {
  ShieldCheck,
  Truck,
  FileCheck2,
  Headphones
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { CategoryId } from '../../types';

interface FooterProps {
  onNavigate: (view: string, payload?: any) => void;
  onSelectCategory: (catId: CategoryId | 'all') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const { success } = useToast();

  return (
    <footer className="bg-[#14161b] text-slate-400 border-t border-slate-800 pt-14 pb-8">
      {/* Industrial Trust Badges Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[#0a6cff]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Egypt-Wide Industrial Delivery</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct dispatch to industrial zones in Cairo, 10th of Ramadan, 6th of October, and Alexandria.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[#008837]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Official Agency Warranties</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                100% authentic tools with authorized Egyptian agency certificates & warranty service.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-amber-400">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Net 30 & E-Invoicing</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Egyptian Electronic Tax Invoicing (منظومة الفاتورة الإلكترونية) & Net 30 corporate billing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-violet-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Engineering Support (Egypt)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Specialists on call: +20 (2) 2790-3674 / +20 10 2345 8901.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <ForgeLogo variant="horizontal" size="md" theme="dark" tagline="PROFESSIONAL TOOLS" />
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              FORGE is the premier commercial supply chain network for industrial equipment, precision machining, certified safety apparatus, and heavy manufacturing hardware.
            </p>
          </div>

          {/* Department Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Hardware Departments
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => { onSelectCategory('power-tools'); onNavigate('catalog'); }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Power & Brushless Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('hand-tools'); onNavigate('catalog'); }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Precision Torque & Hand Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('safety-gear'); onNavigate('catalog'); }}
                  className="hover:text-white transition cursor-pointer"
                >
                  OSHA Safety & Protective PPE
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('welding'); onNavigate('catalog'); }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Welding Rigs & Torches
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('pneumatics'); onNavigate('catalog'); }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Industrial Pneumatics & Air
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategory('electrical'); onNavigate('catalog'); }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Electrical & Testing Gear
                </button>
              </li>
            </ul>
          </div>

          {/* Enterprise Procurement */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Enterprise Procurement
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('account', { tab: 'orders' })}
                  className="hover:text-white transition cursor-pointer"
                >
                  Purchase Orders & Invoices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account', { tab: 'profile' })}
                  className="hover:text-white transition cursor-pointer"
                >
                  Corporate Account Management
                </button>
              </li>
              <li>
                <a href="#compliance" onClick={(e) => { e.preventDefault(); success('ISO Compliance', 'ISO 9001:2015 certificate valid through 2028.'); }} className="hover:text-white transition">
                  ISO 9001:2015 Certifications
                </a>
              </li>
              <li>
                <a href="#hazmat" onClick={(e) => { e.preventDefault(); success('Hazmat Protocol', 'DOT Hazmat registered for battery shipments.'); }} className="hover:text-white transition">
                  Lithium Battery Freight Protocol
                </a>
              </li>
            </ul>
          </div>

          {/* Customer & Technical Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Direct Support (Egypt)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="text-slate-300 font-medium">
                Cairo Hub: +20 (2) 2790-3674
              </li>
              <li className="text-slate-300 font-medium">
                Mobile / WhatsApp: +20 10 2345 8901
              </li>
              <li>Sun - Thu: 8:00 AM - 6:00 PM (EET)</li>
              <li>Saturday: 9:00 AM - 3:00 PM (EET)</li>
              <li className="pt-2 text-slate-300">
                Email: <span className="text-[#0a6cff]">egypt-orders@forge-industrial.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} FORGE Industrial Supplies Egypt SAE (شركة فورج للمهمات الصناعية). All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Commercial Sale</span>
          <span className="hover:text-slate-400 cursor-pointer">ETA E-Invoice Compliance</span>
          <span className="hover:text-slate-400 cursor-pointer">Site Map</span>
        </div>
      </div>
    </footer>
  );
};
