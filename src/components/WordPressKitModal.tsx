import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Database, 
  Layers, 
  Server, 
  BookOpen,
  ExternalLink
} from 'lucide-react';

interface WordPressKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordPressKitModal: React.FC<WordPressKitModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'cpt' | 'acf' | 'headless'>('architecture');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const cptSnippet = `// Add this to your child theme functions.php or mu-plugins
function richport_register_property_cpt() {
    register_post_type( 'property', array(
        'label'        => __( 'Property', 'richport-southern' ),
        'public'       => true,
        'has_archive'  => 'inventory',
        'show_in_rest' => true, // Enables WordPress REST API & Gutenberg
        'rest_base'    => 'properties',
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'rewrite'      => array( 'slug' => 'properties' ),
        'menu_icon'    => 'dashicons-admin-multisite',
    ) );

    // Arkansas County Taxonomy
    register_taxonomy( 'property_county', 'property', array(
        'hierarchical' => true,
        'label'        => __( 'Counties', 'richport-southern' ),
        'show_in_rest' => true,
        'rewrite'      => array( 'slug' => 'county' ),
    ) );

    // Property Type Taxonomy
    register_taxonomy( 'property_type', 'property', array(
        'hierarchical' => true,
        'label'        => __( 'Property Types', 'richport-southern' ),
        'show_in_rest' => true,
        'rewrite'      => array( 'slug' => 'property-type' ),
    ) );
}
add_action( 'init', 'richport_register_property_cpt' );`;

  const restSnippet = `// Example React hook to fetch properties from WordPress REST API
export async function fetchWordPressProperties() {
  const WP_URL = "https://your-domain.com/wp-json/wp/v2/properties?_embed&per_page=100";
  const res = await fetch(WP_URL);
  const wpPosts = await res.json();
  
  return wpPosts.map((post: any) => ({
    id: String(post.id),
    title: post.title.rendered,
    referenceNumber: post.meta?.reference_number || post.acf?.reference_number,
    streetAddress: post.meta?.street_address || post.acf?.street_address,
    city: post.meta?.city || post.acf?.city,
    county: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Arkansas',
    cashPrice: Number(post.meta?.cash_price || post.acf?.cash_price || 0),
    ownerFinanceAvailable: Boolean(post.meta?.owner_finance_available || post.acf?.owner_finance_available),
    monthlyPayment: Number(post.meta?.monthly_payment || post.acf?.monthly_payment || 0),
    acreage: Number(post.meta?.acreage || post.acf?.acreage || 0),
    primaryPhoto: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
  }));
}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-[#DECFA9] max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wp-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-[#153023] text-white p-6 border-b-4 border-[#C29F59] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 text-[#DFC386]">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#DFC386] block">
                WordPress Theme &amp; CPT Blueprint
              </span>
              <h2 id="wp-modal-title" className="font-serif text-xl sm:text-2xl font-bold">
                WordPress Conversion Architecture
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#FAF8F5] border-b border-[#E8DFC9] px-6 flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'border-[#153023] text-[#153023]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1:1 Template Mapping</span>
          </button>
          <button
            onClick={() => setActiveTab('cpt')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'cpt'
                ? 'border-[#153023] text-[#153023]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>CPT &amp; Taxonomies</span>
          </button>
          <button
            onClick={() => setActiveTab('acf')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'acf'
                ? 'border-[#153023] text-[#153023]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>ACF 24 Fields Schema</span>
          </button>
          <button
            onClick={() => setActiveTab('headless')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'headless'
                ? 'border-[#153023] text-[#153023]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Headless REST API</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800 font-sans text-sm flex-1">
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFC9] space-y-2">
                <h3 className="font-serif font-bold text-base text-[#153023]">
                  Ready-to-Use WordPress Files Generated in Repository
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  All pages, cards, headers, and footer components have been mapped 1:1 to official WordPress PHP templates inside the <code className="px-1.5 py-0.5 rounded bg-stone-200 text-[#153023] font-mono">/wordpress</code> folder. You can upload this directly into WordPress as a custom theme!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#153023] font-mono">header.php</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Active</span>
                  </div>
                  <p className="text-stone-600">Maps to Header component, navigation menu, and top notice ticker with phone hook.</p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#153023] font-mono">footer.php</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Active</span>
                  </div>
                  <p className="text-stone-600">Maps to Footer component, four-column layout, and statutory legal disclaimers.</p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#153023] font-mono">front-page.php</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Active</span>
                  </div>
                  <p className="text-stone-600">Maps to HomeView with Hero, Search Bar, and Featured Arkansas Listings WP_Query loop.</p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#153023] font-mono">archive-property.php</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Active</span>
                  </div>
                  <p className="text-stone-600">Maps to InventoryView, managing the <code className="font-mono">/inventory</code> property listing page and filters.</p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#153023] font-mono">single-property.php</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Active</span>
                  </div>
                  <p className="text-stone-600">Maps to PropertyDetailView with pricing banner, photo gallery, specs, and due diligence checks.</p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#153023] font-mono">template-parts/property-card.php</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">Active</span>
                  </div>
                  <p className="text-stone-600">Reusable property card used across home, archive, and related listings queries.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cpt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#153023]">
                    Custom Post Type &amp; Taxonomy Registration Code
                  </h3>
                  <p className="text-xs text-stone-600">
                    Paste this snippet into your theme's <code className="font-mono">functions.php</code> or custom plugin to register the <code className="font-mono">property</code> post type.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(cptSnippet, 'cpt')}
                  className="px-3 py-1.5 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
                >
                  {copied === 'cpt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'cpt' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-stone-900 text-stone-100 text-xs font-mono overflow-x-auto leading-relaxed max-h-80 border border-stone-800">
                {cptSnippet}
              </pre>
            </div>
          )}

          {activeTab === 'acf' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DECFA9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#153023]">
                    Exported ACF Field Group JSON Available
                  </h3>
                  <p className="text-xs text-stone-600">
                    Import <code className="font-mono bg-white px-1 py-0.5 rounded border border-stone-200">wordpress/acf-fields.json</code> via WordPress Admin &gt; Custom Fields &gt; Tools &gt; Import.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="px-3 py-1.5 rounded-md bg-[#C29F59] text-[#153023] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 24 Custom Fields Included
                  </span>
                </div>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                <table className="min-w-full divide-y divide-stone-200">
                  <thead className="bg-[#FAF8F5]">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-bold text-[#153023]">Field Key</th>
                      <th className="px-4 py-2.5 text-left font-bold text-[#153023]">Label</th>
                      <th className="px-4 py-2.5 text-left font-bold text-[#153023]">Type</th>
                      <th className="px-4 py-2.5 text-left font-bold text-[#153023]">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    <tr>
                      <td className="px-4 py-2 font-mono text-stone-600">reference_number</td>
                      <td className="px-4 py-2 font-semibold">Reference ID</td>
                      <td className="px-4 py-2 text-stone-500">Text</td>
                      <td className="px-4 py-2 text-stone-600">e.g. AR-PUL-0841</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-stone-600">cash_price</td>
                      <td className="px-4 py-2 font-semibold">Cash Price</td>
                      <td className="px-4 py-2 text-stone-500">Number</td>
                      <td className="px-4 py-2 text-stone-600">Direct cash discount price</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-stone-600">owner_finance_available</td>
                      <td className="px-4 py-2 font-semibold">Owner Financing</td>
                      <td className="px-4 py-2 text-stone-500">True/False</td>
                      <td className="px-4 py-2 text-stone-600">Enables terms calculator</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-stone-600">down_payment</td>
                      <td className="px-4 py-2 font-semibold">Down Payment</td>
                      <td className="px-4 py-2 text-stone-500">Number</td>
                      <td className="px-4 py-2 text-stone-600">Minimum down payment required</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-stone-600">monthly_payment</td>
                      <td className="px-4 py-2 font-semibold">Monthly P&amp;I</td>
                      <td className="px-4 py-2 text-stone-500">Number</td>
                      <td className="px-4 py-2 text-stone-600">Estimated monthly payment</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-stone-600">parcel_number</td>
                      <td className="px-4 py-2 font-semibold">County Parcel / APN</td>
                      <td className="px-4 py-2 text-stone-500">Text</td>
                      <td className="px-4 py-2 text-stone-600">Official assessor parcel number</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-stone-600">acreage</td>
                      <td className="px-4 py-2 font-semibold">Acreage</td>
                      <td className="px-4 py-2 text-stone-500">Number</td>
                      <td className="px-4 py-2 text-stone-600">Lot size in acres</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-mono text-stone-600">repair_level</td>
                      <td className="px-4 py-2 font-semibold">Condition Tier</td>
                      <td className="px-4 py-2 text-stone-500">Select</td>
                      <td className="px-4 py-2 text-stone-600">Move-in Ready, Rehab, Raw Land</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'headless' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#153023]">
                    Headless WordPress Integration Hook
                  </h3>
                  <p className="text-xs text-stone-600">
                    Use this React query hook to fetch properties directly from your WordPress REST API.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(restSnippet, 'rest')}
                  className="px-3 py-1.5 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
                >
                  {copied === 'rest' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'rest' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-stone-900 text-stone-100 text-xs font-mono overflow-x-auto leading-relaxed max-h-80 border border-stone-800">
                {restSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF8F5] p-4 px-6 border-t border-[#E8DFC9] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-stone-500">
          <div>
            Located in <code className="font-mono text-stone-700 bg-stone-200 px-1.5 py-0.5 rounded">/wordpress</code> • Includes theme.json, functions.php &amp; templates
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
