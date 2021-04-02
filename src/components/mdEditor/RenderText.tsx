import React, { useState, useEffect } from 'react';
import Text from '/components/common/Text';
import { unicodes } from './constants';
import reactStringReplace from 'react-string-replace';
import styled from 'styled-components/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
// import * as babel from 'babel-core';


interface RenderTextProps {
  paragraph: string,
}

interface TextProps {
  child: string
}

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
  let content = stringToLink(unicodes.TEXT_MARKER + child + unicodes.TEXT_MARKER);

  return <Marker fontXL>{content}</Marker>
}

const LinkText = ({ child }: TextProps) => {
  let content = stringToItalic(unicodes.TEXT_LINK + child + unicodes.TEXT_LINK);
  
  return <Text fontXL underline>{content}</Text>
}

const ItalicText = ({ child }: TextProps) => {
  let content = stringToBold(unicodes.TEXT_ITALIC + child + unicodes.TEXT_ITALIC);

  return <Text fontXL italic>{content}</Text>
}

const BoldText = ({ child }: TextProps) => {
  return <Text fontXL bold>{unicodes.TEXT_BOLD + child + unicodes.TEXT_BOLD}</Text>
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