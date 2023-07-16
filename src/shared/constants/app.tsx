import type { ToastOptions } from 'react-toastify';
import { Zoom } from 'react-toastify';

const APP_NAME = 'Code Smooth';

export const ERROR_TOKEN = 'RefreshAccessTokenError';
export const TOAST_CONFIG: ToastOptions = {
  autoClose: 500,
  hideProgressBar: true,
  transition: Zoom,
};
export { APP_NAME };
