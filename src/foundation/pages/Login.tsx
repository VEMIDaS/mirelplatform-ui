import { useState } from 'react';
import { Stack, TextField, PrimaryButton, MessageBar, MessageBarType } from '@fluentui/react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // location.state.from から遷移元のURLを取得
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      // ログイン成功後、遷移元のURLまたはhomeに遷移
      navigate(from, { replace: true });
    } catch (err) {
      setError('ログインに失敗しました');
    }
  };

  return (
    <Stack tokens={{ childrenGap: 15 }} style={{ maxWidth: 400, margin: '100px auto' }}>
      <form onSubmit={handleSubmit}>
        <Stack tokens={{ childrenGap: 10 }}>
          {error && (
            <MessageBar messageBarType={MessageBarType.error}>
              {error}
            </MessageBar>
          )}
          <TextField
            label="ユーザー名"
            value={username}
            onChange={(_, value) => setUsername(value || '')}
            required
          />
          <TextField
            label="パスワード"
            type="password"
            value={password}
            onChange={(_, value) => setPassword(value || '')}
            required
          />
          <PrimaryButton type="submit" text="ログイン" />
        </Stack>
      </form>
    </Stack>
  );
};