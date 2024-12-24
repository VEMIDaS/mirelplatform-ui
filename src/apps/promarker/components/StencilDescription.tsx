import {
  Stack,
  Text,
  IStackTokens,
  mergeStyleSets,
  Theme,
  getTheme
} from '@fluentui/react';

interface StencilDescriptionProps {
  description: string;
  className?: string;
}

const theme: Theme = getTheme();
const styles = mergeStyleSets({
  container: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.neutralPrimary,
  },
  description: {
    fontSize: '14px',
    color: theme.palette.neutralSecondary,
    lineHeight: '20px',
  }
});

const stackTokens: IStackTokens = {
  childrenGap: 8,
};

export const StencilDescription: React.FC<StencilDescriptionProps> = ({
  description,
  className
}) => {
  if (!description) return null;

  return (
    <Stack
      horizontal
      tokens={stackTokens}
      className={`${styles.container} ${className || ''}`}
    >
      <Stack.Item grow={3}>
        <Text className={styles.label}>ステンシルについて</Text>
      </Stack.Item>
      <Stack.Item grow={9}>
        <Text className={styles.description}>{description}</Text>
      </Stack.Item>
    </Stack>
  );
};

export default StencilDescription;