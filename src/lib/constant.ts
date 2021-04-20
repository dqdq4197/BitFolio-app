


const COINGECKO_PATH_PREFIX = 'https://api.coingecko.com/api/v3'
const TAB_BAR_HEIGHT = 55;
const CONTENT_SPACING = 16;

// ---- mdEditor const ---- 

const unicodes = {
  TEXT_BOLD:   "<b>"   ,  //"\u200B",
  TEXT_ITALIC: "<i>"   ,  //"\u2006",
  TEXT_MARKER: "<mark>",  //"\u2005",
  TEXT_LINK:   "<link>",  //"\uFEFF",
  UL_BULLET:   "\u2022",
}

const types = {
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

const actions = {
  ENTER: "enter",
  BACKSPACE: "backspace",
  TYPING: "typing",
  TOUCH: "touch",
  LINEPOP: "linepop"
}

// ------------------------

export {
  COINGECKO_PATH_PREFIX,
  TAB_BAR_HEIGHT,
  CONTENT_SPACING,
  unicodes,
  types,
  actions
}