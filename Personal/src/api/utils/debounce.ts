// src/utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(func: T, delay = 300) {
  let timeoutId: number | undefined;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
}
