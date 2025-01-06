import { Stack, Text, DefaultButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../config/routes';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Text variant="xxLarge">mirelplatform</Text>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        {routes.map(route => (
          <DefaultButton
            key={route.name}
            text={route.label}
            onClick={() => navigate(route.path)}
          />
        ))}
      </Stack>
    </Stack>
  );
};
