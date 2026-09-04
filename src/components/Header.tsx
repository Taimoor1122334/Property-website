import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Phone, 
  ShieldCheck, 
  Menu, 
  X, 
  MapPin, 
  FileText, 
  HelpCircle, 
  Home, 
  CreditCard,
  HeartHandshake,
  FileCode
} from 'lucide-react';
import { trackRichportEvent } from '../utils/analytics';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, propertyId?: string) => void;
  onOpenWpKit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenWpKit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string) => {
    if (view === 'payment-portal') {
      trackRichportEvent('payment_portal_click', { location: 'header' });
    }
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'inventory', label: 'Properties', icon: Home },
    { id: 'how-it-works', label: 'How It Works', icon: FileText },
    { id: 'what-to-know', label: 'What to Know', icon: HelpCircle },
    { id: 'former-owners', label: 'Former Owners', icon: HeartHandshake },
    { id: 'apply', label: 'Apply', icon: FileText },
    { id: 'about', label: 'About', icon: MapPin },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <header id="masthead" className="site-header sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC9] shadow-xs">
      {/* Top Arkansas Direct Notice Bar */}
      <div className="bg-[#153023] text-[#E7D6B5] px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C29F59] animate-pulse" />
            <span>Direct Arkansas Tax Sale Land &amp; Homes • Cash Sales &amp; Owner Financing</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-stone-300">
            <span className="hidden md:inline">Little Rock, Arkansas</span>
            <span className="hidden md:inline">•</span>
            <a 
              href="tel:5015002440" 
              onClick={() => trackRichportEvent('phone_click', { location: 'header' })}
              className="font-semibold text-[#F4EDE0] hover:text-[#C29F59] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#C29F59]" />
              (501) 500-2440
            </a>
            {onOpenWpKit && (
              <>
                <span className="hidden sm:inline text-stone-500">•</span>
                <button
                  onClick={onOpenWpKit}
                  id="btn-wp-kit-header"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#DFC386] text-[#153023] hover:bg-[#D5B570] transition-colors cursor-pointer shadow-xs"
                  title="View WordPress Theme & CPT Conversion Kit"
                >
                  <FileCode className="w-3 h-3 text-[#153023]" />
                  <span>WP Theme Kit</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-nowrap items-center justify-between gap-2 lg:gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          className="site-branding text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] rounded-lg shrink-0"
          id="btn-nav-home"
        >
          {/* Responsive logo: compact on lg to prevent link squeeze, standard on xl and mobile */}
          <div className="hidden lg:block xl:hidden">
            <Logo size="sm" variant="horizontal" />
          </div>
          <div className="lg:hidden xl:block">
            <Logo size="md" variant="horizontal" />
          </div>
        </button>

        {/* Desktop Navigation Links - Single line guaranteed with whitespace-nowrap and compact padding on lg */}
        <nav id="site-navigation" className="main-navigation hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink min-w-0 flex-nowrap" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                id={`nav-link-${link.id}`}
                className={`px-2 xl:px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-all rounded-md tracking-tight whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#153023] bg-[#EAE2D0] font-semibold shadow-2xs'
                    : 'text-stone-700 hover:text-[#153023] hover:bg-[#F2ECE1]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Area: Make a Payment Button */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNav('payment-portal')}
            id="btn-header-make-payment"
            className={`inline-flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-md text-xs xl:text-sm font-semibold tracking-wide transition-all shadow-xs border whitespace-nowrap shrink-0 ${
              currentView === 'payment-portal'
                ? 'bg-[#153023] text-[#FAF7F2] border-[#153023]'
                : 'bg-[#FAF7F2] hover:bg-[#153023] text-[#153023] hover:text-[#FAF7F2] border-[#B8934E]/60 hover:border-[#153023]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#C29F59] shrink-0" />
            <span>Make a Payment</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-stone-700 hover:text-[#153023] hover:bg-[#EAE2D0] focus:outline-none shrink-0"
          aria-label="Toggle navigation menu"
          id="btn-mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E0D7C2] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-[#153023] text-[#FAF7F2]'
                      : 'text-stone-800 hover:bg-[#EFE8DC]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C29F59]' : 'text-stone-500'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E8DFC9] space-y-2">
            <button
              onClick={() => handleNav('payment-portal')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold bg-[#153023] text-[#FAF7F2] shadow-xs"
            >
              <CreditCard className="w-4 h-4 text-[#C29F59]" />
              <span>Customer Payment Portal</span>
            </button>
            <div className="text-center pt-2">
              <a 
                href="tel:5015002440" 
                className="text-xs font-semibold text-[#153023] hover:underline inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#C29F59]" />
                Call Richport Southern: (501) 500-2440
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
