import React from 'react';
import styled from 'styled-components/native';
import Text from '/components/common/Text';


const ImageBlock = () => {

  return (
    <StyledDelimiter> 
      <DelimiterText fontXXXL>
        * * *
      </DelimiterText>
    </StyledDelimiter>
  )
}

export default ImageBlock;

const StyledDelimiter = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

const DelimiterText = styled(Text)`
  height: 30px;
  font-size: 36px;
`
