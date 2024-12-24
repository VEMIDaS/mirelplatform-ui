import { Stack, Text, DefaultButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Text variant="xxLarge">mirelplatform</Text>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <DefaultButton 
          text="ProMarker"
          onClick={() => navigate('/promarker')}
        />
        <DefaultButton 
          text="AppRunner"
          onClick={() => navigate('/apprunner')}
        />
      </Stack>
    </Stack>
  );
};
