import { t } from '/lib/utils/mappedType'

export const CTYPTOCOMPARE_API_VERSION = 'v2'
const CTYPTOCOMPARE_BASE = 'https://min-api.cryptocompare.com/data/'
export const CTYPTOCOMPARE_PATH_PREFIX = `${CTYPTOCOMPARE_BASE}`

export const CTYPTOCOMPARE_LANG = t({
  EN: 'en',
  PT: 'pt', // 포르투갈어
})
