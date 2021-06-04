import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Text from '/components/common/Text';
import useGlobalTheme from '/hooks/useGlobalTheme';


type EmptyViewProps = {
  query: string,
}
const SearchEmptyView = ({ query }: EmptyViewProps) => {

  const { theme } = useGlobalTheme();

  return (
    <Container>
      <Ionicons 
        name="search-sharp" 
        size={28} 
        color={theme.base.text[200]} 
      />
      <Text center fontX margin="10px 0 0 0">
        해당 결과 없음 '{query}'
      </Text>
      <Text center fontML margin="10px 0 0 0">
        검색에 일치하는 항목을 찾을 수 없습니다. 
      </Text>
      <Text center fontML margin="2px 0 0 0">
        다른 용어로 다시 시도하십시오.
      </Text>
    </Container>
  )
}

export default SearchEmptyView;

const Container = styled.View`
  padding: 0 ${({ theme }) => theme.content.spacing};
  align-items: center;
`