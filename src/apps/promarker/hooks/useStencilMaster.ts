import { useState } from 'react';
import { stencilClient, StencilApiError } from '../api/stencilClient';
import { handleApiError, showSuccessMessage } from '../../../foundation/utils/mirel/errorHandler';
import { useMessageBar } from '../../../foundation/hooks/mirel/useMessageBar';

export const useStencilMaster = () => {
  const [processing, setProcessing] = useState(false);
  const { showMessage } = useMessageBar();

  const reloadMaster = async (params: {
    stencilCategory: string;
    stencilCd: string;
    serialNo: string;
  }) => {
    setProcessing(true);
    try {
      await stencilClient.reloadStencilMaster(params);
      showSuccessMessage('マスタの再読み込みが完了しました', { showMessage });
      return true;
    } catch (error) {
      if (error instanceof StencilApiError) {
        handleApiError(error, { showMessage });
      } else {
        throw error; // 予期せぬエラーはErrorBoundaryで捕捉
      }
      return false;
    } finally {
      setProcessing(false);
    }
  };

  return {
    processing,
    reloadMaster
  };
};