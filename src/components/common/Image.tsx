import React, { useState, useEffect } from 'react';
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import GlobalIndicator from './GlobalIndicator';

type ImageType = {
  uri: string,
  width: number,
  height: number,
  fullWidth?: boolean,
}

const { width: win } = Dimensions.get('window');

const CustomImage = ({ uri, width, height, fullWidth = false }: ImageType) => {
  const [updatedWidth, setUpdatedWidth] = useState(width);
  const [updatedHeight, setUpdatedHeight] = useState(height);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if(fullWidth) {
      let ratio = win / width;
      setUpdatedWidth(win);
      setUpdatedHeight(height * ratio)
    }
  }, [])
  const handleLoadEnd = () => {
    setIsLoaded(true);
  }

  return (
    <StyledImageWrap>
      <Image 
        source={{ uri }}
        onLoadEnd={handleLoadEnd}
        style={{
          width: updatedWidth,
          height: updatedHeight
        }}
        resizeMode='contain'
      />
      <GlobalIndicator isLoaded={isLoaded}/>
    </StyledImageWrap>
  )
}

export default CustomImage;

const StyledImageWrap = styled.View`

`