import React from 'react';
import styled from 'styled-components/native';
import Image from '/components/common/Image';

type ImageBlockProps = {
  index: number,
  uri: string,
  width: number,
  height: number
}
const ImageBlock = ({ index, uri, width, height }: ImageBlockProps) => {

  return (
    <Image 
      uri={uri}
      width={width}
      height={height}
    />
  )
}

export default ImageBlock;