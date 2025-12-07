export const validateTransaction = (amount: number, balance: number): boolean => {
  if (amount <= 0) {
    throw new Error('Amount must be positive');
  }
  if (amount > balance) {
    return false;
  }
  return true;
};
