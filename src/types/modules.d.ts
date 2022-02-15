declare module 'translate-google-api' {
  type params = {
    tld: 'com' | 'cn';
    to: string;
  };
  const translate: (
    segment: string[] | string,
    { tld, to }: params
  ) => Promise<string[]>;

  export default translate;
}

declare module 'text-decoding' {
  export class TextDecoder {
    constructor(label = 'utf-8', options = {});

    decode(input: BufferSource, options = {}): string;
  }
}
