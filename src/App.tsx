/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { mockProperties } from './data/mockProperties';
import { Property } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WordPressKitModal } from './components/WordPressKitModal';

// Views
import { HomeView } from './views/HomeView';
import { InventoryView } from './views/InventoryView';
import { PropertyDetailView } from './views/PropertyDetailView';
import { HowItWorksView } from './views/HowItWorksView';
import { WhatToKnowView } from './views/WhatToKnowView';
import { FormerOwnersView } from './views/FormerOwnersView';
import { ApplyView } from './views/ApplyView';
import { AboutView } from './views/AboutView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { PaymentPortalView } from './views/PaymentPortalView';
import { LegalView, LegalTabType } from './views/LegalView';
import { trackRichportEvent } from './utils/analytics';

export default function App() {
  const [properties] = useState<Property[]>(mockProperties);
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(mockProperties[0]?.id || '');
  const [legalInitialTab, setLegalInitialTab] = useState<LegalTabType>('disclaimers');
  const [inventoryFilters, setInventoryFilters] = useState<{ county?: string; type?: string } | null>(null);
  const [wpModalOpen, setWpModalOpen] = useState(false);

  // Handle URL hash changes or back button if needed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedPropertyId]);

  const handleNavigate = (
    view: string, 
    propertyId?: string, 
    filters?: { county?: string; type?: string }
  ) => {
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
    if (filters) {
      setInventoryFilters(filters);
    }

    if (view === 'payment-portal') {
      trackRichportEvent('payment_portal_click', { location: 'navigation' });
    }

    if (view === 'privacy') {
      setLegalInitialTab('privacy');
      setCurrentView('legal');
      return;
    }
    if (view === 'terms') {
      setLegalInitialTab('terms');
      setCurrentView('legal');
      return;
    }
    if (view === 'equal-housing') {
      setLegalInitialTab('equal-housing');
      setCurrentView('legal');
      return;
    }
    if (view === 'disclaimers') {
      setLegalInitialTab('disclaimers');
      setCurrentView('legal');
      return;
    }
    if (view === 'financing-disclosures') {
      setLegalInitialTab('financing-disclosures');
      setCurrentView('legal');
      return;
    }
    if (view === 'electronic-communications') {
      setLegalInitialTab('electronic-communications');
      setCurrentView('legal');
      return;
    }
    if (view === 'accessibility') {
      setLegalInitialTab('accessibility');
      setCurrentView('legal');
      return;
    }

    setCurrentView(view);
  };

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentView('property-detail');
  };

  const handleApply = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentView('apply');
  };

  const activeProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  return (
    <div id="page" className="site wp-site-blocks min-h-screen flex flex-col bg-[#F7F4EE] text-stone-900 font-sans selection:bg-[#DECFA9] selection:text-[#153023]">
      {/* Sticky Header with Navigation & Call-to-Action */}
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        onOpenWpKit={() => setWpModalOpen(true)}
      />

      {/* Main Content Area */}
      <main id="primary" className="site-main flex-1">
        {currentView === 'home' && (
          <HomeView
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
            onApply={handleApply}
          />
        )}

        {currentView === 'inventory' && (
          <InventoryView
            properties={properties}
            initialFilters={inventoryFilters}
            onSelectProperty={handleSelectProperty}
            onApply={handleApply}
          />
        )}

        {currentView === 'property-detail' && activeProperty && (
          <PropertyDetailView
            property={activeProperty}
            onBack={() => handleNavigate('inventory')}
            onApply={handleApply}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksView onNavigate={handleNavigate} />
        )}

        {currentView === 'what-to-know' && (
          <WhatToKnowView />
        )}

        {currentView === 'former-owners' && (
          <FormerOwnersView />
        )}

        {currentView === 'apply' && (
          <ApplyView
            properties={properties}
            preselectedPropertyId={selectedPropertyId}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && (
          <AboutView />
        )}

        {currentView === 'faq' && (
          <FaqView />
        )}

        {currentView === 'contact' && (
          <ContactView properties={properties} />
        )}

        {currentView === 'payment-portal' && (
          <PaymentPortalView onNavigate={handleNavigate} />
        )}

        {currentView === 'legal' && (
          <LegalView initialTab={legalInitialTab} />
        )}
      </main>

      {/* Corporate and Statutory Compliance Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenWpKit={() => setWpModalOpen(true)}
      />

      {/* WordPress Conversion Assistant & Blueprint Modal */}
      <WordPressKitModal 
        isOpen={wpModalOpen} 
        onClose={() => setWpModalOpen(false)} 
      />
    </div>
  );
}
