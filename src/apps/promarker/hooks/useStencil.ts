import { useState, useEffect, useCallback } from 'react';
import { IDropdownOption } from '@fluentui/react';
import { stencilClient } from '../api/stencilClient';
import type { StencilConfig } from '../types/stencil';

interface UseStencilReturn {
  stencilOptions: IDropdownOption[];
  selectedStencil: string;
  stencilConfig: StencilConfig;
  error: string | null;
  loading: boolean;
  categoryNoSelected: boolean;
  handleStencilChange: (option?: IDropdownOption) => void;
  resetStencil: () => void;
}

const initialStencilConfig: StencilConfig = {
  description: null,
  stencilCd: '',
  stencilType: '',
  serialNo: '',
  registrationDate: ''
};

export const useStencil = (categoryId?: string): UseStencilReturn => {
  const [stencilOptions, setStencilOptions] = useState<IDropdownOption[]>([]);
  const [selectedStencil, setSelectedStencil] = useState<string>('');
  const [stencilConfig, setStencilConfig] = useState<StencilConfig>(initialStencilConfig);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadStencilOptions = useCallback(async () => {
    if (!categoryId) return;

    setLoading(true);
    setError(null);
    
    try {
      const options = await stencilClient.getStencilOptions(categoryId);
      setStencilOptions(options.map(option => ({
        key: option.value,
        text: option.text
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : '設定の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  const loadStencilConfig = useCallback(async (stencilCd: string) => {
    if (!stencilCd) return;

    setLoading(true);
    setError(null);

    try {
      const config = await stencilClient.getStencilConfig(stencilCd);
      setStencilConfig(config);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ステンシル情報の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStencilOptions();
  }, [loadStencilOptions]);

  const handleStencilChange = useCallback((option?: IDropdownOption) => {
    if (option) {
      setSelectedStencil(option.key as string);
      loadStencilConfig(option.key as string);
    }
  }, [loadStencilConfig]);

  const resetStencil = useCallback(() => {
    setSelectedStencil('');
    setStencilConfig(initialStencilConfig);
    setError(null);
  }, []);

  return {
    stencilOptions,
    selectedStencil,
    stencilConfig,
    error,
    loading,
    categoryNoSelected: !categoryId,
    handleStencilChange,
    resetStencil
  };
};