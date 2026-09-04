import React, { useState, useId, useEffect } from 'react';
import { Property, BuyerApplication } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  Lock, 
  User, 
  Building, 
  DollarSign, 
  Scale, 
  Clock,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { trackRichportEvent } from '../utils/analytics';

interface ApplyViewProps {
  properties: Property[];
  preselectedPropertyId?: string;
  onNavigate: (view: string, propertyId?: string) => void;
}

export const ApplyView: React.FC<ApplyViewProps> = ({
  properties,
  preselectedPropertyId,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPropId, setSelectedPropId] = useState<string>(
    preselectedPropertyId || properties.find((p) => p.pricing.ownerFinanceAvailable)?.id || properties[0]?.id || ''
  );
  const [stepError, setStepError] = useState<string | null>(null);

  // Sync when preselected property changes from external click
  useEffect(() => {
    if (preselectedPropertyId) {
      setSelectedPropId(preselectedPropertyId);
    }
    trackRichportEvent('application_start', {
      propertyId: preselectedPropertyId || selectedPropId,
      step: 1
    });
  }, [preselectedPropertyId]);
  
  // Step 1: Acknowledgment
  const [ackNotApproval, setAckNotApproval] = useState(false);

  // Step 2: Buyer Identity
  const [buyerType, setBuyerType] = useState<'individual' | 'entity'>('individual');
  const [fullName, setFullName] = useState('');
  const [entityName, setEntityName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [cityStateZip, setCityStateZip] = useState('');

  // Step 3: Intended Use & Household
  const [intendedUse, setIntendedUse] = useState<'primary_home' | 'recreational' | 'build_new' | 'investment_rental' | 'other'>('primary_home');
  const [householdSize, setHouseholdSize] = useState<number>(2);

  // Step 4: Financial Readiness & Repayment Ability
  const [downPaymentAvailable, setDownPaymentAvailable] = useState<number>(5000);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(4200);
  const [housingPaymentCurrent, setHousingPaymentCurrent] = useState<number>(950);
  const [majorDebtsMonthly, setMajorDebtsMonthly] = useState<number>(350);

  // Step 5: Secure Document Upload
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; category: string }[]>([
    { name: 'Arkansas_Drivers_License.pdf', size: '1.8 MB', category: 'Government Issued ID' }
  ]);
  const [uploadCategory, setUploadCategory] = useState('Government Issued ID');
  const [simulatedFileName, setSimulatedFileName] = useState('');

  // Step 6: Consent & Electronic Authorization
  const [electronicConsent, setElectronicConsent] = useState(false);
  const [verificationConsent, setVerificationConsent] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<BuyerApplication | null>(null);

  const selectedProperty = properties.find((p) => p.id === selectedPropId) || properties[0];

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedFileName) return;
    setUploadedFiles([
      ...uploadedFiles,
      {
        name: simulatedFileName.endsWith('.pdf') || simulatedFileName.endsWith('.jpg') ? simulatedFileName : `${simulatedFileName}.pdf`,
        size: '2.4 MB',
        category: uploadCategory,
      },
    ]);
    setSimulatedFileName('');
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    trackRichportEvent('application_submit', {
      propertyId: selectedPropId,
      buyerType,
      intendedUse,
      householdSize,
    });

    setTimeout(() => {
      const appRecord: BuyerApplication = {
        id: `APP-AR-${Date.now().toString().slice(-6)}`,
        propertyId: selectedPropId,
        propertyTitle: selectedProperty.title,
        buyerType,
        fullName,
        entityName: buyerType === 'entity' ? entityName : undefined,
        email,
        phone,
        currentAddress,
        cityStateZip,
        intendedUse,
        householdSize,
        downPaymentAvailable,
        monthlyIncome,
        housingPaymentCurrent,
        majorDebtsMonthly,
        uploadedFiles,
        electronicConsent,
        verificationConsent,
        status: 'submitted',
        createdAt: new Date().toISOString(),
      };

      setSubmittedApplication(appRecord);
      setIsSubmitting(false);
    }, 800);
  };

  const nextStep = () => {
    setStepError(null);
    if (currentStep === 1 && !ackNotApproval) {
      setStepError('Please check and confirm the statutory acknowledgment above to proceed.');
      return;
    }
    if (currentStep === 2 && !fullName.trim()) {
      setStepError('Please enter the primary applicant full name.');
      return;
    }
    if (currentStep === 2 && !email.trim() && !phone.trim()) {
      setStepError('Please provide at least a phone number or email address.');
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 6));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStepError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Unique IDs for form controls
  const step1PropSelectId = useId();
  const step1AckId = useId();
  const step2FullNameId = useId();
  const step2EntityNameId = useId();
  const step2EmailId = useId();
  const step2PhoneId = useId();
  const step2AddressId = useId();
  const step2CityStateZipId = useId();
  const step3IntendedUseId = useId();
  const step3HouseholdSizeId = useId();
  const step4DownPaymentId = useId();
  const step4MonthlyIncomeId = useId();
  const step4HousingPaymentId = useId();
  const step4MajorDebtsId = useId();
  const step5CategorySelectId = useId();
  const step5FileInputId = useId();
  const step6ElectronicConsentId = useId();
  const step6VerificationConsentId = useId();

  if (submittedApplication) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl border-2 border-[#C29F59] p-8 sm:p-12 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#153023] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#153023]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#967433]">
              Application Submitted Successfully
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153023]">
              Thank You, {submittedApplication.fullName}
            </h2>
            <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              Your application for <strong>{submittedApplication.propertyTitle}</strong> has been assigned reference ID <span className="font-mono font-bold text-[#153023]">{submittedApplication.id}</span> and submitted to the Richport Southern review committee.
            </p>
          </div>

          {/* Next Steps Box (Section 5 Compliance) */}
          <div className="p-6 bg-[#FAF8F5] rounded-lg border border-[#DECFA9] text-left space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-[#153023] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C29F59]" />
              <span>What Happens Next (Estimated Timeline: 1–3 Business Days)</span>
            </h4>
            <ol className="space-y-2 text-stone-700 list-decimal list-inside">
              <li>
                <strong>Underwriting Verification:</strong> Our Little Rock acquisition manager reviews your intended use, down payment capacity, and income documentation.
              </li>
              <li>
                <strong>Term Structuring:</strong> If approved, we prepare your formal Arkansas Promissory Note and Contract for Deed terms.
              </li>
              <li>
                <strong>Remote E-Signature Package:</strong> You will receive a secure DocuSign / approved e-signature link to execute your purchase documents.
              </li>
              <li>
                <strong>Loan Servicing Setup:</strong> Once down payment escrow funds clear, your account is activated in the loan servicing portal for automatic monthly payments.
              </li>
            </ol>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('inventory')}
              className="px-6 py-2.5 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Browse More Properties
            </button>
            <button
              onClick={() => onNavigate('payment-portal')}
              className="px-6 py-2.5 rounded-md border border-[#153023] text-[#153023] hover:bg-stone-50 text-xs font-semibold uppercase tracking-wider"
            >
              Learn About Servicing &amp; Payments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#153023] text-white rounded-xl p-6 sm:p-8 border-b-4 border-[#C29F59] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#DFC386] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Arkansas Owner Financing Application</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold">
          Apply for Direct Owner Financing
        </h1>
        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl font-sans">
          Richport Southern finances our properties directly. We review income stability, down payment capacity, and intended use without the rigid obstacles of traditional mortgage underwriting.
        </p>
      </div>

      {/* Progressive Step Indicator */}
      <div className="grid grid-cols-6 gap-2">
        {[
          { num: 1, label: 'Property' },
          { num: 2, label: 'Identity' },
          { num: 3, label: 'Use & Home' },
          { num: 4, label: 'Finances' },
          { num: 5, label: 'Documents' },
          { num: 6, label: 'Review' },
        ].map((s) => (
          <div
            key={s.num}
            onClick={() => {
              if (s.num < currentStep) setCurrentStep(s.num);
            }}
            className={`py-2 px-1 text-center rounded-md border text-xs font-medium cursor-pointer transition-all ${
              currentStep === s.num
                ? 'bg-[#153023] text-white border-[#153023] font-bold shadow-2xs'
                : currentStep > s.num
                ? 'bg-[#EAE2D0] text-[#153023] border-[#C29F59]'
                : 'bg-white text-stone-400 border-stone-200'
            }`}
          >
            <span className="block font-mono text-[10px] sm:text-xs">Step {s.num}</span>
            <span className="hidden sm:inline text-[11px] truncate">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-xl border border-[#DECFA9] p-6 sm:p-8 shadow-xs">
        {/* STEP 1: Property Selection & Legal Acknowledgment */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-[#153023]">
                Step 1: Select Property &amp; Review Application Terms
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Select the Arkansas parcel you are applying to finance and confirm our non-reservation policy.
              </p>
            </div>

            <div>
              <label htmlFor={step1PropSelectId} className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Target Property Selection *
              </label>
              <select
                id={step1PropSelectId}
                value={selectedPropId}
                onChange={(e) => setSelectedPropId(e.target.value)}
                className="w-full p-3 rounded-md border border-stone-300 bg-[#FAF8F5] text-xs font-semibold text-stone-900 focus:ring-2 focus:ring-[#153023]"
              >
                {properties
                  .filter((p) => p.pricing.ownerFinanceAvailable)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.county} Co.) — ${p.pricing.cashPrice.toLocaleString()} Cash / ${p.pricing.estimatedMonthlyPI}/mo terms
                    </option>
                  ))}
              </select>
            </div>

            {/* Selected Property Preview Box */}
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFC9] flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={selectedProperty.media.primaryPhoto}
                alt={selectedProperty.title}
                className="w-28 h-20 object-cover rounded-md bg-stone-200 shrink-0"
              />
              <div className="flex-1 text-xs space-y-1">
                <span className="font-bold text-[#153023] text-sm block font-serif">
                  {selectedProperty.title}
                </span>
                <p className="text-stone-600">{selectedProperty.streetAddress}, {selectedProperty.city}, AR</p>
                <div className="flex gap-4 pt-1 font-mono text-[11px] text-[#153023]">
                  <span>Financed Price: ${selectedProperty.pricing.financedPrice?.toLocaleString()}</span>
                  <span>•</span>
                  <span>Est Down: ${selectedProperty.pricing.downPayment?.toLocaleString()}</span>
                  <span>•</span>
                  <span>Est Payment: ${selectedProperty.pricing.estimatedMonthlyPI}/mo</span>
                </div>
              </div>
            </div>

            {/* Scope Requirement: Acknowledgment that application is NOT an approval or reservation */}
            <div className="p-4 bg-[#FFFBEB] rounded-lg border border-[#FDE68A] space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-amber-900">
                  <span className="font-bold block uppercase tracking-wide">
                    Required Legal Acknowledgment (Section 5 Compliance)
                  </span>
                  <p className="leading-relaxed">
                    Submitting this application does <strong>not</strong> constitute a credit approval, binding loan commitment, or reservation of real property. Richport Southern continues to market all properties until formal transaction documents are executed and earnest escrow funds are cleared.
                  </p>
                </div>
              </div>

              <label htmlFor={step1AckId} className="flex items-start gap-2 pt-2 border-t border-amber-200 cursor-pointer text-xs font-semibold text-amber-950">
                <input
                  id={step1AckId}
                  type="checkbox"
                  checked={ackNotApproval}
                  onChange={(e) => setAckNotApproval(e.target.checked)}
                  className="mt-0.5 accent-[#153023]"
                />
                <span>
                  I understand and acknowledge that this application does not hold or reserve the property, and is subject to Richport Southern approval.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 2: Buyer Identity & Contact Information */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200 text-xs">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-[#153023]">
                Step 2: Buyer Identity &amp; Contact
              </h2>
              <p className="text-stone-600 mt-1">
                Tell us whether you are applying as an individual or legal business entity (LLC/Trust).
              </p>
            </div>

            {/* Individual vs Entity Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBuyerType('individual')}
                className={`p-3 rounded-lg border flex items-center justify-center gap-2 font-semibold transition-all ${
                  buyerType === 'individual'
                    ? 'bg-[#153023] text-white border-[#153023] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Individual / Household Buyer</span>
              </button>
              <button
                type="button"
                onClick={() => setBuyerType('entity')}
                className={`p-3 rounded-lg border flex items-center justify-center gap-2 font-semibold transition-all ${
                  buyerType === 'entity'
                    ? 'bg-[#153023] text-white border-[#153023] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Entity / LLC / Trust Buyer</span>
              </button>
            </div>

            {buyerType === 'entity' && (
              <div>
                <label htmlFor={step2EntityNameId} className="block font-semibold text-stone-700 mb-1">
                  Entity / Company Legal Name *
                </label>
                <input
                  id={step2EntityNameId}
                  type="text"
                  required
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  placeholder="e.g. Ozark Holdings, LLC"
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={step2FullNameId} className="block font-semibold text-stone-700 mb-1">
                  Primary Contact / Applicant Full Legal Name *
                </label>
                <input
                  id={step2FullNameId}
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Johnathan Miller"
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                />
              </div>
              <div>
                <label htmlFor={step2EmailId} className="block font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  id={step2EmailId}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={step2PhoneId} className="block font-semibold text-stone-700 mb-1">
                  Phone Number *
                </label>
                <input
                  id={step2PhoneId}
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(501) 555-0199"
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                />
              </div>
              <div>
                <label htmlFor={step2AddressId} className="block font-semibold text-stone-700 mb-1">
                  Current Residential Street Address *
                </label>
                <input
                  id={step2AddressId}
                  type="text"
                  required
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                  placeholder="123 Maple Street"
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div>
              <label htmlFor={step2CityStateZipId} className="block font-semibold text-stone-700 mb-1">
                City, State, and ZIP Code *
              </label>
              <input
                id={step2CityStateZipId}
                type="text"
                required
                value={cityStateZip}
                onChange={(e) => setCityStateZip(e.target.value)}
                placeholder="Little Rock, AR 72201"
                className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Intended Use & Household */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200 text-xs">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-[#153023]">
                Step 3: Intended Property Use &amp; Household Information
              </h2>
              <p className="text-stone-600 mt-1">
                Understanding how you plan to use this Arkansas property helps us ensure compliance with local zoning and loan servicing covenants.
              </p>
            </div>

            <div>
              <label htmlFor={step3IntendedUseId} className="block font-semibold text-stone-700 mb-1">
                What is your intended use for this parcel? *
              </label>
              <select
                id={step3IntendedUseId}
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value as any)}
                className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-stone-800"
              >
                <option value="primary_home">Primary Residence (Self-occupied)</option>
                <option value="recreational">Recreational / Hunting / Weekend Cabin</option>
                <option value="build_new">Future Home Construction / Homestead</option>
                <option value="investment_rental">Long-Term Rental / Investment Holding</option>
                <option value="other">Other Commercial or Agricultural Use</option>
              </select>
            </div>

            <div>
              <label htmlFor={step3HouseholdSizeId} className="block font-semibold text-stone-700 mb-1">
                Total Household Size (Number of Occupants):
              </label>
              <input
                id={step3HouseholdSizeId}
                type="number"
                min={1}
                max={12}
                value={householdSize}
                onChange={(e) => setHouseholdSize(Number(e.target.value))}
                className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Financial Readiness & Repayment Ability */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200 text-xs">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-[#153023]">
                Step 4: Financial Readiness &amp; Repayment Ability
              </h2>
              <p className="text-stone-600 mt-1">
                We do not pull invasive hard credit inquiries. Instead, we verify that your monthly income comfortably supports the payments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={step4DownPaymentId} className="block font-semibold text-stone-700 mb-1">
                  Cash Down Payment Available on Hand ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-400 font-bold">$</span>
                  <input
                    id={step4DownPaymentId}
                    type="number"
                    min={1000}
                    step={100}
                    value={downPaymentAvailable}
                    onChange={(e) => setDownPaymentAvailable(Number(e.target.value))}
                    className="w-full pl-7 p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] font-mono"
                  />
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5 block">
                  Recommended minimum: ${selectedProperty.pricing.downPayment?.toLocaleString()}
                </span>
              </div>

              <div>
                <label htmlFor={step4MonthlyIncomeId} className="block font-semibold text-stone-700 mb-1">
                  Gross Monthly Household Income ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-400 font-bold">$</span>
                  <input
                    id={step4MonthlyIncomeId}
                    type="number"
                    min={1000}
                    step={100}
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full pl-7 p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] font-mono"
                  />
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5 block">
                  Includes employment, business, retirement, or disability
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={step4HousingPaymentId} className="block font-semibold text-stone-700 mb-1">
                  Current Monthly Housing Payment (Rent or Mortgage) ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-400 font-bold">$</span>
                  <input
                    id={step4HousingPaymentId}
                    type="number"
                    min={0}
                    step={50}
                    value={housingPaymentCurrent}
                    onChange={(e) => setHousingPaymentCurrent(Number(e.target.value))}
                    className="w-full pl-7 p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={step4MajorDebtsId} className="block font-semibold text-stone-700 mb-1">
                  Total Other Monthly Major Debts (Auto, Cards, Loans) ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-400 font-bold">$</span>
                  <input
                    id={step4MajorDebtsId}
                    type="number"
                    min={0}
                    step={50}
                    value={majorDebtsMonthly}
                    onChange={(e) => setMajorDebtsMonthly(Number(e.target.value))}
                    className="w-full pl-7 p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Secure Document Upload Solution */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200 text-xs">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-[#153023]">
                Step 5: Secure Document Verification Upload
              </h2>
              <p className="text-stone-600 mt-1">
                To protect privacy, applicant IDs and income records are encrypted in our offsite repository.
                <strong> Ordinary unencrypted email attachments are strictly prohibited by company policy.</strong>
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#DECFA9] space-y-4">
              <div className="flex items-center gap-2 text-stone-800 font-semibold">
                <Lock className="w-4 h-4 text-[#C29F59]" />
                <span>Upload Proof of Identification &amp; Income</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <label htmlFor={step5CategorySelectId} className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Document Category
                  </label>
                  <select
                    id={step5CategorySelectId}
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full p-2 rounded-md border border-stone-300 bg-white"
                  >
                    <option value="Government Issued ID">Gov-Issued Photo ID (Driver's License / Passport)</option>
                    <option value="Proof of Income">Proof of Income (Recent Paystub / Tax Return)</option>
                    <option value="Bank Statement">Bank Statement (Down payment verification)</option>
                    <option value="Entity Filing">Entity Docs (Articles of Organization / EIN)</option>
                  </select>
                </div>

                <div className="sm:col-span-5">
                  <label htmlFor={step5FileInputId} className="block text-[11px] font-semibold text-stone-600 mb-1">
                    File Name / Select Document (PDF, JPG, PNG &lt; 15MB)
                  </label>
                  <input
                    id={step5FileInputId}
                    type="text"
                    placeholder="e.g. Bank_Statement_July2024.pdf"
                    value={simulatedFileName}
                    onChange={(e) => setSimulatedFileName(e.target.value)}
                    className="w-full p-2 rounded-md border border-stone-300 bg-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="button"
                    onClick={handleAddFile}
                    className="w-full py-2 px-3 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#DFC386]" />
                    <span>Attach File</span>
                  </button>
                </div>
              </div>

              {/* Uploaded Files Table */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Attached Verification Files ({uploadedFiles.length})
                </span>
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="p-2.5 bg-white rounded border border-stone-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C29F59]" />
                      <span className="font-semibold text-stone-800">{file.name}</span>
                      <span className="text-stone-400 font-mono text-[10px]">({file.size})</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px]">{file.category}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(i)}
                      className="text-stone-400 hover:text-red-600 p-1"
                      aria-label="Remove attached document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review Summary & Consent Logging */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200 text-xs">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-[#153023]">
                Step 6: Review Application &amp; Authorize Consent
              </h2>
              <p className="text-stone-600 mt-1">
                Review your application details below and provide required electronic transaction consents.
              </p>
            </div>

            {/* Application Summary Box */}
            <div className="p-5 rounded-lg bg-[#FAF8F5] border border-[#DECFA9] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-stone-500 block text-[11px]">Selected Property:</span>
                <span className="font-bold text-[#153023] block">{selectedProperty.title}</span>
                <span className="text-stone-600 block text-[11px]">{selectedProperty.county} County, AR</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Applicant Name:</span>
                <span className="font-bold text-[#153023] block">{fullName || 'Not provided'}</span>
                <span className="text-stone-600 block text-[11px]">{email} • {phone}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Down Payment Readiness:</span>
                <span className="font-mono font-bold text-[#153023] block">${downPaymentAvailable.toLocaleString()} Available</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Gross Monthly Income:</span>
                <span className="font-mono font-bold text-[#153023] block">${monthlyIncome.toLocaleString()} / mo</span>
              </div>
            </div>

            {/* Electronic Consents (Scope Section 5 & 6) */}
            <div className="space-y-3 p-4 bg-stone-50 rounded-lg border border-stone-200">
              <label htmlFor={step6ElectronicConsentId} className="flex items-start gap-2.5 cursor-pointer">
                <input
                  id={step6ElectronicConsentId}
                  type="checkbox"
                  required
                  checked={electronicConsent}
                  onChange={(e) => setElectronicConsent(e.target.checked)}
                  className="mt-0.5 accent-[#153023]"
                />
                <span className="text-stone-700 leading-relaxed">
                  <strong>Electronic Records and Signature Consent:</strong> I consent to receive application notices, disclosures, and closing documents electronically in accordance with the federal E-SIGN Act and Arkansas law.
                </span>
              </label>

              <label htmlFor={step6VerificationConsentId} className="flex items-start gap-2.5 cursor-pointer pt-2 border-t border-stone-200">
                <input
                  id={step6VerificationConsentId}
                  type="checkbox"
                  required
                  checked={verificationConsent}
                  onChange={(e) => setVerificationConsent(e.target.checked)}
                  className="mt-0.5 accent-[#153023]"
                />
                <span className="text-stone-700 leading-relaxed">
                  <strong>Information Verification Authorization:</strong> I certify that the statements provided are true and correct. I authorize Richport Southern, LLC or its designated agent to verify employment, income, and public record data solely for evaluating owner financing qualification.
                </span>
              </label>

              <div className="text-[10px] text-stone-400 font-mono pt-1">
                Timestamp: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} • Audit Version: RPS-APP-v1.4
              </div>
            </div>
          </div>
        )}

        {/* Step Validation Error Banner */}
        {stepError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2.5 text-xs text-red-800 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{stepError}</span>
          </div>
        )}

        {/* Step Navigation Buttons */}
        <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2.5 rounded-md bg-[#153023] hover:bg-[#1E4331] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-xs"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4 text-[#DFC386]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitApplication}
              disabled={!electronicConsent || !verificationConsent || isSubmitting}
              className="px-8 py-3 rounded-md bg-[#153023] hover:bg-[#1E4331] disabled:opacity-50 text-[#FAF7F2] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition-all"
            >
              {isSubmitting ? (
                <span>Encrypting &amp; Submitting...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#DFC386]" />
                  <span>Submit Application to Richport Southern</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
