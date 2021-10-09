import React, { forwardRef, useMemo, MutableRefObject, useCallback, useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/native';
import { LayoutAnimation, UIManager, Platform } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import { FontAwesome5, FontAwesome, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { TransactionType, removeTransaction } from '/store/transaction';
import { changeCoinState } from '/store/portfolio';
import useLocales from '/hooks/useLocales';
import Modal from '/components/common/BottomSheetModal';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppDispatch } from '/hooks/useRedux';
import { digitToFixed } from '/lib/utils';
import EditButton from './EditTransactionButton';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

type DetailProps = {
  data: TransactionType
  currentPrice: { [key: string]: number }
  symbol: string
  coinId: string
  portfolioId: string
  name: string
  image: string
  transactionId: string
  wantChangeCoinState: boolean
  onDismiss: () => void
}

const TransactionDetailModal = forwardRef<BottomSheetModal, DetailProps>(
  ({
    data,
    currentPrice,
    symbol,
    coinId,
    portfolioId,
    name,
    image,
    transactionId,
    wantChangeCoinState,
    onDismiss
  }, ref) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currency, language } = useLocales();
  const { theme } = useGlobalTheme();
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
  
  const snapPoints = useMemo(() => { 
    return data.type === 'transfer' ? [360, '85%'] : ['85%'];
  }, [data]);
  
  const changePrice = useMemo(() => { 
    if(currentPrice && data) {
      return currentPrice[currency] * data.quantity - (data.pricePerCoin[currency] * data.quantity + data.fee[currency])
    } else {
      return 0
    }
  }, [data, currentPrice, currency])

  const changePercentage = useMemo(() => { 
    if(currentPrice && data) {
      const cost = data.pricePerCoin[currency] * data.quantity + data.fee[currency];
      const currentValue = currentPrice[currency] * data.quantity;
      const percentage = (currentValue - cost) / cost * 100;

      return digitToFixed(percentage ?? 0, 2)
    } else {
      return 0
    }
  }, [data, currentPrice, currency])

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent;
    
    if(y > 70 && currentSnapPoint === 0) {
      (ref as MutableRefObject<any | null>)?.current.snapTo(1);
    } else if(y < -40 && currentSnapPoint === 1) {
      (ref as MutableRefObject<any | null>)?.current.snapTo(0);
    }
  }

  const handleSnapPointChange = useCallback((index: number) => setCurrentSnapPoint(index), [])
 
  const handleRemoveButtonPress = () => {
    Alert.alert(              
      t(`coinDetail.remove transaction?`),            
      t(`coinDetail.you can't undo this action`),                        
      [                              
        {
          text: t(`common.cancel`),                              
          onPress: () => console.log("cancel transaction remove"),
          style: "cancel"
        },
        { 
          text: t(`common.remove`), 
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
            );
            if(wantChangeCoinState) {
              dispatch(
                changeCoinState({
                  coinId,
                  portfolioId,
                  state: 'watching'
                })
              )
            }
            dispatch(removeTransaction({ id: data.id }));
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <Modal
      key="transaction detail"
      ref={ref}
      snapPoints={snapPoints}
      onChange={handleSnapPointChange}
      onDismiss={onDismiss}
    >
      <ScrollView 
        onScroll={
          data?.type === 'transfer' && data?.notes ? handleScroll : undefined
        }
        scrollEventThrottle={16}
      >
        <>
        <SurfaceWrap
          title={ t(`coinDetail.transaction details`) }
          transparent
          marginTopZero
          paddingBottomZero
        >
          <TableWrap>
            <Row>
              <SubTitleWrap>
                <IconWrap>
                <Feather name="type" size={14} color={theme.base.text[200]} />
                </IconWrap>
                <Text fontML>
                  { t(`common.type`) }
                </Text>
              </SubTitleWrap>
              <Text fontML color100 bold>
                { t(`common.${data.type === 'transfer' ? data.transferType : data.type}`) }
              </Text>
            </Row>
            <Row>
              <SubTitleWrap>
                <IconWrap>
                  <MaterialIcons name="date-range" size={14} color={theme.base.text[200]} />
                </IconWrap>
                <Text fontML>
                  { t(`common.date`) }
                </Text>
              </SubTitleWrap>
              <Text fontML color100 bold>
                { format(new Date(data.date), 'Pp', {
                  locale: language === 'en' ? enUS : ko
                }) }
              </Text>
            </Row>
            <Row>
              <SubTitleWrap>
                <IconWrap>
                  <FontAwesome5 name="coins" size={12} color={theme.base.text[200]} />
                </IconWrap>
                <Text fontML>
                  { t(`common.quantity`) }
                </Text>
              </SubTitleWrap>
              <Text fontML color100 bold>
                { data.quantity } { symbol.toUpperCase() }
              </Text>
            </Row>
            { data.type !== 'transfer' 
              && <Row>
                <SubTitleWrap>
                  <IconWrap>
                    <FontAwesome name="dollar" size={14} color={theme.base.text[200]} />
                  </IconWrap>
                  <Text fontML>
                    { t(`common.price per coin`) }
                  </Text>
                </SubTitleWrap>
                <Text fontML color100 bold>
                  { currencyFormat({
                    value: data.pricePerCoin[currency],
                    prefix: getCurrencySymbol(currency)
                  }) }
                </Text>
              </Row>
            }
            <Row>
              <SubTitleWrap>
                <IconWrap>
                  <FontAwesome name="dollar" size={14} color={theme.base.text[200]} />
                </IconWrap>
                <Text fontML>
                  { t(`common.fee`) }
                </Text>
              </SubTitleWrap>
              <Text fontML color100 bold>
                { currencyFormat({
                  value: data.fee[currency],
                  prefix: getCurrencySymbol(currency)
                }) }
              </Text>
            </Row>
            { data.type !== 'transfer' 
              && <Row>
                <SubTitleWrap>
                  <IconWrap>
                    <FontAwesome name="dollar" size={14} color={theme.base.text[200]} />
                  </IconWrap>
                  <Text fontML>
                    { t(`common.cost`) } ({ t(`common.fees included`) })
                  </Text>
                </SubTitleWrap>
                <Text fontML color100 bold>
                  { currencyFormat({
                    value: data.quantity * data.pricePerCoin[currency] + data.fee[currency],
                    prefix: getCurrencySymbol(currency)
                  }) }
                </Text>
              </Row>
            }
            { data.notes 
              && <>
                <Notes>
                  <SubTitleWrap>
                    <IconWrap>
                      <MaterialCommunityIcons name="pencil" size={14} color={theme.base.text[200]} />
                    </IconWrap>
                    <Text fontML>
                      { t(`common.notes`) }
                    </Text>
                  </SubTitleWrap>
                  <Text fontML color100 margin="8px 0 0 0">
                    { data.notes }
                  </Text>
                </Notes> 
              </>
            }
          </TableWrap>
        </SurfaceWrap>
        { data.type !== 'transfer' 
          && <SurfaceWrap
            title={ t(`common.change`) }
            marginTopZero
            transparent
            fontL
            marginBottomZero
          >
            <ChangeWrap>
              <Row>
                <Text fontML>
                  { t(`common.current value`) }
                </Text>
                <Text color100 fontML bold>
                  { currencyFormat({
                      value: currentPrice[currency] * data.quantity,
                      prefix: getCurrencySymbol(currency)
                    })
                  }
                </Text>
              </Row>
              <Row>
                <Text fontML>
                  { t(`common.value`) }
                </Text>
                <Text color100 fontML bold>
                  { changePrice < 0 
                    ? '-' + currencyFormat({
                        value: Math.sign(changePrice) * changePrice,
                        prefix: getCurrencySymbol(currency)
                      })
                    : '+' + currencyFormat({
                        value: changePrice,
                        prefix: getCurrencySymbol(currency)
                      })
                  }
                </Text>
              </Row>
              <Row>
                <Text fontML>
                  { t(`common.percentage`) }
                </Text>
                <IncreaseDecreaseValue 
                  value={changePercentage}
                  afterPrefix="%"
                  fontML
                  bold
                />
              </Row>
            </ChangeWrap>
          </SurfaceWrap>
        }
        <EditButton 
          portfolioId={data.portfolioId as string}
          id={coinId}
          image={image}
          name={name}
          symbol={symbol}
          transactionId={transactionId}
          initialData={{
            date: data.date,
            fee: data.fee[currency],
            notes: data.notes,
            pricePerCoin: data.pricePerCoin,
            quantity: data.quantity,
            type: data.type,
            transferType: data.transferType
          }}
        />
        <RemoveButton 
          onPress={handleRemoveButtonPress}
          activeOpacity={0.6}
        >
          <Text removeColor fontML bold>
            { t(`coinDetail.remove transaction`) }
          </Text>
        </RemoveButton>
        </>
        <Block></Block>
      </ScrollView>
    </Modal>
  )
})

export default TransactionDetailModal;

const ScrollView = styled.ScrollView``
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
` 

const WrapperCommonStyle = css`
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.m};
  padding: 6px 12px;
`

const TableWrap = styled.View`
  ${ WrapperCommonStyle }
`

const ChangeWrap = styled.View`
  ${ WrapperCommonStyle }
  justify-content: center;
  margin-top: ${({ theme }) => theme.content.blankSpacing};
`

const IconWrap = styled.View`
  width: 20px;
`

const SubTitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
`

const Notes = styled.View`
  padding: 10px 0;
`

const RemoveButton = styled.TouchableOpacity`
  height: 45px;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  margin-bottom: 10px;
`

const Block = styled.View`
  height: 30px;
`