export const calculateFee = (volume: number): number => {
  if (volume < 1000) return 0.05; // 5%
  if (volume < 10000) return 0.03; // 3%
  if (volume < 50000) return 0.01; // 1%
  return 0.005; // 0.5%
};
