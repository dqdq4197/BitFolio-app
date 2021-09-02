import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ScrollView, Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { format } from 'date-fns';
import useHistorySnapshot from '/hooks/useHistorySnapshot';
import { currencyFormat } from '/lib/utils/currencyFormat';
import { CoinDetailDataReturn } from '/lib/api/CoinGeckoReturnType';
import SetQuantityView from './SetQuantityView';
import SetDateView from './SetDateView'
import SetPricePerCoinView from './SetPricePerCoinView';
import SetFeeView from './SetFeeView';
import SetNotesView from './SetNotesView';
import NumericPad from '/components/common/NumericPad';
import useLocales from '/hooks/useLocales';
import { 
  FormData, 
  NumericData, 
  SettingsType, 
  FocusedView,
} from './FormModal';

type InitailDummyData = {
  quantity: number
  pricePerCoin: { [key: string]: number | string }
  fee: number
}

type ViewProps = {
  formData: FormData<NumericData>
  setFormData: React.Dispatch<React.SetStateAction<FormData<NumericData>>>
  initialDummyData?: InitailDummyData
  id: string
  symbol: string
  focusedView: FocusedView
  onSwitchFocusView: (key: FocusedView) => void
  coinDetailData?: CoinDetailDataReturn
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  SETTINGS: SettingsType[]
  SELECT_TAB_HEIGHT: number
  FOOTER_HEIGHT: number
}

const { width, height } = Dimensions.get('window');

const HEADER_HEIGHT = 65;
const NUMERIC_PAD_HEIGHT = 250;
const NOTES_MAX_LENGTH = 200;


const EnterDetailsView = ({ 
  formData, 
  setFormData, 
  initialDummyData,
  id,
  symbol,
  focusedView,
  onSwitchFocusView,
  coinDetailData,
  setIsLoading,
  SETTINGS,
  SELECT_TAB_HEIGHT,
  FOOTER_HEIGHT
}: ViewProps) => {
  const VIEW_HEIGHT = height - HEADER_HEIGHT - SELECT_TAB_HEIGHT - FOOTER_HEIGHT;
  const { currency } = useLocales();
  const hScrollViewRef = useRef<ScrollView>(null); 
  const numericPadTranslateY = useRef(new Animated.Value(0)).current;
  const numericPadOpacity = useRef(new Animated.Value(1)).current;
  const [isHideNumericPad, setIsHideNumericPad] = useState(false);
  const [unMountingList, setUnMountingList] = useState({
    quantity: [],
    pricePerCoin: [],
    fee: []
  });
  const [dummyFormData, setDummyFormData] = useState<NumericData>({
    quantity: initialDummyData?.quantity.toString() || '0',
    pricePerCoin: initialDummyData?.pricePerCoin || null,
    fee: initialDummyData?.fee.toString() || '0'
  });
  const [isPriceFixed, setIsPriceFixed] = useState(initialDummyData ? true : false);
  const { data: historySnapshotData, isValidating } = useHistorySnapshot({
    id,
    date: format(formData.date, 'dd-MM-yyyy'),
    suspense: false,
    willNotRequest: 
      format(formData.date, 'dd-MM-yyyy') === format(new Date(), 'dd-MM-yyyy')
      || isPriceFixed
  })
  // pricepercoin을 사용자가 설정했다면 요청x, 설정한 date일자가 같다면 요청 x

  useEffect(() => {
    const index = SETTINGS.findIndex(setting => setting.key === focusedView);

    if(hScrollViewRef.current) {
      hScrollViewRef.current.scrollTo({
        x: width * index,
      })
    } 
  }, [focusedView])

  useEffect(() => {
    if(coinDetailData && !initialDummyData) {
      const { market_data: { current_price } } = coinDetailData;
      setFormData(
        prev => ({
          ...prev,
          pricePerCoin: current_price
        })
      )
      setDummyFormData(
        prev => ({
          ...prev,
          pricePerCoin: current_price
        })
      )
    }
  }, [coinDetailData])

  useEffect(() => {
    let containNumericPadView = ['quantity', 'pricePerCoin', 'fee'];

    if(containNumericPadView.includes(focusedView)) {
      setIsHideNumericPad(false);
      Animated.parallel([
        Animated.timing(numericPadTranslateY, {
          toValue: 0,
          duration: 200,
          delay: 0,
          useNativeDriver: true
        }),
        Animated.timing(numericPadOpacity, {
          toValue: 1,
          duration: 200,
          delay: 0,
          useNativeDriver: true
        })
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(numericPadTranslateY, {
          toValue: 25,
          duration: 200,
          delay: 0,
          useNativeDriver: true
        }),
        Animated.timing(numericPadOpacity, {
          toValue: 0,
          duration: 200,
          delay: 0,
          useNativeDriver: true
        })
      ]).start(() => {
        setIsHideNumericPad(true);
      })
    }
  }, [focusedView])

  
  useEffect(() => {
    // date바꿀 시 price per coin 해당 date로 초기화
    if(historySnapshotData && !isPriceFixed) {
      if(historySnapshotData.market_data) {
        const { current_price } = historySnapshotData.market_data;
        console.log(current_price);
        setFormData(
          prev => ({
            ...prev,
            pricePerCoin: {
              ...current_price,
              [currency]: currencyFormat({ 
                value: current_price[currency],
                includeSeparator: false
              })
            }
          })
        )
        setDummyFormData(
          prev => ({
            ...prev,
            pricePerCoin: {
              ...current_price,
              [currency]: currencyFormat({ 
                value: current_price[currency],
                includeSeparator: false
              })

            }
          })
        )
      } else {
        setFormData(
          prev => ({
            ...prev,
            pricePerCoin: {
              [currency]: 0
            }
          })
        )
        setDummyFormData(
          prev => ({
            ...prev,
            pricePerCoin: {
              [currency]: 0
            }
          })
        )
      }
    }
  }, [historySnapshotData])

  useEffect(() => {
    setIsLoading(isValidating)
  }, [isValidating])

  const handleBackspacePress = useCallback(() => {
    const dummyKey = focusedView as 'quantity' | 'fee'
    const value = formData[dummyKey];
    if(value !== '0' && value.length > 0) {
      setUnMountingList(
        prev => ({
          ...prev,
          [dummyKey]: [value.length - 1, ...prev[dummyKey]]
        })
      )
    }
  }, [formData, focusedView])

  const handleNumericKeyPress = useCallback((key: string) => {
    const dummyKey = focusedView as 'quantity' | 'fee';
    const value = formData[dummyKey] as string;

    if(key === 'backspace' && value !== '0') {
      setFormData(
        prev => ({
          ...prev,
          [focusedView]: 
            value.length === 1 
              ? '0' 
              : value.slice(0, value.length - 1)
        })
      )
      setTimeout(() => {
        setUnMountingList(
          prev => ({
            ...prev,
            [dummyKey]: prev[dummyKey].filter(index => value.length - 1 !== index)
          })
        )
        setDummyFormData(
          prev => ({
            ...prev,
            [focusedView]: 
              prev[dummyKey].length === 1 
                ? '0'
                : prev[dummyKey].slice(0, prev[dummyKey].length - 1)
          })
        )
      }, 200)
    }

    if(key !== 'backspace') {
      if(!value.includes('.') && value.length > 11 && key !== '.') return;
      if(value.includes('.') && value.split('.')[1].length > 6) return ;
      if(key === '.') {
        if(value.indexOf('.') === -1) {
          setDummyFormData(
            prev => ({
              ...prev,
              [focusedView]: value + key
            })
          )
          setFormData(
            prev => ({
              ...prev,
              [focusedView]: value + key
            })
          )
        }
        return ;
      }
      if(value === '0') {
        setDummyFormData(
          prev => ({
            ...prev,
            [focusedView]: key
          })
        )
        setFormData(
          prev => ({
            ...prev,
            [focusedView]: key
          })
        )
      } else {
        setDummyFormData(
          prev => ({
            ...prev,
            [focusedView]: value + key
          })
        )
        setFormData(
          prev => ({
            ...prev,
            [focusedView]: value + key
          })
        )
      }
    }
  }, [formData, focusedView])

  const onIsPriceFiexedChange = () => {
    setIsPriceFixed(prev => !prev);
  }

  const setDate = (date: number) => {
    // dd-mm-yyyy
    setFormData(
      prev => ({
        ...prev,
        date: date
      })
    )
  }

  const handlePricePerCoinBackspacePress = useCallback(() => {
    const dummyKey = focusedView as 'pricePerCoin'
    const value = formData[dummyKey]![currency].toString();

    if(value !== '0' && value.length > 0) {
      setUnMountingList(
        prev => ({
          ...prev,
          [focusedView]: [value.length - 1, ...prev[dummyKey]]
        })
      )
    }
  }, [formData, focusedView])


  const handlePricePercoinNumericKeyPress = useCallback((key: string) => {
    if(!formData.pricePerCoin) return;

    const value = formData.pricePerCoin[currency].toString();
    const dummyKey = focusedView as 'pricePerCoin';

    if(key === 'backspace' && value !== '0') {
      setFormData(
        prev => ({
          ...prev,
          [focusedView]: {
            [currency]: value.length === 1
              ? '0'
              : value.slice(0, value.length - 1)
          } 
        })
      )
      setTimeout(() => {
        setUnMountingList(
          prev => ({
            ...prev,
            [focusedView]: prev[dummyKey].filter(index => value.length - 1 !== index)
          })
        )
        setDummyFormData(
          prev => ({
            ...prev,
            [focusedView]: {
              [currency]: prev[dummyKey]![currency].toString().length === 1 
                ? '0'
                : prev[dummyKey]![currency].toString().slice(0, prev[dummyKey]![currency].toString().length - 1)
            } 
          })
        )
      }, 200)
    }

    if(key !== 'backspace') {
      if(!value.includes('.') && value.length > 11 && key !== '.') return;
      if(value.includes('.') && value.split('.')[1].length > 6) return ;
      if(key === '.') {
        if(value.indexOf('.') === -1) {
          setDummyFormData(
            prev => ({
              ...prev,
              [focusedView]: {
                [currency]: value + key
              }
            })
          )
          setFormData(
            prev => ({
              ...prev,
              [focusedView]: {
                [currency]: value + key
              }
            })
          )
        }
        return ;
      }
      if(value === '0') {
        setDummyFormData(
          prev => ({
            ...prev,
            [focusedView]: {
              [currency]: key
            }
          })
        )
        setFormData(
          prev => ({
            ...prev,
            [focusedView]: {
              [currency]: key
            }
          })
        )
      } else {
        setDummyFormData(
          prev => ({
            ...prev,
            [focusedView]: {
              [currency]: value + key
            }
          })
        )
        setFormData(
          prev => ({
            ...prev,
            [focusedView]: {
              [currency]: value + key
            }
          })
        )
      }
    }
  }, [formData, focusedView])

  const setNotes = (text: string) => {
    if(text.length > NOTES_MAX_LENGTH) return ;

    setFormData(
      prev => ({
        ...prev,
        notes: text
      })
    )
  }

  return (
    <Container height={VIEW_HEIGHT}>
      <HorizontalScrollView 
        ref={hScrollViewRef}
        horizontal
        scrollEnabled={false}
      >
        <SetQuantityView 
          height={VIEW_HEIGHT - NUMERIC_PAD_HEIGHT}
          quantity={dummyFormData.quantity}
          unMountingList={unMountingList.quantity}
          symbol={symbol}
          pricePerCoin={formData.pricePerCoin ? formData.pricePerCoin[currency].toString() : '0'}
          onSwitchFocusView={onSwitchFocusView}
        />
        <SetDateView 
          height={VIEW_HEIGHT}
          isFocused={focusedView === 'date'}
          date={formData.date}
          setDate={setDate}
        />
        <SetPricePerCoinView 
          height={VIEW_HEIGHT - NUMERIC_PAD_HEIGHT}
          pricePerCoin={dummyFormData.pricePerCoin ? dummyFormData.pricePerCoin[currency].toString() : '0'}
          unMountingList={unMountingList.pricePerCoin}
          isPriceFixed={isPriceFixed}
          onIsPriceFiexedChange={onIsPriceFiexedChange}
        />
        <SetFeeView 
          height={VIEW_HEIGHT - NUMERIC_PAD_HEIGHT}
          fee={dummyFormData.fee as string}
          unMountingList={unMountingList.fee}
        />
        <SetNotesView 
          height={VIEW_HEIGHT}
          isFocused={focusedView === 'notes'}
          notes={formData.notes}
          setNotes={setNotes}
          notesMaxLength={NOTES_MAX_LENGTH}
        />
      </HorizontalScrollView>
      <PadWrap
        as={Animated.View} 
        style={{
          transform: [{
            translateY: numericPadTranslateY
          }],
          opacity: numericPadOpacity,
          display: isHideNumericPad ? 'none': 'flex'
        }}
      >
        <NumericPad 
          height={NUMERIC_PAD_HEIGHT}
          onNumericKeyPress={focusedView === 'pricePerCoin' ? handlePricePercoinNumericKeyPress : handleNumericKeyPress}
          onBackspacePress={focusedView === 'pricePerCoin' ? handlePricePerCoinBackspacePress:  handleBackspacePress}
        />
        
      </PadWrap>
    </Container>
  )
}

export default EnterDetailsView;

type ContainerProps = {
  height: number
}
const Container = styled.View<ContainerProps>`
  height: ${({ height }) => height}px;
  justify-content: space-between;
`
const HorizontalScrollView = styled.ScrollView``

const PadWrap = styled.View`
  padding: 0 ${({ theme }) => theme.content.spacing};
`