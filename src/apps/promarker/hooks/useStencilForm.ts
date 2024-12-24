import { useCallback } from 'react';
import { IDropdownOption } from '@fluentui/react';
import { useStencil } from './useStencil';
import { stencilClient } from '../api/stencilClient';
import type { StencilConfig } from '../types/stencil';

export interface UseStencilFormReturn {
  stencilOptions: IDropdownOption[];
  selectedStencil: string;
  stencilConfig: StencilConfig;
  categoryNoSelected: boolean;
  handleStencilChange: (option?: IDropdownOption) => void;
  handleClearForm: () => void;
  handleSubmit: () => Promise<void>;
  isFormValid: boolean;
}

export const useStencilForm = (): UseStencilFormReturn => {
  const {
    stencilOptions,
    selectedStencil,
    stencilConfig,
    categoryNoSelected,
    handleStencilChange,
    resetStencil,
  } = useStencil();

  const handleClearForm = useCallback(() => {
    resetStencil();
  }, [resetStencil]);

  const handleSubmit = useCallback(async () => {
    if (!selectedStencil) return;

    try {
      await stencilClient.updateStencilConfig(selectedStencil, stencilConfig);
    } catch (error) {
      console.error('Failed to update stencil config:', error);
      throw error;
    }
  }, [selectedStencil, stencilConfig]);

  const isFormValid = Boolean(selectedStencil && !categoryNoSelected);

  return {
    stencilOptions,
    selectedStencil,
    stencilConfig,
    categoryNoSelected,
    handleStencilChange,
    handleClearForm,
    handleSubmit,
    isFormValid,
  };
};