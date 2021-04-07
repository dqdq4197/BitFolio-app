import { types, unicodes } from './constants';



type Action =
  | { type: 'SET_COUNT'; count: number }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'SET_COLOR'; color: string }
  | { type: 'TOGGLE_GOOD' };

type ParagraphType = {
  type: string,
  payload: {
    text: string,
    styles: string[]
  }
}
type DelimiterType = {
  type: string,
  payload: {}
}
type EmbedType = {
  type: string,
  payload: {
    source: string,
    id: string,
    caption: string,
  }
}
type ListType = {
  type: string,
  payload: {
    style: "ordered" | "unordered",
    items: string[]
  }
}

type FocusStateType = {
  index: number,
  action: string
}
type SelectionType = {
  start: number,
  end: number
}

type initailState = {
  contentStorage: (ParagraphType | DelimiterType | EmbedType | ListType)[],
  focusState: FocusStateType,
  selection: SelectionType,
  isTextRendered: boolean,
}



const initialState:initailState = {
  contentStorage: [
    {
      type: types.PARAGRAPH,
      payload: {
        text: `${unicodes.TEXT_MARKER}hello${unicodes.TEXT_MARKER}${unicodes.TEXT_LINK}${unicodes.TEXT_ITALIC}${unicodes.TEXT_BOLD}hi${unicodes.TEXT_BOLD}${unicodes.TEXT_ITALIC}${unicodes.TEXT_LINK}how are ${unicodes.TEXT_BOLD}you${unicodes.TEXT_BOLD}?`,
        styles: [
          'NORMAL',
        ]
      }
    }, {
      type: types.LIST,
      payload: {
        items: ['fsd', '2index'],
        style: "unordered"
      }
    }, {
      type: types.LIST,
      payload: {
        items: ['fsd', '2index'],
        style: "ordered"
      }
    }, {
      type: types.DUMMY,
      payload: {
        text: "",
        styles: [
          'NORMAL',
        ]
      }
    }
  ],
  focusState: {
    index: 0,
    action: ''
  },
  selection: {
    start: 0,
    end: 0
  },
  isTextRendered: true
};