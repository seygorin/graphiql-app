import { toast } from 'react-toastify';

export function safeJsonParse(str: string, fallbackObject = {}) {
  if (str === '') return fallbackObject;
  try {
    return JSON.parse(str) as object;
  } catch (e) {
    toast.error('Invalid JSON format');
    return fallbackObject;
  }
}

export function safeJsonStringify(obj: object, fallbackString = '') {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    toast.error('Error converting object to JSON string');
    return fallbackString;
  }
}

export function ensureValidJson(str: string) {
  try {
    const parsed = JSON.parse(str);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return str;
  }
}
