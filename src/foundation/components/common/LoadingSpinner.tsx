import { Spinner, SpinnerSize } from '@fluentui/react';

export const LoadingSpinner: React.FC = () => {
  return (
    <Spinner 
      size={SpinnerSize.large} 
      label="読み込み中..."
      styles={{
        root: {
          margin: '20px auto',
        },
      }}
    />
  );
};