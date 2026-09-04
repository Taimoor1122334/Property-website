export type PropertyType = 
  | 'Single Family Residence'
  | 'Vacant Residential Land'
  | 'Rural Acreage / Timber'
  | 'Cabin / Recreational'
  | 'Commercial / Mixed';

export type PropertyStatus = 'available' | 'pending' | 'sold';

export type RepairTier = 'Move-in Ready' | 'Cosmetic Updates' | 'Moderate Rehab' | 'Extensive Rehab / Tear Down' | 'Unimproved Raw Land';

export interface PropertyMediaItem {
  url: string;
  caption: string;
  date: string;
  label: 'Current Inspection' | 'Aerial Survey' | 'County Plat / GIS' | 'Historical' | 'Street View';
}

export interface PropertyDocument {
  id: string;
  title: string;
  category: 'Title & Deed' | 'County GIS / Plat' | 'Property Disclosure' | 'Tax Assessment';
  date: string;
  fileSize: string;
}

export interface Property {
  id: string;
  referenceNumber: string;
  title: string;
  streetAddress: string;
  city: string;
  zip: string;
  county: string;
  parcelNumber: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  
  location: {
    lat: number;
    lng: number;
    directions: string;
    neighborhood: string;
    mapDisplayPreference: 'exact' | 'approximate_parcel';
  };

  physical: {
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    acreage: number;
    structures: string;
    yearBuilt?: number;
    occupancy: 'Vacant' | 'Occupied / Unknown' | 'Unimproved';
    utilities: string;
    roadAccess: string;
    zoning: string;
    floodZone: string;
    perkSoil: string;
  };

  pricing: {
    cashPrice: number;
    ownerFinanceAvailable: boolean;
    financedPrice?: number;
    downPayment?: number;
    interestRate?: number; // e.g. 9.9%
    termMonths?: number; // e.g. 60
    estimatedMonthlyPI?: number;
    otherChargesNote: string;
    disclaimer: string;
  };

  condition: {
    knownDefects: string[];
    repairLevel: RepairTier;
    debris: string;
    codeIssues: string;
    inspectionLimitations: string;
    asIsStatement: string;
  };

  titleClosing: {
    titleStatus: string;
    closingMethod: string;
    closingProcess: string;
    availableDocuments: PropertyDocument[];
  };

  media: {
    primaryPhoto: string;
    gallery: PropertyMediaItem[];
  };

  fitAndWatchOut: {
    goodFit: string[];
    watchOut: string[];
  };

  buyerResponsibilities: string[];
  faqs: { question: string; answer: string }[];
}

export interface BuyerApplication {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerType: 'individual' | 'entity';
  fullName: string;
  entityName?: string;
  email: string;
  phone: string;
  currentAddress: string;
  cityStateZip: string;
  intendedUse: 'primary_home' | 'recreational' | 'build_new' | 'investment_rental' | 'other';
  householdSize: number;
  downPaymentAvailable: number;
  monthlyIncome: number;
  housingPaymentCurrent: number;
  majorDebtsMonthly: number;
  uploadedFiles: { name: string; size: string; category: string }[];
  electronicConsent: boolean;
  verificationConsent: boolean;
  status: 'submitted' | 'under_review' | 'approved' | 'declined';
  createdAt: string;
}

export interface PropertyInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  type: 'question' | 'viewing';
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email' | 'text';
  buyingTimeline: 'immediate' | '1-3_months' | 'exploring';
  message: string;
  createdAt: string;
}

export interface FormerOwnerInquiry {
  id: string;
  parcelOrAddress: string;
  fullName: string;
  email: string;
  phone: string;
  relationship: 'Former Deedholder' | 'Heir / Family Member' | 'Adjoining Neighbor' | 'Attorney / Representative' | 'Other';
  message: string;
  acknowledgedDisclaimer: boolean;
  createdAt: string;
}
