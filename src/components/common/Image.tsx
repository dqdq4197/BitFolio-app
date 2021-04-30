import React, { useState } from 'react';
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import GlobalIndicator from './GlobalIndicator';

type ImageType = {
  uri: string,
  width: number,
  height: number,
}

const window = Dimensions.get('window');

const CustomImage = ({ uri, width, height }: ImageType) => {
  const ratio = window.width / width;
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadEnd = () => {
    setIsLoaded(true);
  }

  return (
    <StyledImageWrap>
      <Image 
        source={{ uri }}
        onLoadEnd={handleLoadEnd}
        style={{
          width: window.width,
          height: height * ratio
        }}
        resizeMode='contain'
        blurRadius={ 2 }
      />
      <GlobalIndicator isLoaded={isLoaded}/>
    </StyledImageWrap>
  )
}

export default CustomImage;

const StyledImageWrap = styled.View`
  flex: 1;
`