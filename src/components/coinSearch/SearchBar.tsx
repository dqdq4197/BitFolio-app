import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import SurfaceTopView from '/components/common/SurfaceTopView';

type SearchBarProps = {
  onChangeText: (text:string) => void;
  coinsLength: number;
}
const SearchBar = ({ onChangeText, coinsLength }: SearchBarProps) => {

  const { t } = useTranslation(); 
  const { scheme, theme } = useGlobalTheme();
  return (
    <>
      <SurfaceTopView />
      <Container>
        <SearchBarWrap>
          <Ionicons 
            name="search-sharp" 
            size={24} 
            color={theme.base.text[200]} 
          />
          <TextInput 
            autoFocus
            keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
            onChangeText={onChangeText}
            placeholder={t('search.coin name or symbol search')}
            spellCheck={false}
            scrollEnabled={false}
          />
        </SearchBarWrap>
      </Container>
    </>
  )
}

export default SearchBar;


const Container = styled.View`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding-bottom: ${({ theme }) => theme.content.spacing};
`
const SearchBarWrap = styled.View`
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.base.background[300]};
  padding: 10px 16px;
  flex-direction: row;
  border-radius: ${({ theme }) => theme.border.l};
`
const TextInput = styled.TextInput`
  margin-left: 10px;
  flex: 1;
  font-size: ${({ theme }) => theme.size.font_ml};
  color: ${({ theme }) => theme.base.text[100]};
`