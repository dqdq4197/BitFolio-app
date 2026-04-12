import { httpClient } from '../core/httpClient'

export const upbitClient = httpClient.extend({
  prefixUrl: 'https://api.upbit.com',
})
