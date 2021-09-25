
// ----- BASE CONST ----------------

const APP_NAME = 'bitfolio';
enum TAB_ROUTE_NAME {
  home= 'home',
  portfolio= 'portfolio',
  news= 'news'
}
const CRYPTOCOMPARE_API_KEY = 'c95d5d7549c69950d894e2821ec15798d91f994e4ff0a5d360e78fbd46b9ca37';
const GOOGLE_PLATFROM_KEY = 'bitfolio-326908';
const TRANSLATE_PREFIX = 'https://translation.googleapis.com/language/translate/v2';
const PAPAGO_PREFIX = 'https://openapi.naver.com/v1';
const LANGUAGE_STORAGE_KEY = 'local_language';
const NAVER_CLIENT_ID = 'r8eBDb2WAkIbc9H2kKqj';
const NAVER_CLIENT_SECRET = 'YMeKE9SM2_';

const CURRENCIES = {
  krw: {
    iso: 'KRW',
    symbol: '₩',
    unicode: '\u20A9',
    name: 'South Korean Won'
  },
  usd: {
    iso: 'USD',
    symbol: '$',
    unicode: '\u0024',
    name: 'United States Dollar'
  },
  eur: {
    iso: 'EUR',
    symbol: '€',
    unicode: '\u20AC',
    name: 'Euro'
  }
}


// 파파고 지원 언어만 포함. (* 구글 api사용시 문서 참고 재설정)
const LANGUAGES: {[key: string]: string} = {
  ja: "Japanese",
  ko: "Korean",
  'zh-cn': "Chinese Simplified",
  'zh-tw': "Chinese Traditional",
  hi: "Hindi",
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  pt: "Portuguese",
  vi: "Vietnamese",
  id: "Indonesian",
  fa: "Persian",
  ar: "Arabic",
  th: "Thai",
  ru: "Russian",
  it: "Italian",
  mm: "Myanmar"
  // af: "Afrikaans",
  // sq: "Albanian",
  // am: "Amharic",
  // hy: "Armenian",
  // az: "Azerbaijani",
  // eu: "Basque",
  // be: "Belarusian",
  // bn: "Bengali",
  // bs: "Bosnian",
  // bg: "Bulgarian",
  // ca: "Catalan",
  // ceb: "Cebuano",
  // ny: "Chichewa",
  // co: "Corsican",
  // hr: "Croatian",
  // cs: "Czech",
  // da: "Danish",
  // nl: "Dutch",
  // eo: "Esperanto",
  // et: "Estonian",
  // tl: "Filipino",
  // fi: "Finnish",
  // fy: "Frisian",
  // gl: "Galician",
  // ka: "Georgian",
  // el: "Greek",
  // gu: "Gujarati",
  // ht: "Haitian Creole",
  // ha: "Hausa",
  // haw: "Hawaiian",
  // iw: "Hebrew",
  // hmn: "Hmong",
  // hu: "Hungarian",
  // is: "Icelandic",
  // ig: "Igbo",
  // ga: "Irish",
  // jw: "Javanese",
  // kn: "Kannada",
  // kk: "Kazakh",
  // km: "Khmer",
  // ku: "Kurdish (Kurmanji)",
  // ky: "Kyrgyz",
  // lo: "Lao",
  // la: "Latin",
  // lv: "Latvian",
  // lt: "Lithuanian",
  // lb: "Luxembourgish",
  // mk: "Macedonian",
  // mg: "Malagasy",
  // ms: "Malay",
  // ml: "Malayalam",
  // mt: "Maltese",
  // mi: "Maori",
  // mr: "Marathi",
  // mn: "Mongolian",
  // my: "Myanmar (Burmese)",
  // ne: "Nepali",
  // no: "Norwegian",
  // ps: "Pashto",
  // pl: "Polish",
  // ma: "Punjabi",
  // ro: "Romanian",
  // sm: "Samoan",
  // gd: "Scots Gaelic",
  // sr: "Serbian",
  // st: "Sesotho",
  // sn: "Shona",
  // sd: "Sindhi",
  // si: "Sinhala",
  // sk: "Slovak",
  // sl: "Slovenian",
  // so: "Somali",
  // su: "Sundanese",
  // sw: "Swahili",
  // sv: "Swedish",
  // tg: "Tajik",
  // ta: "Tamil",
  // te: "Telugu",
  // tr: "Turkish",
  // uk: "Ukrainian",
  // ur: "Urdu",
  // uz: "Uzbek",
  // cy: "Welsh",
  // xh: "Xhosa",
  // yi: "Yiddish",
  // yo: "Yoruba",
  // zu: "Zulu"
}

// ---------------------------------


// ---- UI CONST --------------

const TAB_BAR_HEIGHT = 55;
const CONTENT_SPACING = 16;

// ----------------------------

// ---- COINGECKO API CONST ----------

const COINGECKO_API_VERSION = '3';
const COINGECKO_BASE = 'https://api.coingecko.com/api/';
const COINGECKO_PATH_PREFIX = `${COINGECKO_BASE}v${COINGECKO_API_VERSION}`

const ORDER = {
  GECKO_ASC: 'gecko_asc',
  GECKO_DESC: 'gecko_desc',
  MARKET_CAP_ASC: 'market_cap_asc',
  MARKET_CAP_DESC: 'market_cap_desc',
  VOLUME_ASC: 'volume_asc',
  VOLUME_DESC: 'volume_desc',
  COIN_NAME_ASC: 'coin_name_asc',
  COIN_NAME_DESC: 'coin_name_desc',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  HOUR_24_ASC: 'h24_change_asc',
  HOUR_24_DESC: 'h24_change_desc',
  TRUST_SCORE_DESC: 'trust_score_desc',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
  OPEN_INTEREST_BTC_ASC: 'open_interest_btc_asc',
  OPEN_INTEREST_BTC_DESC: 'open_interest_btc_desc',
  TRADE_VOLUME_24H_BTC_ASC: 'trade_volume_24h_btc_asc',
  TRADE_VOLUME_24H_BTC_DESC: 'trade_volume_24h_btc_desc',
} as const

const CURRENCY = {
  USD: 'usd',
  KRW: 'krw',
  EUR: 'eur'
}

const STATUS_UPDATE_CATEGORY = {
  GENERAL: 'general',
  MILESTONE: 'milestone',
  PARTNERSHIP: 'partnership',
  EXCHANGE_LISTING: 'exchange_listing',
  SOFTWARE_RELEASE: 'software_release',
  FUND_MOVEMENT: 'fund_movement',
  NEW_LISTINGS: 'new_listings',
  EVENT: 'event',
};

// -------------------------

// ---- COINGECKO API CONST ----------

const CTYPTOCOMPARE_API_VERSION = 'v2';
const CTYPTOCOMPARE_BASE = 'https://min-api.cryptocompare.com/data/';
const CTYPTOCOMPARE_PATH_PREFIX = `${CTYPTOCOMPARE_BASE}`

const CTYPTOCOMPARE_LANG = {
  EN: 'en',
  PT: 'pt', // 포르투갈어
}
// -----------------------------------


// ---- MDEDITOR CONST ---- 

const unicodes = {
  TEXT_BOLD:   "<b>"   ,  //"\u200B",
  TEXT_ITALIC: "<i>"   ,  //"\u2006",
  TEXT_MARKER: "<mark>",  //"\u2005",
  TEXT_LINK:   "<link>",  //"\uFEFF",
  UL_BULLET:   "\u2022",
}

const style = {
  BOLD: 'bold',
  ITALIC: 'italic',
  LINK: 'link'
}

const TYPES = {
  PARAGRAPH: "paragraph",
  HEADER: "header",
  LIST: "list",
  QUOTE: "quote",
  DELIMITER: "delimiter",
  EMBED: "embed",
  DUMMY: "dummy",
  IMAGE: "image",
  LISTSTYLE: {
    OL: 'ordered',
    UL: 'unordered'
  },
}

const ACTIONS = {
  ENTER: "enter",
  BACKSPACE: "backspace",
  TYPING: "typing",
  TOUCH: "touch",
  LINEPOP: "linepop",
  CHANGE_BLOCK_TYPE: 'change_block_type'
}

// ------------------------

export {
  APP_NAME,
  LANGUAGE_STORAGE_KEY,
  TRANSLATE_PREFIX,
  GOOGLE_PLATFROM_KEY,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  PAPAGO_PREFIX,
  TAB_ROUTE_NAME,
  LANGUAGES,
  CRYPTOCOMPARE_API_KEY,
  CTYPTOCOMPARE_API_VERSION,
  COINGECKO_PATH_PREFIX,
  ORDER,
  CTYPTOCOMPARE_PATH_PREFIX,
  CTYPTOCOMPARE_LANG,
  STATUS_UPDATE_CATEGORY,
  CURRENCY,
  CURRENCIES,
  TAB_BAR_HEIGHT,
  CONTENT_SPACING,
  unicodes,
  TYPES,
  ACTIONS,
  style
}