import React, { useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, FlatList, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import CircleCloseButton from '/components/common/CircleCloseButton';
import useSearchData from '/hooks/useSearchData';
import useSearchTranding from '/hooks/useSearchTranding';
import CoinItem from './CoinItem';
import useGlobalTheme from '/hooks/useGlobalTheme';
import SearchBar from './SearchBar';
import { SearchCoin } from '/lib/api/CoinGeckoReturnType';
import SearchEmptyView from './SearchEmptyView';
import SearchDefaultView from './SearchDefaultView';

type FormModalProps = {
  visible: boolean,
  setModalVisible: () => void;
}
const FormModalLayout = ({ visible, setModalVisible }: FormModalProps) => {

  const { theme } = useGlobalTheme();
  const [percentage, setPercentage] = useState(0);
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [query, setQuery] = useState('');
  const navigation = useNavigation();
  const { data } = useSearchData({ suspense: false });
  const { data: trandingData } = useSearchTranding({ suspense: false});


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent: { contentOffset } } = event;
    if(contentOffset.y < 3 && contentOffset.y >= -54) {
      setPercentage(-contentOffset.y * 2);
    }
  }

  const onModalClose = () => {
    setModalVisible();
    setPercentage(0);
  }

  const handleTouchEnd = () => {
    if(percentage >= 100) {
      setModalVisible();
      setPercentage(0);
    }
  }

  const handleItemPress = (id: string, symbol: string) => {
    setModalVisible();
    navigation.navigate('CoinDetail', { param: { id, symbol }, screen: 'Profile' })
  }

  const handleQueryChangeText = (text: string) => {
    setQuery(text);
    if(!data) return;
    if(text === '') {
      setCoins([]);
    } else {
      let filtered = data.coins.filter(
        coin => 
          coin.id.toLowerCase().includes(text.toLowerCase()) 
          || coin.name.toLowerCase().includes(text.toLowerCase()) 
          || coin.symbol.toLowerCase().includes(text.toLowerCase()) 
      )
      setCoins(filtered)
    }
  }

  if(!coins) return <></>
  return (
    <>
      <Modal 
        animationType='slide'
        visible={visible}
      > 
        <Container>
          <HaderView>
            <CircleCloseButton percentage={percentage} onModalClose={onModalClose}/>
          </HaderView>
          <FlatListWrap behavior="padding">
            <FlatList 
              data={coins}
              keyExtractor={(item, index) => item.id + index}
              contentContainerStyle={{
                backgroundColor: theme.base.background.surface,
                paddingHorizontal: 16
              }}
              ListHeaderComponent={
                <SearchBar 
                  onChangeText={handleQueryChangeText}
                  coinsLength={coins.length}
                />
              }
              renderItem={
                ({ item }) => 
                  <CoinItem 
                    item={item} 
                    onPressItem={handleItemPress}
                  />
              }
              getItemLayout={(_, index) => (
                { length: 60, offset: 60 * index, index }
              )}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                query 
                ? <SearchEmptyView query={query}/>
                : <SearchDefaultView 
                    data={trandingData}
                  />
              }
              stickyHeaderIndices={[0]}
              scrollEventThrottle={1}
              onScroll={handleScroll}
              onTouchEnd={handleTouchEnd}
            />
          </FlatListWrap>
        </Container>
      </Modal>
    </>
  )
}

export default FormModalLayout;

const Modal = styled.Modal``
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`
const HaderView = styled.View`
  align-items: flex-end;
  padding: 30px ${({ theme }) => theme.content.spacing} 0;
  margin-bottom: 16px;
`
const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`
const FlatListWrap = styled.KeyboardAvoidingView`
  flex: 1;
`