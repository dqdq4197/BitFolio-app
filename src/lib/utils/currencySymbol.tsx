

export default function currencySymbol(currency: string) {
  switch (currency) {
    case 'krw':
      return '₩'
    case 'usd':
      return '$'
    case 'eur':
      return '€'
  }
}
