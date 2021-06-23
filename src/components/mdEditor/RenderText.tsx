import React, { useState, useLayoutEffect, createContext, useContext } from 'react';
import reactStringReplace from 'react-string-replace';
import styled, { css } from 'styled-components/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Text from '/components/common/Text';
import { unicodes, TYPES, ACTIONS } from '/lib/constant';
import { useMdEditorDispatch, useMdEditorState } from '/hooks/useMdEditorContext';
// import * as babel from 'babel-core';


interface RenderTextProps {
  type: string,
  children: string,
  index:number
}

interface TextProps {
  child: string
}


const TypeContext = createContext<string | null>(null);

const makeRegex = (unicode:string) => {
  return new RegExp(`${unicode}(.*?)${unicode}`, "g");
}

const stringToMarker = (child: string) => {
  return reactStringReplace(child, makeRegex(unicodes.TEXT_MARKER), (match, i) => (
    <MarkerText key={uuidv4()} child={match} />
  ))
}
const stringToLink = (child:string) => {
  return reactStringReplace(child, makeRegex(unicodes.TEXT_LINK), (match, i) => (
    <LinkText key={uuidv4()} child={match} />
  ))
}
const stringToItalic = (child: string) => {
  return reactStringReplace(child, makeRegex(unicodes.TEXT_ITALIC), (match, i) => (
    <ItalicText key={uuidv4()} child={match} />
  ))
}
const stringToBold = (child: string) => {
  return reactStringReplace(child, makeRegex(unicodes.TEXT_BOLD), (match, i) => (
    <BoldText key={uuidv4()} child={match} />
  ))
}

const MarkerText = ({ child }: TextProps) => {
  const type = useContext(TypeContext);
  let content = stringToLink(unicodes.TEXT_MARKER + child + unicodes.TEXT_MARKER);

  return <Marker type={type as string}>{content}</Marker>
}

const LinkText = ({ child }: TextProps) => {
  const type = useContext(TypeContext);
  let content = stringToItalic(unicodes.TEXT_LINK + child + unicodes.TEXT_LINK);
  
  return <DefaultText type={type as string} underline>{content}</DefaultText>
}

const ItalicText = ({ child }: TextProps) => {
  const type = useContext(TypeContext);
  let content = stringToBold(unicodes.TEXT_ITALIC + child + unicodes.TEXT_ITALIC);

  return <DefaultText type={type as string} italic>{content}</DefaultText>
}

const BoldText = ({ child }: TextProps) => {
  const type = useContext(TypeContext);
  return <DefaultText type={type as string} bold>{unicodes.TEXT_BOLD + child + unicodes.TEXT_BOLD}</DefaultText>
}


// priority:
// link > code > i > b  
const RenderText = ({ type, children, index }: RenderTextProps) => {
  
  const [content, setContent] = useState<React.ReactNodeArray | null>(null)
  const { focusState } = useMdEditorState();
  const handlers = useMdEditorDispatch();

  useLayoutEffect(() => {
    let i = 0;
    let context = stringToMarker(children);
    const { action } = focusState;
    const { ENTER, BACKSPACE, LINEPOP } = ACTIONS;
    // console.log(index, ':',type);
    while(i++ < 3) {
      context = context.map(text => {
        if(typeof text === 'string') {
          if(i === 1) 
            return stringToLink(text)
          if(i === 2)
            return stringToItalic(text)
          if(i === 3) {
            return stringToBold(text)
          }
        } else {
          return text
        }
      })
      context = context.flat();
    }
    setContent(context);
    // console.log(index,children)

    if(action === ENTER || action === BACKSPACE || action === LINEPOP)
      handlers.setIsTextRendered(true);
  }, [children, index])
  
  
  return (
    <TypeContext.Provider value={type}>
      <DefaultText type={type}>
        { content }
      </DefaultText>
    </TypeContext.Provider>

  )
}

export default RenderText;

interface TextWrapProps {
  type: string,
}
const DefaultText = styled(Text)`
  ${(props: TextWrapProps) => {
    switch(props.type) {
      case TYPES.HEADER:
        return StyledHeader;
      default:
        return StyleParagraph;
    }
  }}
`

const StyleParagraph = css`
  font-size: ${({theme}) => theme.size.font_l};
`

const StyledHeader = css`
  font-size: ${({theme}) => theme.size.font_xxl};
  font-weight: bold;
`

const Marker = styled(DefaultText)`
  background-color: ${({theme}) => theme.colors.green[900]};
`