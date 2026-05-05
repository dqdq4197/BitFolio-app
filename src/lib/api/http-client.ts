import ky from 'ky'

import createHttpClient from './create-http-client'

export const baseKy = ky.create({ retry: 0, timeout: false })

export const httpClient = createHttpClient(baseKy)
