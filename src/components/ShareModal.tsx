import React, { useState } from 'react';
import { Property } from '../types';
import { X, Copy, Check, Share2, Mail, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ property, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const shareText = `Check out this Arkansas property from Richport Southern: ${property.title} in ${property.county} County, AR. Cash Price: $${property.pricing.cashPrice.toLocaleString()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Richport Southern Property: ${property.title}`);
    const body = encodeURIComponent(`${shareText}\n\nView details: ${currentUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg max-w-md w-full border border-[#D5C5A8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#153023] text-white p-4 border-b border-[#254A37] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Share2 className="w-4 h-4 text-[#DFC386]" />
            <span>Share Property Summary</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          <div>
            <h4 className="font-serif text-base font-bold text-[#153023]">
              {property.title}
            </h4>
            <p className="text-stone-500 mt-0.5">
              {property.city}, {property.county} County, AR • ${property.pricing.cashPrice.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-stone-700">
              Shareable Direct Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 p-2.5 rounded-md border border-stone-300 bg-stone-50 text-stone-700 font-mono text-xs focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-3">
            <button
              onClick={handleEmail}
              className="py-2.5 px-3 rounded-md border border-[#DECFA9] bg-[#FAF8F5] hover:bg-[#F2ECE1] text-stone-800 font-semibold flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#967433]" />
              <span>Email Link</span>
            </button>
            <button
              onClick={() => {
                window.print();
              }}
              className="py-2.5 px-3 rounded-md border border-[#DECFA9] bg-[#FAF8F5] hover:bg-[#F2ECE1] text-stone-800 font-semibold flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-[#967433]" />
              <span>Print Summary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
