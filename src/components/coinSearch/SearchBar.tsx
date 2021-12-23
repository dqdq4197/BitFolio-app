import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import SurfaceTopView from '/components/common/SurfaceTopView';

type SearchBarProps = {
  isLoading: boolean
  onQueryChange: (text:string) => void
  query: string
  coinsLength?: number
  onRemoveQuery: () => void
}
const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ isLoading, onQueryChange, query, coinsLength, onRemoveQuery }, ref) => {

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
          <CustomTextInput 
            ref={ref}
            editable={!isLoading}
            keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
            onChangeText={onQueryChange}
            value={query}
            placeholder={t('search.coin name or symbol search')}
            placeholderTextColor={theme.base.text[400]}
            spellCheck={false}
            scrollEnabled={false}
          />
          { query.length 
            ? <RemoveIconWrap
                activeOpacity={0.6}
                onPress={onRemoveQuery}
                hitSlop={{
                  top: 10,
                  right: 16,
                  bottom: 10
                }}
              >
                <MaterialIcons 
                  name="cancel" 
                  size={18} 
                  color={theme.base.text[300]} 
                />
              </RemoveIconWrap>
            : null
          }
        </SearchBarWrap>
      </Container>
    </>
  )
})

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
  align-items: center;
`
const CustomTextInput = styled.TextInput`
  margin-left: 10px;
  flex: 1;
  font-size: ${({ theme }) => theme.size.font_ml};
  color: ${({ theme }) => theme.base.text[100]};
`
const RemoveIconWrap = styled.TouchableOpacity`
  width: 20px;
  margin-left: 5px;
`