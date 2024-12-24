import {
  Stack,
  Dropdown,
  IDropdownOption,
  Label,
  mergeStyleSets,
  getTheme
} from '@fluentui/react';
import { StencilDescription } from './StencilDescription';
import type { StencilConfig } from '../types/stencil';

interface StencilSelectorProps {
  disabled: boolean;
  processing: boolean;
  categoryNoSelected: boolean;
  stencilOptions: IDropdownOption[];
  selectedStencil: string;
  onStencilChange: (option?: IDropdownOption) => void;
  stencilConfig: StencilConfig;
}

const theme = getTheme();
const styles = mergeStyleSets({
  container: {
    padding: '12px 0',
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.neutralPrimary,
  },
  dropdown: {
    width: '100%',
  }
});

export const StencilSelector: React.FC<StencilSelectorProps> = ({
  disabled,
  processing,
  categoryNoSelected,
  stencilOptions,
  selectedStencil,
  onStencilChange,
  stencilConfig
}) => {
  return (
    <Stack className={styles.container}>
      <Stack horizontal tokens={{ childrenGap: 12 }}>
        <Stack.Item grow={3}>
          <Label className={styles.label}>ステンシルコード</Label>
        </Stack.Item>
        <Stack.Item grow={9}>
          <Dropdown
            id="head_stencil_cd"
            className={styles.dropdown}
            options={stencilOptions}
            selectedKey={selectedStencil}
            onChange={(_, option) => onStencilChange(option)}
            disabled={disabled || processing || categoryNoSelected}
            required
            placeholder="ステンシルコードを選択してください"
          />
        </Stack.Item>
      </Stack>

      {stencilConfig.description && (
        <StencilDescription 
          description={stencilConfig.description}
        />
      )}
    </Stack>
  );
};

export default StencilSelector;