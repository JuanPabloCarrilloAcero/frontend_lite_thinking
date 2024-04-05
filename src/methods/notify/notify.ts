import {toast} from "react-toastify";

export function notify(message: string, type: string) {
    switch (type) {
        case 'info':
            toast.info(message);
            break;
        case 'success':
            toast.success(message);
            break;
        case 'warning':
            toast.warning(message);
            break;
        case 'error':
            toast.error(message);
            break;
        default:
            toast(message);
    }
}

export function notifyArray(messages: string[], type: string) {
    messages.forEach(message => {
        notify(message, type);
    });
}