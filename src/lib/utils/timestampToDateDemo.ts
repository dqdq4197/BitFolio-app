import { baseTypes } from 'base-types'
import { format } from 'date-fns'
import { ko, enUS } from 'date-fns/locale'

type DateProps = {
  timestamp: number
  isUnix?: boolean
  pattern: 'PPpp' | 'PP'
  language: baseTypes.Language
}

const timestampToDate = ({
  timestamp,
  isUnix = false,
  pattern,
  language,
}: DateProps) => {
  const date = new Date(isUnix ? timestamp * 1000 : timestamp)
  const locale = language === 'en' ? enUS : ko
  let formatToken = ''

  switch (pattern) {
    case 'PPpp':
      formatToken = 'PPpp'
      break

    case 'PP':
      formatToken = language === 'en' ? 'PP' : 'PPP'
      break

    default:
      break
  }

  return format(date, formatToken, { locale })
}

export default timestampToDate
