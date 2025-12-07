export const fetchWithRetry = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    return fetchWithRetry(fn, retries - 1);
  }
};
