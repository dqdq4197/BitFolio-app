

export default function currencySymbol(currency?: string) {
  switch (currency) {
    case 'krw':
      return '₩'
    case 'eur':
      return '€'

    default: 
      return '$'
  }
}
