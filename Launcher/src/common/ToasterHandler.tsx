import { toast } from 'sonner';

export function ToasterHandler(message: string, type?: string) {
  if (type === 'error') {
    try {
      (toast as any).error ? (toast as any).error(message) : toast(message);
      console.error(message);
    } catch (e) {
      console.error(message, e);
    }
  } else {
    toast(message);
  }
}
