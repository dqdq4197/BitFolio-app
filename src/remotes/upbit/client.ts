import { httpClient } from '../core/http-client'

export const upbitClient = httpClient.extend({
  prefixUrl: 'https://api.upbit.com',
})
