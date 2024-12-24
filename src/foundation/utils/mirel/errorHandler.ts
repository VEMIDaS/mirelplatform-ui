import { MessageBarType } from '@fluentui/react';
import type { MessageType } from '../../hooks/mirel/useMessageBar';

interface ErrorResponse {
  response?: {
    status: number;
    data: {
      message?: string;
      errors?: string[];
    };
  };
  message: string;
}

type ErrorHandlerOptions = {
  showMessage: (message: string, type: MessageType) => void;
};

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown, options?: ErrorHandlerOptions): never => {
  if (error instanceof ApiError) {
    if (options?.showMessage) {
      options.showMessage(error.message, 'error');
    }
    throw error;
  }

  const err = error as ErrorResponse;
  const statusCode = err.response?.status || 500;
  const message = err.response?.data?.message || err.message || '予期せぬエラーが発生しました';

  if (options?.showMessage) {
    options.showMessage(message, 'error');
  }

  throw new ApiError(statusCode, message);
};

export const showSuccessMessage = (
  message: string,
  options: ErrorHandlerOptions
): void => {
  options.showMessage(message, 'success');
};

export const showErrorMessage = (
  message: string,
  options: ErrorHandlerOptions
): void => {
  options.showMessage(message, 'error');
};

export const showWarningMessage = (
  message: string,
  options: ErrorHandlerOptions
): void => {
  options.showMessage(message, 'warning');
};

export const translateMessageBarType = (type: MessageType): MessageBarType => {
  switch (type) {
    case 'success':
      return MessageBarType.success;
    case 'error':
      return MessageBarType.error;
    case 'warning':
      return MessageBarType.warning;
    default:
      return MessageBarType.info;
  }
};