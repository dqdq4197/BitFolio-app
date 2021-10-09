import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Dimensions, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { FontAwesome5, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import useLocales from '/hooks/useLocales';
import useCoinDetailData from '/hooks/useCoinDetailData';
import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import useGlobalTheme from '/hooks/useGlobalTheme';
import ScrollCloseModal from '/components/common/ScrollCloseModal';
import Text from '/components/common/Text';
import { addTransaction, editTransaction } from '/store/transaction';
import { changeCoinState, addWatchingCoin } from '/store/portfolio';
import Image from '/components/common/Image';
import EnterDetailsView from './EnterDetailsView';
import SettingsSelectionBar from './SettingsSelectionBar';
import TypeSelectView from './TypeSelectView';
import { easeCubicOut } from 'd3-ease';
import AsyncButton from '/components/common/AsyncButton';

export type SettingsType = {
  name: string
  key: FocusedView
  icon: (color: string) => JSX.Element
}

export type FocusedView = 'quantity' | 'date' | 'pricePerCoin' | 'fee' | 'notes'

export type InitialDataType = {
  quantity: number
  pricePerCoin: { [key: string]: number | string }
  fee: number
  notes: string | null
  date: number
  type: string
  transferType: string | null
}

type FormModalProps = {
  visible: boolean
  setVisible: (state: boolean) => void
  portfolioId: string
  id: string
  symbol: string
  name: string
  image: string
  transactionId?: string
  initialData?: InitialDataType
  afterAddTransactionTodo?: () => void
}

export interface SubmitNumericData {
  quantity: string
  pricePerCoin: { [key: string]: number }
  fee: { [key: string]: number }
}
export interface NumericData {
  quantity: string
  pricePerCoin: { [key: string]: number | string } | null
  fee: string
}
export type FormData<T> = T & {
  portfolioId: string
  coinId: string
  symbol: string
  date: number
  notes: string | null
  type: string
  transferType: null | string
}

const { width } = Dimensions.get('window'); 
const FOOTER_HEIGHT = 75; // confirm button height + padding bottom
const SELECT_TAB_HEIGHT = 45;
const SETTINGS: SettingsType[] = [{
  name: 'Quantity',
  key: 'quantity',
  icon: (color: string) => <FontAwesome5 name="coins" size={14} color={color} />
}, {
  name: 'Date',
  key: 'date',
  icon: (color: string) => <MaterialIcons name="date-range" size={14} color={color} />
}, {
  name: 'Price per coin',
  key: 'pricePerCoin',
  icon: (color: string) => <FontAwesome name="dollar" size={14} color={color} />
}, {
  name: 'Fee',
  key: 'fee',
  icon: (color: string) => <FontAwesome name="dollar" size={14} color={color} />
}, {
  name: 'Notes',
  key: 'notes',
  icon: (color: string) => <MaterialCommunityIcons name="pencil" size={14} color={color} />
}]

const FormModalLayout = ({ 
  visible, 
  setVisible, 
  portfolioId,
  id,
  symbol, 
  name,
  image,
  initialData,
  transactionId,
  afterAddTransactionTodo
}: FormModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { portfolios } = useAppSelector(state => state.portfolioReducer);
  const { currency } = useLocales();
  const { theme } = useGlobalTheme();
  const titleAnimate = useRef(new Animated.Value(0)).current;
  const firstPageAnimate = useRef(new Animated.Value(0)).current;
  const secondPageAnimate = useRef(new Animated.Value(20)).current;
  const firstPageOpacity = useRef(new Animated.Value(1)).current;
  const secondPageOpacity = useRef(new Animated.Value(0)).current;
  const { data: coinDetailData } = useCoinDetailData({ id, suspense: false });
  const [activePage, setActivePage] = useState(1);
  const [focusedView, setFocusedView] = useState<FocusedView>(SETTINGS[0].key);
  const [transitioning, setTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData<NumericData>>({
    portfolioId,
    coinId: id,
    symbol,
    quantity: initialData?.quantity.toString() || '0',
    date: initialData?.date || +new Date(),
    pricePerCoin: initialData?.pricePerCoin || null,
    fee: initialData?.fee.toString() || '0',
    notes: initialData?.notes || null,
    type: initialData?.type || 'buy',
    transferType: initialData?.transferType || 'transfer in'
  })

  useEffect(() => {
    if(activePage === 1 && transitioning) {
      Animated.parallel([
        Animated.timing(firstPageAnimate, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(firstPageOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(titleAnimate, {
          toValue: 30,
          duration: 200,
          useNativeDriver: true
        })
      ]).start(
        () => {
          setActivePage(2);
          setTransitioning(false);
          Animated.parallel([
            Animated.timing(secondPageAnimate, {
              toValue: 0,
              duration: 200,
              easing: Easing.in(easeCubicOut),
              useNativeDriver: true
            }),
            Animated.timing(secondPageOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true
            })
          ]).start()
        }
      )
    }

    if(activePage === 2 && transitioning) {
      firstPageAnimate.setValue(-20);
      firstPageOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(secondPageAnimate, {
          toValue: 20,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(secondPageOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(titleAnimate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        })
      ]).start(
        () => {
          setTransitioning(false);
          setActivePage(1);
          Animated.parallel([
            Animated.timing(firstPageAnimate, {
              toValue: 0,
              duration: 200,
              easing: Easing.in(easeCubicOut),
              useNativeDriver: true
            }),
            Animated.timing(firstPageOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true
            })
          ]).start()
        }
      )
    }
  }, [transitioning])

  const onSwitchFocusView = useCallback((key: FocusedView) => {
    setFocusedView(key);
  }, [])

  const isAlreadyHaveAsset = (): boolean => {
    const { coins } = portfolios.find(portfolio => portfolio.id === portfolioId)!;

    return coins.find(coin => coin.id === id) !== undefined; 
  }

  const handleAddTransactionPress = () => {
    if(!coinDetailData || !formData['pricePerCoin']) return ;

    let convertedFormData = currencyConverter();

    if(!convertedFormData || formData.quantity === '0') return ;

    if(formData.type !== 'transfer') {
      convertedFormData = {
        ...convertedFormData,
        transferType: null,
      }
    }

    if(transactionId) {
      dispatch(editTransaction({ transactionId, formData: convertedFormData }));
    } else {

      if(!isAlreadyHaveAsset()) {
        const payload = {
          portfolioId,
          coin: {
            id,
            image,
            name,
            symbol
          } 
        }
        dispatch(addWatchingCoin(payload))
      }

      dispatch(addTransaction({ formData: convertedFormData }));
    }

    if(portfolioId) {
      dispatch(
        changeCoinState({ 
          portfolioId, 
          coinId: formData.coinId, 
          state: 'trading' 
        })
      )
    }

    setVisible(false);

    if(afterAddTransactionTodo) {
      afterAddTransactionTodo();
    }
  }

  const handleNextPress = () => {
    setTransitioning(true);
  }

  const handleBackButtonPress = () => {
    setTransitioning(true);
  }

  const currencyConverter = (): FormData<SubmitNumericData> => {
    const { market_data: { current_price } } = coinDetailData!;

    let fee: number = parseFloat(formData['fee']);
    let pricePerCoin = formData['pricePerCoin']![currency];
    pricePerCoin = typeof pricePerCoin === 'string' ? parseFloat(pricePerCoin) : pricePerCoin;

    const feeRate = fee / current_price[currency];
    const pricePerCoinRate = pricePerCoin / current_price[currency];

    let newValue: FormData<SubmitNumericData> | FormData<NumericData> | any = { 
      ...formData,
      fee: {}
    };

    for(let currency in current_price) {
      newValue = {
        ...formData,
        fee: {
          ...newValue.fee,
          [currency]: current_price[currency] * feeRate
        },
        pricePerCoin: {
          ...newValue.pricePerCoin,
          [currency]: current_price[currency] * pricePerCoinRate
        },
      }
    }

    return newValue as FormData<SubmitNumericData>;
  }


  return (
    <>
      <ScrollCloseModal
        visible={visible}
        setVisible={setVisible}
        headerComponent={
          <>
            { activePage === 2 && 
              <Animated.View
                style={{
                  transform: [{
                    translateX: secondPageAnimate
                  }],
                  opacity: secondPageOpacity
                }}
              >
                <SettingsSelectionBar 
                  onSwitchFocusView={onSwitchFocusView}
                  focusedView={focusedView}
                  SETTINGS={SETTINGS}
                  SELECT_TAB_HEIGHT={SELECT_TAB_HEIGHT}
                />
              </Animated.View>
            }
          </>
        }
        titleComponent={
          <TitleWrap>
            { activePage === 2 &&
              <Animated.View
                style={{
                  position: 'absolute', 
                  marginTop: 3,
                  opacity: secondPageOpacity
                }}
              >
                <BackButtonWrap
                  activeOpacity={0.6}
                  onPress={handleBackButtonPress}
                  hitSlop={{
                    top: 5,
                    left: parseInt(theme.content.spacing),
                    bottom: 5
                  }}
                >
                  <MaterialIcons 
                    name="arrow-back-ios"
                    size={28} 
                    color={theme.base.text[100]} 
                  />
                </BackButtonWrap>
              </Animated.View>
            }
            <Title
              as={Animated.View}
              style={{
                transform: [{
                  translateX: titleAnimate
                }]
              }}
            >
              <Image 
                uri={image}
                height={23}
                width={23}
              />
              <ScrollTextView 
                horizontal 
                maxWidth={width / 2}
                showsHorizontalScrollIndicator={false}
              >
                <Text color100 bold fontX margin="0 0 0 7px">
                  { name }
                </Text>
              </ScrollTextView>
              <ScrollTextView 
                horizontal 
                maxWidth={width / 4}
                showsHorizontalScrollIndicator={false}
              >
                <Text bold fontML margin="0 0 0 10px">
                  { symbol.toUpperCase() }
                </Text>
              </ScrollTextView>
            </Title>
          </TitleWrap>
        }
        footerComponent={
          <AsyncButton 
            text={ activePage === 1
              ? t(`common.next`)
              : transactionId ? t(`common.edit transaction`) : t(`portfolio.add transaction`)
            }
            height={FOOTER_HEIGHT - 30} 
            isLoading={isLoading} 
            isDisabled={(formData.quantity === '0' && activePage === 2) || isLoading} 
            onPress={activePage === 1 ? handleNextPress : handleAddTransactionPress}
            borderPosition={['top']}
            fontML
            hasNotch
          />
        }
        footerHeight={FOOTER_HEIGHT}
      >
        <Animated.View
          style={{
            transform: [{
              translateX: firstPageAnimate
            }],
            opacity: firstPageOpacity,
            display: activePage === 1 ? 'flex' : 'none'
          }}
        > 
          <TypeSelectView 
            transactionType={formData.type}
            transferType={formData.transferType}
            setFormData={setFormData}
            FOOTER_HEIGHT={FOOTER_HEIGHT}
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{
              translateX: secondPageAnimate
            }],
            opacity: secondPageOpacity,
            display: activePage === 2 ? 'flex' : 'none'
          }}
        > 
          <EnterDetailsView 
            formData={formData}
            setFormData={setFormData}
            coinDetailData={coinDetailData}
            id={id}
            symbol={symbol}
            focusedView={focusedView}
            onSwitchFocusView={onSwitchFocusView}
            setIsLoading={setIsLoading}
            SETTINGS={SETTINGS}
            SELECT_TAB_HEIGHT={SELECT_TAB_HEIGHT}
            FOOTER_HEIGHT={FOOTER_HEIGHT}
            initialDummyData={
              initialData && {
                quantity: initialData.quantity,
                fee: initialData.fee,
                pricePerCoin: initialData.pricePerCoin
              }
            }
          />
        </Animated.View>
      </ScrollCloseModal>
    </>
  )
}

export default FormModalLayout;

type ScrollTextViewProps = {
  maxWidth: number;
}

const TitleWrap = styled.View`
  flex-direction: row;
`

const Title = styled.View`
  flex-direction: row;
  align-items: center;
`

const ScrollTextView = styled.ScrollView<ScrollTextViewProps>`
  max-width: ${ ({ maxWidth }) => maxWidth }px;
`

const BackButtonWrap = styled.TouchableOpacity`

`
