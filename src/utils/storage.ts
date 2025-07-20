import { Solution } from '@/types/solution';

const STORAGE_KEY = 'drakoyuda_solutions';

export const saveSolutions = (solutions: Solution[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solutions));
    console.log('Solutions saved to localStorage:', solutions.length);
    return true;
  } catch (error) {
    console.error('Failed to save solutions to localStorage:', error);
    return false;
  }
};

export const loadSolutions = (): Solution[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      console.log('Solutions loaded from localStorage:', parsed.length);
      return parsed;
    }
    return null;
  } catch (error) {
    console.error('Failed to load solutions from localStorage:', error);
    return null;
  }
};

export const exportSolutionsAsJSON = (solutions: Solution[]): string => {
  return JSON.stringify(solutions, null, 2);
};

export const importSolutionsFromJSON = (jsonData: string): Solution[] | null => {
  try {
    const solutions = JSON.parse(jsonData);
    // Basic validation
    if (Array.isArray(solutions) && solutions.every(s => s.id && s.title)) {
      return solutions;
    }
    throw new Error('Invalid solution data format');
  } catch (error) {
    console.error('Failed to import solutions from JSON:', error);
    return null;
  }
};

export const clearStorageData = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Storage data cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear storage data:', error);
    return false;
  }
};

// Migration helper for transitioning from demo to real data
export const migrateDemoToRealData = (realPortfolioData: Solution[]): void => {
  const existingData = loadSolutions();
  if (!existingData || existingData.length <= 4) {
    // If no existing data or only demo data (4 solutions), replace with real portfolio
    saveSolutions(realPortfolioData);
    console.log('Migrated to real portfolio data');
  }
};