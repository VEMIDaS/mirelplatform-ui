import {
  Text,
  DefaultButton,
  Dialog,
  DialogType,
  IDialogContentProps,
  DialogFooter,
  PrimaryButton,
  TextField,
  mergeStyleSets,
  getTheme
} from '@fluentui/react';
import { useState } from 'react';
import { StencilForm } from '../components/StencilForm';
import { useStencilStore } from '../store';
import { useStencilMaster } from '../hooks/useStencilMaster';
import { useJsonDialog } from '../hooks/useJsonDialog';

const theme = getTheme();
const styles = mergeStyleSets({
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: theme.palette.neutralPrimary,
    marginBottom: '20px',
  },
  rightItems: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginBottom: '20px',
  },
  jsonDialogTextarea: {
    width: '100%',
    minHeight: '300px'
  }
});

export const ProMarker: React.FC = () => {
  const [isJsonDialogOpen, setIsJsonDialogOpen] = useState(false);
  const [jsonValue, setJsonValue] = useState('');

  const {
    stencilCategory,
    stencilCd,
    serialNo,
    clearAll,
    setStencilConfig,
  } = useStencilStore();

  const { processing, reloadMaster } = useStencilMaster();

  const { createJsonDialogData, parseAndApplyJson } = useJsonDialog({
    stencilCategory,
    stencilCd,
    serialNo,
    setStencilConfig
  });

  const handleJsonDialog = () => {
    setJsonValue(createJsonDialogData());
    setIsJsonDialogOpen(true);
  };

  const handleJsonApply = () => {
    if (parseAndApplyJson(jsonValue)) {
      setIsJsonDialogOpen(false);
    }
  };

  const handleReloadMaster = async () => {
    const result = await reloadMaster({
      stencilCategory,
      stencilCd,
      serialNo
    });
  
    if (result) {
      // 成功時の追加処理があれば実装
      clearAll();
    }
  };

  const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: '実行条件（JSON形式）',
    subText: 'JSON形式で実行条件を編集できます。'
  };

  return (
    <div className={styles.container}>
      <Text className={styles.title}>
        ProMarker 払出画面
      </Text>

      <div className={styles.rightItems}>
        <DefaultButton
          text="ステンシル定義を再取得"
          onClick={clearAll}
          disabled={processing}
        />
        <DefaultButton
          text="全てクリア"
          onClick={clearAll}
          disabled={processing}
        />
        <DefaultButton
          text="Json形式"
          onClick={handleJsonDialog}
          disabled={processing}
        />
        <DefaultButton
          text="ステンシルマスタをリロード"
          onClick={handleReloadMaster}
          disabled={processing}
        />
      </div>

      <StencilForm />

      <Dialog
        hidden={!isJsonDialogOpen}
        onDismiss={() => setIsJsonDialogOpen(false)}
        dialogContentProps={dialogContentProps}
        modalProps={{ isBlocking: true }}
      >
        <TextField
          multiline
          rows={15}
          value={jsonValue}
          onChange={(_, newValue) => setJsonValue(newValue || '')}
          className={styles.jsonDialogTextarea}
        />
        <DialogFooter>
          <PrimaryButton onClick={handleJsonApply} text="Apply" />
          <DefaultButton onClick={() => setIsJsonDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ProMarker;