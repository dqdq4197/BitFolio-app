
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
  DUMMY: "dummy"
}

const actions = {
  ENTER: "enter",
  BACKSPACE: "backspace",
  TYPING: "typing",
  TOUCH: "touch",
  LINEPOP: "linepop"
}

export {
  unicodes,
  types,
  actions
}