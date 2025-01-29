import ko from '/lib/lang/ko/translation.json'
import en from '/lib/lang/en/translation.json'

declare module 'translate-google-api' {
  type params = {
    tld: 'com' | 'cn'
    to: string
  }
  const translate: (
    segment: string[] | string,
    { tld, to }: params
  ) => Promise<string[]>

  export default translate
}

// version > 11.11.0 의 경우 수정해야함
// https://react.i18next.com/latest/typescript
declare module 'react-i18next' {
  // and extend them!
  interface Resources {
    ko: typeof ko
    en: typeof en
  }
}

declare module 'text-decoding' {
  export class TextDecoder {
    constructor(label = 'utf-8', options = {})

    decode(input: BufferSource, options = {}): string
  }
}
