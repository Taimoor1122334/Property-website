import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, Scale, CheckCircle2, FileCode } from 'lucide-react';
import { trackRichportEvent } from '../utils/analytics';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenWpKit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenWpKit }) => {
  return (
    <footer id="colophon" className="site-footer bg-[#12241A] text-stone-300 pt-16 pb-12 border-t-4 border-[#C29F59]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#254232]">
          {/* Brand & Purpose (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" variant="horizontal" inverted={true} />
            <p className="text-sm text-stone-300 leading-relaxed max-w-md font-sans">
              Richport Southern, LLC is an Arkansas-based real estate acquisition firm specializing in tax-sale land, acreage, and residential parcels. We provide transparent property facts, honest as-is condition reports, and accessible owner financing to restore dormant properties.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F3D2E] text-xs text-[#DFC386] font-medium border border-[#C29F59]/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DFC386]" />
                Direct Arkansas Deedholders
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F3D2E] text-xs text-[#DFC386] font-medium border border-[#C29F59]/30">
                <Scale className="w-3.5 h-3.5 text-[#DFC386]" />
                Fair Housing Compliant
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm uppercase tracking-widest text-[#DFC386] font-bold">
              Properties &amp; Buying
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="hover:text-white transition-colors text-left"
                >
                  Available Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cash Purchase Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors text-left"
                >
                  Owner Financing Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('what-to-know')}
                  className="hover:text-white transition-colors text-left"
                >
                  As-Is Sales &amp; Due Diligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apply')}
                  className="hover:text-white transition-colors text-left"
                >
                  Buyer Application
                </button>
              </li>
            </ul>
          </div>

          {/* Former Owners & Support */}
          <div className="space-y-3">
            <h4 className="font-display text-sm uppercase tracking-widest text-[#DFC386] font-bold">
              Support &amp; Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('former-owners')}
                  className="text-[#DFC386] hover:text-white font-medium transition-colors text-left"
                >
                  For Former Owners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Richport Southern
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    trackRichportEvent('payment_portal_click', { location: 'footer' });
                    onNavigate('payment-portal');
                  }}
                  className="inline-flex items-center gap-1.5 text-stone-200 hover:text-[#DFC386] font-medium transition-colors text-left"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C29F59]" />
                  Make a Loan Payment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Schedule a Property Viewing
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-display text-sm uppercase tracking-widest text-[#DFC386] font-bold">
              Arkansas Operations
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C29F59] shrink-0 mt-0.5" />
                <span>Richport Southern, LLC<br />Little Rock, Arkansas</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C29F59] shrink-0" />
                <a 
                  href="tel:5015002440" 
                  onClick={() => trackRichportEvent('phone_click', { location: 'footer' })}
                  className="hover:text-white"
                >
                  (501) 500-2440
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C29F59] shrink-0" />
                <a 
                  href="mailto:info@richportsouthern.com" 
                  onClick={() => trackRichportEvent('email_click', { location: 'footer' })}
                  className="hover:text-white"
                >
                  info@richportsouthern.com
                </a>
              </div>
              <div className="pt-2 text-[11px] text-stone-400 border-t border-[#254232]">
                Service Hours: Mon - Fri: 8:30 AM - 5:00 PM CST
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers & Fair Housing Statement */}
        <div className="pt-8 space-y-4 text-xs text-stone-400 leading-relaxed">
          <div className="p-4 rounded-md bg-[#183023] border border-[#234734] space-y-2">
            <div className="flex items-center gap-2 text-[#DFC386] font-semibold uppercase tracking-wider text-[11px]">
              <Scale className="w-4 h-4" />
              <span>Equal Housing Opportunity &amp; Legal Notice</span>
            </div>
            <p>
              Richport Southern, LLC is a private real estate principal and investment firm. We buy and sell real estate for our own portfolio; we are not licensed real estate brokers or a mortgage lender. All properties are offered strictly in "AS IS, WHERE IS" condition, subject to all faults and defects. Buyers are expressly encouraged to conduct independent title, physical, utility, and environmental inspections prior to execution of binding documents.
            </p>
            <p>
              Any payment calculations or financing terms displayed on this website are non-binding estimates based on illustrative variables. Official financing approvals, interest rates, and loan structures are determined solely through approved transaction documents prepared by Arkansas legal counsel and executed by the parties.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#254232] text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} Richport Southern, LLC. All rights reserved. Registered in Arkansas.
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              {onOpenWpKit && (
                <button 
                  onClick={onOpenWpKit} 
                  id="btn-wp-kit-footer"
                  className="text-[#DFC386] hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <FileCode className="w-3 h-3" />
                  <span>WordPress Migration Kit</span>
                </button>
              )}
              <button onClick={() => onNavigate('privacy')} className="hover:underline">
                Privacy Policy
              </button>
              <button onClick={() => onNavigate('terms')} className="hover:underline">
                Terms of Use
              </button>
              <button onClick={() => onNavigate('equal-housing')} className="hover:underline">
                Fair Housing
              </button>
              <button onClick={() => onNavigate('financing-disclosures')} className="hover:underline">
                Financing Disclosures
              </button>
              <button onClick={() => onNavigate('electronic-communications')} className="hover:underline">
                E-Sign Consent
              </button>
              <button onClick={() => onNavigate('accessibility')} className="hover:underline">
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
