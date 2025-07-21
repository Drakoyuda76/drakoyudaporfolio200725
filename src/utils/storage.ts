
import type { Solution } from '@/types/solution';

const STORAGE_KEY = 'drakoyuda_solutions';
const isDev = process.env.NODE_ENV === 'development';

export const saveSolutions = (solutions: Solution[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solutions));
    if (isDev) console.log('Solutions saved successfully');
    return true;
  } catch (error) {
    if (isDev) console.error('Storage error:', error);
    return false;
  }
};

export const loadSolutions = (): Solution[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    if (isDev) console.error('Failed to load solutions:', error);
    return null;
  }
};

export const exportSolutionsAsJSON = (solutions: Solution[]): string => {
  return JSON.stringify(solutions, null, 2);
};

export const clearStorageData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('drakoyuda_demo_backup');
    if (isDev) console.log('Storage cleared successfully');
  } catch (error) {
    if (isDev) console.error('Failed to clear storage:', error);
  }
};
