import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Building, 
  DollarSign, 
  Scale, 
  HeartHandshake, 
  Wrench 
} from 'lucide-react';

interface FaqItem {
  category: 'financing' | 'title' | 'inspections' | 'former_owners';
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'financing',
    question: 'Do I need perfect credit to qualify for Richport Southern owner financing?',
    answer: 'No. We do not evaluate applications based strictly on credit scores. We review your cash down payment readiness, proof of stable recurring income (employment, self-employment, pensions, or disability), and your intended use for the property.',
  },
  {
    category: 'financing',
    question: 'Can I pay off my owner-financed loan early without penalties?',
    answer: 'Yes, 100%. Every owner-financed loan issued by Richport Southern contains a zero-penalty prepayment clause. You may make extra principal payments or pay off the entire balance at any time to save on interest.',
  },
  {
    category: 'financing',
    question: 'How are monthly payments handled?',
    answer: 'Payments are collected via our licensed third-party loan servicing provider. You can set up automatic monthly ACH drafts, pay online with checking/savings, review principal-interest splits, and receive annual IRS 1098 interest statements.',
  },
  {
    category: 'title',
    question: 'What kind of deed do I receive when I purchase a property?',
    answer: 'For full cash purchases, you receive an executed and recorded Limited / Special Warranty Deed. For owner-financed transactions, you execute a Contract for Deed or Promissory Note with Deed of Trust, and title transfers formally upon final payoff or according to the agreed closing structure.',
  },
  {
    category: 'title',
    question: 'What is a "Quiet Title" lawsuit and will I need one?',
    answer: 'In Arkansas, properties sold through state tax sales may require a routine Quiet Title action before national title insurance underwriters will issue standard policy coverage. While not required to own, live on, or enjoy the land, a Quiet Title action is often completed if you plan to obtain a conventional bank construction loan in the future.',
  },
  {
    category: 'inspections',
    question: 'Can I visit and inspect a property before applying or buying?',
    answer: 'Yes! We actively encourage all buyers to walk parcels during daylight hours. For vacant land, you may drive by anytime. For residential structures with lockboxes, please contact our Little Rock office to request a contractor access pass.',
  },
  {
    category: 'inspections',
    question: 'What does "As-Is, Where-Is" mean in practice?',
    answer: 'It means Richport Southern sells the property in its exact current physical state. We do not perform post-sale repairs, cleanup debris, or warrant structural, plumbing, or electrical components. We disclose every known issue in our listings so you can budget accurately.',
  },
  {
    category: 'former_owners',
    question: 'What happens if a former owner contacts Richport Southern?',
    answer: 'We treat all past owners and heirs with utmost dignity and compassion. While tax sales are final statutory transfers and we make no legal promises of repurchase or title return, we review each inquiry with care and provide transparent copies of county recorded deeds.',
  },
];

export const FaqView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1]);

  const toggleAccordion = (index: number) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DECFA9] p-6 sm:p-10 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#967433]">
          Knowledge Base &amp; FAQ
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#153023]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl font-sans">
          Find clear answers regarding Arkansas tax sales, owner financing qualifications, title quiet proceedings, and viewing procedures.
        </p>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-5" />
          <input
            type="text"
            placeholder="Search questions (e.g., credit, quiet title, down payment)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#153023]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'financing', label: 'Owner Financing' },
          { id: 'title', label: 'Title & Deeds' },
          { id: 'inspections', label: 'Inspections & As-Is' },
          { id: 'former_owners', label: 'Former Owners' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-[#153023] text-white shadow-2xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg border border-[#DECFA9] text-xs text-stone-500">
            No questions matched your search query. Try broadening your terms.
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isExpanded = expandedIndices.includes(index);
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-[#DECFA9] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="font-serif text-sm font-bold text-[#153023]">
                    {faq.question}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#967433] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-[#F2EDE2]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
