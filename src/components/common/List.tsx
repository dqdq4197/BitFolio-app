import React, { PropsWithChildren } from 'react'
import { TouchableHighlightProps } from 'react-native'
import styled, { ThemeConsumer } from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

import Text from './Text'

const List = ({ children }: PropsWithChildren<unknown>) => {
  return <ListContainer>{children}</ListContainer>
}

interface RowProps extends TouchableHighlightProps {
  left: string
  right: string
  isLinked?: boolean
}

List.Row = ({ left, right, isLinked = false, ...rest }: RowProps) => {
  return (
    <ThemeConsumer>
      {theme => (
        <RowContainer {...rest} underlayColor={theme.base.underlayColor[100]}>
          <>
            <Text fontML bold>
              {left}
            </Text>
            <RightWrap>
              <Text bold color300>
                {right}
              </Text>
              {isLinked && (
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={20}
                  color={theme.base.text[200]}
                />
              )}
            </RightWrap>
          </>
        </RowContainer>
      )}
    </ThemeConsumer>
  )
}

export default List

const ListContainer = styled.View``
const RowContainer = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: 48px;
`

const RightWrap = styled.View`
  flex-direction: row;
  align-items: center;
`
