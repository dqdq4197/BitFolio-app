import CoinGecko from '@coingecko/coingecko-typescript'

export const client = new CoinGecko({
  demoAPIKey: process.env.EXPO_PUBLIC_COINGECKO_API_KEY,
  environment: 'demo',
  maxRetries: 0,
})
