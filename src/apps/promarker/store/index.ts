import { create } from 'zustand';

type StencilState = {
  stencilCategory: string;
  stencilCd: string;
  serialNo: string;
  setStencil: (state: Partial<StencilState>) => void;
  setStencilConfig: (data: any) => void;
  clearAll: () => void;
};

export const useStencilStore = create<StencilState>((set) => ({
  stencilCategory: '',
  stencilCd: '',
  serialNo: '',
  setStencil: (state) => set(state),
  setStencilConfig: (data) => set(data),
  clearAll: () => set({ stencilCategory: '', stencilCd: '', serialNo: '' }),
}));
