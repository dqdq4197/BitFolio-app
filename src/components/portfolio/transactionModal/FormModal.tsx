import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Dimensions, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { FontAwesome5, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import useLocales from '/hooks/useLocales';
import useCoinDetailData from '/hooks/useCoinDetailData';
import { useAppDispatch } from '/hooks/useRedux';
import useGlobalTheme from '/hooks/useGlobalTheme';
import ScrollCloseModal from '/components/common/ScrollCloseModal';
import Text from '/components/common/Text';
import { currencyFormat } from '/lib/utils/currencyFormat';
import { addTransaction } from '/store/transaction';
import { addTransactionToPortfolio } from '/store/portfolio';
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

export type FocusedView = 'quantity' | 'date' | 'pricePerCoin' | 'fee' | 'notes';

type FormModalProps = {
  visible: boolean;
  setVisible: (state: boolean) => void;
  portfolioId: string;
  id: string;
  symbol: string;
  name: string;
  image: string;
}

export interface NumericData {
  quantity: string;
  pricePerCoin: { [key: string]: number | string } | null
  fee: string;
}
export interface FormData extends NumericData {
  portfolioId: string;
  coinId: string;
  date: number;
  notes: string | null;
  type: string;
  transferType: null | string;
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
}: FormModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
  const [formData, setFormData] = useState<FormData>({
    portfolioId,
    coinId: id,
    quantity: '0',
    date: +new Date(),
    pricePerCoin: null,
    fee: '0',
    notes: null,
    type: 'buy',
    transferType: 'transfer in'
  })

  useEffect(() => {
    if(activePage === 1 && transitioning) {
      Animated.parallel([
        Animated.timing(firstPageAnimate, {
          toValue: -20,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(firstPageOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(titleAnimate, {
          toValue: 30,
          duration: 250,
          useNativeDriver: true
        })
      ]).start(
        () => {
          setTransitioning(false);
          setActivePage(2);
          Animated.parallel([
            Animated.timing(secondPageAnimate, {
              toValue: 0,
              duration: 250,
              easing: Easing.in(easeCubicOut),
              useNativeDriver: true
            }),
            Animated.timing(secondPageOpacity, {
              toValue: 1,
              duration: 250,
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
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(secondPageOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(titleAnimate, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        })
      ]).start(
        () => {
          setTransitioning(false);
          setActivePage(1);
          Animated.parallel([
            Animated.timing(firstPageAnimate, {
              toValue: 0,
              duration: 250,
              easing: Easing.in(easeCubicOut),
              useNativeDriver: true
            }),
            Animated.timing(firstPageOpacity, {
              toValue: 1,
              duration: 250,
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

  const handleAddTransactionPress = () => {
    let isSuccess = currencyConverter();

    if(!isSuccess || formData.quantity === '0') return ;
    
    let newData: FormData = {...formData};
    if(formData.type !== 'transfer') {
      newData = {
        ...formData,
        transferType: null
      }
    }
    dispatch(addTransaction({ formData: newData }));
    dispatch(addTransactionToPortfolio(newData));
    setVisible(false);
  }

  const handleNextPress = () => {
    setTransitioning(true);
  }

  const handleBackButtonPress = () => {
    setTransitioning(true);
  }

  const currencyConverter = () => {
    if(!coinDetailData || !formData.pricePerCoin) return false;

    const { market_data: { current_price } } = coinDetailData;

    let pricePerCoin = formData.pricePerCoin[currency];
    pricePerCoin = typeof pricePerCoin === 'string' ? parseFloat(pricePerCoin) : pricePerCoin;
    const rate = pricePerCoin / current_price[currency];

    let newPricePerCoin = {};
    for(let currency in current_price) {
      newPricePerCoin = {
        ...newPricePerCoin,
        [currency]: parseFloat(currencyFormat({ value: current_price[currency] * rate}))
      }
    }

    setFormData(
      prev => ({
        ...prev,
        pricePerCoin: newPricePerCoin
      })
    )
    return true;
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
                <MaterialIcons 
                  name="arrow-back-ios"
                  size={28} 
                  color={theme.base.text[100]} 
                  onPress={handleBackButtonPress}
                />
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
              : t(`portfolio.add transaction`) 
            }
            textStyle={{
              fontML: true
            }}
            height={FOOTER_HEIGHT - 30} 
            isLoading={isLoading} 
            isDisabled={(formData.quantity === '0' && activePage === 2) || isLoading} 
            onPress={activePage === 1 ? handleNextPress : handleAddTransactionPress}
          />
        }
        footerHeight={FOOTER_HEIGHT}
      >
        { activePage === 1 
          ? <Animated.View
              style={{
                transform: [{
                  translateX: firstPageAnimate
                }],
                opacity: firstPageOpacity
              }}
            > 
              <TypeSelectView 
                transactionType={formData.type}
                transferType={formData.transferType}
                setFormData={setFormData}
                FOOTER_HEIGHT={FOOTER_HEIGHT}
              />
            </Animated.View>
          : <Animated.View
              style={{
                transform: [{
                  translateX: secondPageAnimate
                }],
                opacity: secondPageOpacity
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
              />
            </Animated.View>
        } 
      </ScrollCloseModal>
    </>
  )
}

export default FormModalLayout;

type ScrollTextViewProps = {
  maxWidth: number;
}

type ButtonProps = {
  isDisabled: boolean;
}
const TitleWrap = styled.View`
  flex-direction: row;
`

const Title = styled.View`
  flex-direction: row;
  align-items: center;
`
const ConfirmButton = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: ${FOOTER_HEIGHT - 30}px;
  background-color: ${({ theme, isDisabled }) => 
    isDisabled ? theme.base.background[400] : theme.base.primaryColor};
  border-top-left-radius: ${({ theme }) => theme.border.l};
  border-top-right-radius: ${({ theme }) => theme.border.l};
  align-items: center;
  justify-content: center;
`

const ScrollTextView = styled.ScrollView<ScrollTextViewProps>`
  max-width: ${ ({ maxWidth }) => maxWidth }px;
`
