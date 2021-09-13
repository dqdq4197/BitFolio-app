import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Text from '/components/common/Text';
import useGlobalTheme from '/hooks/useGlobalTheme';


type EmptyViewProps = {
  query: string,
}
const EmptyView = ({ query }: EmptyViewProps) => {

  const { theme } = useGlobalTheme();
  const { t } = useTranslation();

  return (
    <Container>
      <Ionicons 
        name="search-sharp" 
        size={28} 
        color={theme.base.text[200]} 
      />
      <Text center fontX margin="10px 0 0 0">
        { t(`search.no results for`) + ` '${ query }'` }
      </Text>
      <Text center fontML margin="10px 0 0 0">
        { t(`search.we couldn't find anything matching your search`) }
      </Text>
      <Text center fontML margin="2px 0 0 0">
        { t(`search.try again with a different term`) }
      </Text>
    </Container>
  )
}

export default EmptyView;

const Container = styled.View`
  padding: 30px ${({ theme }) => theme.content.spacing} 0;
  align-items: center;
`