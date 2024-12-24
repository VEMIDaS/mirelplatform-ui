import {
  Stack,
  Text,
  PrimaryButton,
  MessageBar,
  MessageBarType,
  IStackTokens,
  mergeStyleSets,
  getTheme
} from '@fluentui/react';

export interface ErrorFallbackProps {
  error?: Error;
}

const theme = getTheme();
const styles = mergeStyleSets({
  container: {
    padding: '40px 20px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: theme.palette.red,
    marginBottom: '16px',
  },
  message: {
    fontSize: '14px',
    color: theme.palette.neutralPrimary,
    marginBottom: '24px',
  }
});

const stackTokens: IStackTokens = {
  childrenGap: 16,
};

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Stack tokens={stackTokens} className={styles.container}>
      <Text className={styles.title}>
        エラーが発生しました
      </Text>
      
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline
      >
        {error?.message || 'アプリケーションで予期せぬエラーが発生しました。'}
      </MessageBar>

      {process.env.NODE_ENV === 'development' && error?.stack && (
        <MessageBar
          messageBarType={MessageBarType.warning}
          isMultiline
        >
          <pre>{error.stack}</pre>
        </MessageBar>
      )}

      <PrimaryButton
        text="ページを再読み込み"
        onClick={handleReload}
        styles={{
          root: {
            maxWidth: '200px',
            margin: '0 auto',
          }
        }}
      />
    </Stack>
  );
};

export default ErrorFallback;