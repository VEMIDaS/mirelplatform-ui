// src/components/dialog/DownloadDialog.tsx
import { Dialog, DialogType } from '@fluentui/react';

interface IDownloadDialogProps {
  isOpen: boolean;
  onDismiss: () => void;
  files: any[];
}

export const DownloadDialog: React.FC<IDownloadDialogProps> = (props) => {
  return (
    <Dialog
      hidden={!props.isOpen}
      onDismiss={props.onDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Download Files'
      }}
    >
      {/* ダイアログの内容 */}
    </Dialog>
  );
};