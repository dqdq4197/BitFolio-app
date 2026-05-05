import { PropsWithChildren } from 'react'
import { View, TouchableHighlightProps } from 'react-native'
import styled, { ThemeConsumer, useTheme } from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

import Text from './text'

const List = ({ children }: PropsWithChildren<unknown>) => {
  return <ListContainer>{children}</ListContainer>
}

interface RowProps extends TouchableHighlightProps {
  left: string
  right: string
  isLinked?: boolean
}

function ListRow({ left, right, isLinked = false, ...rest }: RowProps) {
  const theme = useTheme()

  return (
    <RowContainer {...rest} underlayColor={theme.base.underlayColor[100]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
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
      </View>
    </RowContainer>
  )
}

export default Object.assign(List, { Row: ListRow })

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
