import React from 'react'
import styled from 'styled-components/native'

import Text from '/components/common/Text'
import SurfaceTopView from '/components/common/SurfaceTopView'

type HeaderProps = {
  title: string
  description: string
}

const FlatListHeader = ({ title, description }: HeaderProps) => {
  return (
    <Container>
      <Text bold color100 fontL>
        {title}
      </Text>
      <SurfaceTopView />
      <Text fontML margin="10px 0 0 0" lineHeight={20}>
        {description}
      </Text>
    </Container>
  )
}

export default FlatListHeader

const Container = styled.View`
  padding: ${({ theme }) =>
    `${theme.content.surfacePadding} ${theme.content.spacing}`};
`
