export const getCurrentUserId = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId');
    }
    return null;
  };