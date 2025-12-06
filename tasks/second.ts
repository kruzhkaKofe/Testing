export interface PriceData {
  id: string;
  priceUsd: string;
}

export const getTokenPrice = async (tokenId: string): Promise<number> => {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${tokenId}`);
    if (!response.ok) {
      throw new Error('Network error');
    }
    const data = await response.json();
    return parseFloat(data.data.priceUsd);
  } catch (e) {
    throw e;
  }
};
