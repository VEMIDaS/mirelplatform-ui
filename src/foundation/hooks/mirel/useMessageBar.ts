import { useState } from 'react';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

interface MessageBarState {
  isVisible: boolean;
  message: string;
  type: MessageType;
}

interface UseMessageBarReturn {
  isVisible: boolean;
  message: string;
  type: MessageType;
  showMessage: (message: string, type: MessageType) => void;
  hideMessage: () => void;
}

export const useMessageBar = (): UseMessageBarReturn => {
  const [state, setState] = useState<MessageBarState>({
    isVisible: false,
    message: '',
    type: 'info',
  });

  const showMessage = (message: string, type: MessageType = 'info') => {
    setState({
      isVisible: true,
      message,
      type,
    });
  };

  const hideMessage = () => {
    setState({
      ...state,
      isVisible: false,
    });
  };

  return {
    isVisible: state.isVisible,
    message: state.message,
    type: state.type,
    showMessage,
    hideMessage,
  };
};