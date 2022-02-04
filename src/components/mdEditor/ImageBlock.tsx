import React from 'react';
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
      width={150}
      height={100}
      fullWidth
    />
  )
}

export default ImageBlock;