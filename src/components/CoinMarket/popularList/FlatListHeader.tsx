import React from 'react';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';


type HeaderProps = {
  title: string,
  description: string
}

const FlatListHeader = ({ title, description }: HeaderProps) => {
  return (
    <SurfaceWrap title={title} isMain >
      <Text fontML margin="10px 0 0 0" lineHeight={20}>
        { description }
      </Text>
    </SurfaceWrap>
  )
}

export default FlatListHeader;

const Container = styled.View`
  
`