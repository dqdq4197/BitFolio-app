import React, { useReducer, useContext, createContext } from 'react';
import { types, unicodes, actions } from '/lib/constant';


export type ParagraphType = {
  type: string,
  payload: {
    text: string,
  }
}
export interface QuoteType extends ParagraphType {}
export interface HeaderType extends ParagraphType {}
export type DelimiterType = {
  type: string,
  payload: {}
}
export type EmbedType = {
  type: string,
  payload: {
    source: string,
    id: string,
    caption: string,
  }
}
export type ListType = {
  type: string,
  payload: {
    style: "ordered" | "unordered",
    items: string[]
  }
}

export type FocusStateType = {
  index: number,
  action: string
}
export type SelectionType = {
  start: number,
  end: number
}

export type ContentsType = ParagraphType | DelimiterType | EmbedType | ListType | HeaderType;

type Action =
  | { type: 'UPDATE_CURRENT_LINE'; context: ContentsType; focusIndex: number }
  | { type: 'INSERT_NEWLINE_AFTER'; context: ContentsType[]; focusIndex: number }
  | { type: 'REMOVE_PREVIOUS_LINE'; focusIndex: number }
  | { type: 'DIVIDE_CURRENT_LINE_AND_NEWLINE'; context: ContentsType[], focusIndex: number }
  | { type: 'UPDATE_FOCUS_STATE'; focusIndex: number, action: string }
  | { type: 'UPDATE_SELECTION'; selection: SelectionType }  
  | { type: 'REMOVE_CURRENT_LINE'; focusIndex: number }
  | { type: 'MERGE_PREVIOUS_LINE_WITH_CURRENT_LINE'; context: ContentsType[]; focusIndex: number }
  | { type: 'MERGE_PREVIOUS_LINE_WITH_NEXT_LINE'; context: ListType; focusIndex: number }
  | { type: 'MERGE_NEXT_LINE_WITH_CURRENT_LINE'; context: ListType[]; focusIndex: number }
  | { type: 'FOCUS_ACTION_RESET', focusIndex?: number }
  | { type: 'SET_IS_TEXT_RENDERED', isRendered: boolean }
  | { type: 'UPDATE_LIST_FOCUS_INDEX', focusIndex: number }
  | { type: 'UPDATE_LIST_CURRENT_LINE', contentIndex: number, focusIndex: number }
  | { type: 'UPDATE_LIST_SELECTION', selection: SelectionType }

type InitailState = {
  contentStorage: ContentsType[],
  focusState: FocusStateType,
  selection: SelectionType,
  listFocusIndex: number,
  isTextRendered: boolean,
}


const initialState:InitailState = {
  contentStorage: [
    {
      type: types.PARAGRAPH,
      payload: {
        text: `${unicodes.TEXT_MARKER}hello${unicodes.TEXT_MARKER}${unicodes.TEXT_LINK}${unicodes.TEXT_ITALIC}${unicodes.TEXT_BOLD}hi${unicodes.TEXT_BOLD}${unicodes.TEXT_ITALIC}${unicodes.TEXT_LINK}how are ${unicodes.TEXT_BOLD}you${unicodes.TEXT_BOLD}?`,
      }
    }
    , {
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
    }
    , {
      type: types.DUMMY,
      payload: {
        text: "dummy"
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
  listFocusIndex: 0,
  isTextRendered: true
};

function mdEditorReducer(state: InitailState, action:Action): InitailState {
  switch (action.type) {
    case "UPDATE_CURRENT_LINE":
      return {
        ...state,
        contentStorage: [
          ...state.contentStorage.slice(0, action.focusIndex),
          action.context,
          ...state.contentStorage.slice(action.focusIndex + 1, state.contentStorage.length)
        ]
      }
    case "INSERT_NEWLINE_AFTER":
      return {
        ...state,
        contentStorage: [
          ...state.contentStorage.slice(0, action.focusIndex + 1),
          ...action.context,
          ...state.contentStorage.slice(action.focusIndex + 1, state.contentStorage.length)
        ]
      }
    case "REMOVE_PREVIOUS_LINE":
      return {
        ...state,
        contentStorage: [
          ...state.contentStorage.slice(0, action.focusIndex - 1),
          ...state.contentStorage.slice(action.focusIndex, state.contentStorage.length)
        ]
      }
    case "DIVIDE_CURRENT_LINE_AND_NEWLINE":
      return {
        ...state,
        contentStorage: [
          ...state.contentStorage.slice(0, action.focusIndex),
          ...action.context,
          ...state.contentStorage.slice(action.focusIndex + 1, state.contentStorage.length)
        ]
      }
    case "REMOVE_CURRENT_LINE":
      return {
        ...state,
        contentStorage: [
          ...state.contentStorage.slice(0, action.focusIndex),
          ...state.contentStorage.slice(action.focusIndex + 1, state.contentStorage.length)
        ]
      }
    case "MERGE_PREVIOUS_LINE_WITH_CURRENT_LINE":
      return {
        ...state,
        contentStorage: [
          ...state.contentStorage.slice(0, action.focusIndex - 1),
          ...action.context,
          ...state.contentStorage.slice(action.focusIndex + 1, state.contentStorage.length)
        ]
      }
    case "MERGE_PREVIOUS_LINE_WITH_NEXT_LINE":
      return {
        ...state,
        contentStorage: [
          ...state.contentStorage.slice(0, action.focusIndex - 1),
          action.context,
          ...state.contentStorage.slice(action.focusIndex + 2, state.contentStorage.length)
        ]
      }
    case "MERGE_NEXT_LINE_WITH_CURRENT_LINE":
      return {
        ...state,
        contentStorage: [
          ...state.contentStorage.slice(0, action.focusIndex),
          ...action.context,
          ...state.contentStorage.slice(action.focusIndex + 2, state.contentStorage.length)
        ]
      }
    case "UPDATE_FOCUS_STATE":
      return {
        ...state,
        focusState: {
          index: action.focusIndex,
          action: action.action
        }
      }
    case "FOCUS_ACTION_RESET":
      if(action.focusIndex !== undefined) {
        return {
          ...state,
          focusState: {
            index: action.focusIndex,
            action: actions.TYPING
          }
        }
      } else if(state.focusState.action !== actions.TYPING) {
        return {
          ...state,
          focusState: {
            ...state.focusState,
            action: actions.TYPING
          }
        }
      } else {
        return {
          ...state
        }
      }
    case "UPDATE_SELECTION":
      return {
        ...state,
        selection: action.selection
      }
    case "SET_IS_TEXT_RENDERED":
      return {
        ...state,
        isTextRendered: action.isRendered
      }
    case "UPDATE_LIST_FOCUS_INDEX":
      return {
        ...state,
        listFocusIndex: action.focusIndex
      }
    default:
      throw new Error(`Unhandled action type: `);
  }
}

type ProviderProps = {
  children: React.ReactChild;
}

type HandlersType = {
  updateCurrentLine: (context: ContentsType, focusIndex: number) => void,
  insertNewLineAfter: (context: ContentsType[], focusIndex: number) => void,
  removePreviousLine: (focusIndex: number) => void,
  divideCurrentLineAndNewLine: (context: ContentsType[], focusIndex: number) => void,
  removeCurrentLine: (focusIndex: number) => void,
  mergePreviousLineWithCurrentLine: (context: ContentsType[], focusIndex: number) => void,
  mergePreviousLineWithNextLine: (context: ListType, focusIndex: number) => void,
  mergeNextLineWithCurrentLine: (context: ListType[], focusIndex: number) => void,
  updateFocusState: (focusIndex: number, action: string) => void,
  focusActionReset: (focusIndex?: number) => void,
  updateSelection: (selection: SelectionType) => void,
  setIsTextRendered: (isRendered: boolean) => void,
  updateListFocusIndex: (focusIndex: number) => void,
}

const MdEditorStateContext = createContext<InitailState | undefined>(undefined);
const MdEditorDispatchHandlerContext = createContext<HandlersType | undefined>(undefined);

export function MdEditorProvider({ children }:ProviderProps) {
  const [state, dispatch] = useReducer(mdEditorReducer, initialState);

  const handlers = {
    updateCurrentLine: (context: ContentsType, focusIndex: number) => {
      dispatch({
        type: "UPDATE_CURRENT_LINE",
        context,
        focusIndex
      })
    },
    insertNewLineAfter: (context: ContentsType[], focusIndex: number) => {
      dispatch({
        type: "INSERT_NEWLINE_AFTER",
        context,
        focusIndex
      })
    },
    removePreviousLine: (focusIndex: number) => {
      dispatch({
        type: "REMOVE_PREVIOUS_LINE",
        focusIndex
      })
    },
    divideCurrentLineAndNewLine: (context: ContentsType[], focusIndex: number) => {
      dispatch({
        type: "DIVIDE_CURRENT_LINE_AND_NEWLINE",
        context,
        focusIndex
      })
    },
    removeCurrentLine: (focusIndex: number) => {
      dispatch({
        type: "REMOVE_CURRENT_LINE",
        focusIndex
      })
    },
    mergePreviousLineWithCurrentLine: (context: ContentsType[], focusIndex: number) => {
      dispatch({
        type: "MERGE_PREVIOUS_LINE_WITH_CURRENT_LINE",
        context,
        focusIndex
      })
    },
    mergePreviousLineWithNextLine: (context: ListType, focusIndex: number) => {
      dispatch({
        type: "MERGE_PREVIOUS_LINE_WITH_NEXT_LINE",
        context,
        focusIndex
      })
    },
    mergeNextLineWithCurrentLine: (context: ListType[], focusIndex: number) => {
      dispatch({
        type: "MERGE_NEXT_LINE_WITH_CURRENT_LINE",
        context,
        focusIndex
      })
    },
    updateFocusState: (focusIndex: number, action: string) => {
      dispatch({
        type: "UPDATE_FOCUS_STATE",
        focusIndex,
        action
      })
    },
    focusActionReset: (focusIndex?: number) => {
      dispatch({
        type: "FOCUS_ACTION_RESET",
        focusIndex
      })
    },
    updateSelection: (selection: SelectionType) => {
      dispatch({
        type: "UPDATE_SELECTION",
        selection
      })
    },
    setIsTextRendered: (isRendered: boolean) => {
      dispatch({
        type: "SET_IS_TEXT_RENDERED",
        isRendered
      })
    },
    updateListFocusIndex: (focusIndex: number) => {
      dispatch({
        type: "UPDATE_LIST_FOCUS_INDEX",
        focusIndex
      })
    },
  }
  
  return (
    <MdEditorStateContext.Provider value={state}>
      <MdEditorDispatchHandlerContext.Provider value={handlers}>
        {children}
      </MdEditorDispatchHandlerContext.Provider>
    </MdEditorStateContext.Provider>
  )
}

export function useMdEditorState() {
  const context = useContext(MdEditorStateContext);
  if(!context) {
    throw new Error(`MdEditorStateContext is undefined`);
  }
  return context;
}

export function useMdEditorDispatch() {
  const context = useContext(MdEditorDispatchHandlerContext);
  if(!context) {
    throw new Error(`MdEditorDispatchContext is undefined`);
  }
  return context
}