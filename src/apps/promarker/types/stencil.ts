export interface StencilConfig {
  description: string | null;
  stencilCd: string;
  stencilType: string;
  serialNo: string;
  registrationDate: string;
}

export interface StencilOption {
  value: string;
  text: string;
  category?: string;
}

export interface StencilFormState {
  selectedCategory: string;
  selectedStencil: string;
  description: string | null;
  isProcessing: boolean;
  isDisabled: boolean;
  error: string | null;
}

export interface StencilApiResponse {
  success: boolean;
  data?: StencilConfig;
  error?: string;
}

export interface StencilSearchParams {
  category?: string;
  stencilCd?: string;
  serialNo?: string;
  fromDate?: string;
  toDate?: string;
}

export type StencilType = 'NORMAL' | 'SPECIAL' | 'TEMPORARY';

export interface StencilValidationError {
  field: keyof StencilConfig;
  message: string;
}

export interface StencilMasterData {
  categories: Array<{
    id: string;
    name: string;
  }>;
  types: Array<{
    code: StencilType;
    name: string;
  }>;
}