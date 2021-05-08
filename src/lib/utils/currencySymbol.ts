import { baseTypes } from 'base-types';

export default function currencySymbol(currency?: baseTypes.Currency) {
  switch (currency) {
    case 'krw':
      return '₩'
    case 'eur':
      return '€'

    default: 
      return '$'
  }
}
