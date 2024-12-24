import { useCallback } from 'react';
import { showErrorMessage } from '../../../foundation/utils/mirel/errorHandler';
import { useMessageBar } from '../../../foundation/hooks/mirel/useMessageBar';

export const useJsonDialog = ({
  stencilCategory,
  stencilCd,
  serialNo,
  setStencilConfig
}: {
  stencilCategory: string;
  stencilCd: string;
  serialNo: string;
  setStencilConfig: (data: any) => void;
}) => {
  const { showMessage } = useMessageBar();

  const createJsonDialogData = useCallback(() => {
    return JSON.stringify({
      stencilCategory,
      stencilCd,
      serialNo,
      dataElements: []
    }, null, 2);
  }, [stencilCategory, stencilCd, serialNo]);

  const parseAndApplyJson = useCallback((jsonValue: string): boolean => {
    try {
      const data = JSON.parse(jsonValue);
      setStencilConfig(data);
      return true;
    } catch (error) {
      if (error instanceof SyntaxError) {
        showErrorMessage('JSONの形式が不正です', { showMessage });
      }
      return false;
    }
  }, [setStencilConfig, showMessage]);

  return {
    createJsonDialogData,
    parseAndApplyJson
  };
};