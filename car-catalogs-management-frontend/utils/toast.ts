import { toast as reactToastify, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const toast = {
    success: (message: string) => reactToastify.success(message, toastOptions),
    error: (message: string) => reactToastify.error(message, toastOptions),
    info: (message: string) => reactToastify.info(message, toastOptions),
    warn: (message: string) => reactToastify.warn(message, toastOptions),
};
