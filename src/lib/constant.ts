
// ----- BASE CONST ----------------

const APP_NAME = 'bitfolio';
const CRYPTOCOMPARE_API_KEY = 'c95d5d7549c69950d894e2821ec15798d91f994e4ff0a5d360e78fbd46b9ca37';
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

const CTYPTOCOMPARE_API_VERSION = '3';
const CTYPTOCOMPARE_BASE = 'https://min-api.cryptocompare.com/data/';
const CTYPTOCOMPARE_PATH_PREFIX = `${CTYPTOCOMPARE_BASE}v${CTYPTOCOMPARE_API_VERSION}`

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
  LINEPOP: "linepop"
}

// ------------------------

export {
  APP_NAME,
  CRYPTOCOMPARE_API_KEY,
  COINGECKO_PATH_PREFIX,
  ORDER,
  CTYPTOCOMPARE_PATH_PREFIX,
  CTYPTOCOMPARE_LANG,
  STATUS_UPDATE_CATEGORY,
  CURRENCY,
  TAB_BAR_HEIGHT,
  CONTENT_SPACING,
  unicodes,
  TYPES,
  ACTIONS,
  style
}