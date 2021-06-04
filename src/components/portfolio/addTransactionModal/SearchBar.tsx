import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';

type SearchBarProps = {
  onChangeText: (text:string) => void;
  coinsLength: number;
}
const SearchBar = ({ onChangeText, coinsLength }: SearchBarProps) => {

  const { scheme, theme } = useGlobalTheme();
  return (
    <Container>
      <Ionicons 
        name="search-sharp" 
        size={24} 
        color={theme.base.text[200]} 
      />
      <TextInput 
        keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
        onChangeText={onChangeText}
        placeholder={`${coinsLength}개의 코인 검색`}
        spellCheck={false}
        scrollEnabled={false}
      />
    </Container>
  )
}

export default SearchBar;


const Container = styled.View`
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.base.background[300]};
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.border.l};
  margin-bottom: 30px;
  flex-direction: row;
`
const TextInput = styled.TextInput`
  margin-left: 10px;
  flex: 1;
  font-size: ${({ theme }) => theme.size.font_ml};
  color: ${({ theme }) => theme.base.text[100]};
`