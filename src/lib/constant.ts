import { baseTypes } from 'base-types';

import { t } from '/lib/utils/mappedType';

// ----- BASE CONST ----------------

enum TAB_ROUTE_NAME {
  home = 'home',
  portfolio = 'portfolio',
  news = 'news',
  auth = 'auth',
}

const PRIVACY_POLICY_EN =
  'https://lime-lint-eba.notion.site/Bitfolio-ios-Privacy-Policy-644e0d1e30da4c98ad0e75cfc8253a2e';
const PRIVACY_POLICY_KO =
  'https://lime-lint-eba.notion.site/Bitfolio-ios-dad7db3124d74500b2a09d6340835631';
const TURMS_OF_SERVICE =
  'https://lime-lint-eba.notion.site/Bitfolio-8883e418432545c39ba504473a0f250e';

const TRANSLATE_PREFIX =
  'https://translation.googleapis.com/language/translate/v2';
const PAPAGO_PREFIX = 'https://openapi.naver.com/v1';
const LANGUAGE_STORAGE_KEY = 'local_language';

const CURRENCIES: Record<
  baseTypes.Currency,
  { iso: string; symbol: string; unicode: string; name: string }
> = {
  krw: {
    iso: 'KRW',
    symbol: '₩',
    unicode: '\u20A9',
    name: 'South Korean Won',
  },
  usd: {
    iso: 'USD',
    symbol: '$',
    unicode: '\u0024',
    name: 'United States Dollar',
  },
  eur: {
    iso: 'EUR',
    symbol: '€',
    unicode: '\u20AC',
    name: 'Euro',
  },
};

const CHART_TYPE = t({
  CANDLESTICK: 'candlestick',
  LINE: 'line',
});

export const STREAM_TYPE = t({
  SNAPSHOT: 'SNAPSHOT',
  REALTIME: 'REALTIME',
});

export const CHANGE_STATE = t({
  RISE: 'RISE',
  EVEN: 'EVEN',
  FALL: 'FALL',
});

enum KEYBOARD_STATE {
  UNDETERMINED = 0,
  SHOWN,
  HIDDEN,
}

const VALIDATIONS = {
  email: {
    // pattern => http://emailregex.com/
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    // 숫자를 포함한 영소문자 8글자 이상
    minLen: 8,
    pattern: /(?=.*\d)(?=.*[a-z]).{8,}/,
  },
};

// 파파고 지원 언어만 포함. (* 구글 api사용시 문서 참고 재설정)
const LANGUAGES: { [key: string]: string } = {
  ja: 'Japanese',
  ko: 'Korean',
  'zh-cn': 'Chinese Simplified',
  'zh-tw': 'Chinese Traditional',
  hi: 'Hindi',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  vi: 'Vietnamese',
  id: 'Indonesian',
  fa: 'Persian',
  ar: 'Arabic',
  th: 'Thai',
  ru: 'Russian',
  it: 'Italian',
  mm: 'Myanmar',
  // 위 파파고 지원

  af: 'Afrikaans',
  sq: 'Albanian',
  am: 'Amharic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  ny: 'Chichewa',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  eo: 'Esperanto',
  et: 'Estonian',
  tl: 'Filipino',
  fi: 'Finnish',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  iw: 'Hebrew',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  ga: 'Irish',
  jw: 'Javanese',
  kn: 'Kannada',
  kk: 'Kazakh',
  km: 'Khmer',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mn: 'Mongolian',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  no: 'Norwegian',
  ps: 'Pashto',
  pl: 'Polish',
  ma: 'Punjabi',
  ro: 'Romanian',
  sm: 'Samoan',
  gd: 'Scots Gaelic',
  sr: 'Serbian',
  st: 'Sesotho',
  sn: 'Shona',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  su: 'Sundanese',
  sw: 'Swahili',
  sv: 'Swedish',
  tg: 'Tajik',
  ta: 'Tamil',
  te: 'Telugu',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  cy: 'Welsh',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu',
};

// ---- UI CONST --------------

const TAB_BAR_HEIGHT = 55;
const CONTENT_SPACING = 16;

const CURRENCY = {
  USD: 'usd',
  KRW: 'krw',
  EUR: 'eur',
};

// ---- MDEDITOR CONST ----

const unicodes = {
  TEXT_BOLD: '<b>', // "\u200B",
  TEXT_ITALIC: '<i>', // "\u2006",
  TEXT_MARKER: '<mark>', // "\u2005",
  TEXT_LINK: '<link>', // "\uFEFF",
  UL_BULLET: '\u2022',
};

const style = {
  BOLD: 'bold',
  ITALIC: 'italic',
  LINK: 'link',
};

const TYPES = {
  PARAGRAPH: 'paragraph',
  HEADER: 'header',
  LIST: 'list',
  QUOTE: 'quote',
  DELIMITER: 'delimiter',
  EMBED: 'embed',
  DUMMY: 'dummy',
  IMAGE: 'image',
  LISTSTYLE: {
    OL: 'ordered',
    UL: 'unordered',
  },
};

const ACTIONS = {
  ENTER: 'enter',
  BACKSPACE: 'backspace',
  TYPING: 'typing',
  TOUCH: 'touch',
  LINEPOP: 'linepop',
  CHANGE_BLOCK_TYPE: 'change_block_type',
};

// ------------------------

export {
  LANGUAGE_STORAGE_KEY,
  PRIVACY_POLICY_EN,
  PRIVACY_POLICY_KO,
  TURMS_OF_SERVICE,
  TRANSLATE_PREFIX,
  PAPAGO_PREFIX,
  VALIDATIONS,
  CHART_TYPE,
  KEYBOARD_STATE,
  TAB_ROUTE_NAME,
  LANGUAGES,
  CURRENCY,
  CURRENCIES,
  TAB_BAR_HEIGHT,
  CONTENT_SPACING,
  unicodes,
  TYPES,
  ACTIONS,
  style,
};
