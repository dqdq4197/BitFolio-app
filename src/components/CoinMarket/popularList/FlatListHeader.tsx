import React from 'react';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import SurfaceTopView from '/components/common/SurfaceTopView';

type HeaderProps = {
  title: string,
  description: string
}

const FlatListHeader = ({ title, description }: HeaderProps) => {

  return (
    <SurfaceWrap 
      title={title} 
      marginBottomZero
      marginTopZero
    >
      <SurfaceTopView />
      <Text fontML margin="10px 0 0 0" lineHeight={20}>
        { description }
      </Text>
    </SurfaceWrap>
  )
}

export default FlatListHeader;