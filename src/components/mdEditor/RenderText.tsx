import React, { useState, useEffect } from 'react';
import Text from '/components/common/Text';
import {
  TEXT_BOLD_UNICODE,
  TEXT_ITALIC_UNICODE,
  TEXT_LINK_UNICODE,
  TEXT_MARKER_UNICODE
} from './constants';
import reactStringReplace from 'react-string-replace';
import styled from 'styled-components/native';
// import * as babel from 'babel-core';


interface RenderTextProps {
  paragraph: string,
}

const makeRegex = (unicode:string) => {
  return new RegExp(`${unicode}(.*?)${unicode}`, "g");
}

const stringToMarker = (child: string) => {
  return reactStringReplace(child, makeRegex(TEXT_MARKER_UNICODE), (match, i) => (
    <MarkerText child={match} />
  ))
}
const stringToLink = (child:string) => {
  return reactStringReplace(child, makeRegex(TEXT_LINK_UNICODE), (match, i) => (
    <LinkText child={match} />
  ))
}
const stringToItalic = (child: string) => {
  return reactStringReplace(child, makeRegex(TEXT_ITALIC_UNICODE), (match, i) => (
    <ItalicText child={match} />
  ))
}
const stringToBold = (child: string) => {
  return reactStringReplace(child, makeRegex(TEXT_BOLD_UNICODE), (match, i) => (
    <BoldText child={match} />
  ))
}



const MarkerText = ({ child }: any) => {
  let content = stringToLink(child);

  return <Marker fontXL>{content}</Marker>
}

const LinkText = ({ child }: any) => {
  let content = stringToItalic(child);
  
  return <Text fontXL underline>{content}</Text>
}

const ItalicText = ({ child }: any) => {
  let content = stringToBold(child);

  return <Text fontXL italic>{content}</Text>
}

const BoldText = ({ child }: any) => {
  return <Text fontXL bold>{child}</Text>
}

// todo 
// key값 넣기(uuid), 

// priority:
// link > code > i > b  
const RenderText = ({ paragraph }: RenderTextProps) => {
  
  const [content, setContent] = useState<React.ReactNodeArray | null>(null)


  useEffect(() => {
    let i = 0;
    let context = stringToMarker(paragraph);

    while(i++ < 3) {
      context = context.map(res => {
        if(typeof res === 'string') {
          if(i === 1) 
            return stringToLink(res)
          if(i === 2)
            return stringToItalic(res)
          if(i === 3) {
            return stringToBold(res)
          }
        } else {
          return res
        }
      })
      context = context.flat();
    }

    setContent(context);
  }, [paragraph])

  
  
  return (
    <Text fontXL>
      {content}
    </Text>
  )
}

export default RenderText;


const Marker = styled(Text)`
  background-color: ${({theme}) => theme.colors.green[900]};
`