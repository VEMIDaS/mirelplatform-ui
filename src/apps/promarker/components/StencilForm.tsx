import {
  Stack,
  PrimaryButton,
  DefaultButton,
  IStackTokens,
  mergeStyleSets,
  getTheme
} from '@fluentui/react';
import { useState, useCallback } from 'react';
import { StencilSelector } from './StencilSelector';
import { useStencilForm } from '../hooks/useStencilForm';

const theme = getTheme();
const styles = mergeStyleSets({
  container: {
    padding: '20px',
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation4,
  },
  buttonContainer: {
    marginTop: '20px',
  }
});

const stackTokens: IStackTokens = {
  childrenGap: 16,
};

export const StencilForm: React.FC = () => {
  const [processing, setProcessing] = useState(false);
  const {
    stencilOptions,
    selectedStencil,
    stencilConfig,
    categoryNoSelected,
    handleStencilChange,
    handleClearForm,
    handleSubmit,
    isFormValid
  } = useStencilForm();

  const onSubmit = useCallback(async () => {
    setProcessing(true);
    try {
      await handleSubmit();
    } finally {
      setProcessing(false);
    }
  }, [handleSubmit]);

  return (
    <Stack className={styles.container} tokens={stackTokens}>
      <StencilSelector
        disabled={processing}
        processing={processing}
        categoryNoSelected={categoryNoSelected}
        stencilOptions={stencilOptions}
        selectedStencil={selectedStencil}
        onStencilChange={handleStencilChange}
        stencilConfig={stencilConfig}
      />

      <Stack 
        horizontal 
        horizontalAlign="end" 
        className={styles.buttonContainer}
        tokens={{ childrenGap: 8 }}
      >
        <DefaultButton
          text="クリア"
          onClick={handleClearForm}
          disabled={processing}
        />
        <PrimaryButton
          text="保存"
          onClick={onSubmit}
          disabled={processing || !isFormValid}
        />
      </Stack>
    </Stack>
  );
};

export default StencilForm;