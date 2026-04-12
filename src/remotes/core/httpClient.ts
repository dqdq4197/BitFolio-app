import ky from 'ky'

import createHttpClient from './createHttpClient'

export const baseKy = ky.create({ retry: 0, timeout: false })

export const httpClient = createHttpClient(baseKy)
