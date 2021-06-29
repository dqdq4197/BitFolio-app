import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dimensions, ScrollView, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, FontAwesome, MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import useCoinDetailData from '/hooks/useCoinDetailData';
import useHistorySnapshot from '/hooks/useHistorySnapshot';
import ScrollCloseModal from '/components/common/ScrollCloseModal';
import NumericPad from '/components/common/NumericPad';
import Text from '/components/common/Text';
import SetQuantityView from './SetQuantityView';
import SetDateView from './SetDateView'
import SetPricePerCoinView from './SetPricePerCoinView';
import SetFeeView from './SetFeeView';
import SetNotesView from './SetNotesView';
import TransactionPurposeBar from './TransactionPurposeBar';
import { currencyFormat } from '/lib/utils/currencyFormat';


type FormModalProps = {
  visible: boolean;
  setVisible: (state: boolean) => void;
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  image: string;
  last_updated: string;
}

interface DummyData {
  quantity: string;
  pricePerCoin: { [key: string]: number | string } | null
  fee: string;
}
interface FormData extends DummyData {
  date: Date;
  notes: string;
}

export type FocusedView = 'quantity' | 'date' | 'pricePerCoin' | 'fee' | 'notes';
type SettingsType = {
  name: string;
  key: FocusedView;
  icon: (color: string) => JSX.Element;
}
type SelectionBar = {
  onSwitchFocusView: (key: FocusedView) => void;
  focusedView: FocusedView;
}
const { width, height } = Dimensions.get('window');

const TRANSACTION_PURPOSE_BAR_HEIGHT = 50;
const SELECT_TAB_HEIGHT = 45;
const HEADER_HEIGHT = 65;
const NUMERIC_PAD_HEIGHT = 250;
const FOOTER_HEIGHT = 75; // confirm button height + padding bottom
const NOTES_MAX_LENGTH = 200;
const VIEW_HEIGHT = height - HEADER_HEIGHT - TRANSACTION_PURPOSE_BAR_HEIGHT - SELECT_TAB_HEIGHT - FOOTER_HEIGHT;
const PURPOSES = ['Buy', 'Sell', 'Transfer'];
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

const SettingsSelectionBar = ({ onSwitchFocusView, focusedView }: SelectionBar) => {
  const { theme } = useGlobalTheme();
  return (
    <SelectionBarContainer
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: parseInt(theme.content.spacing)
      }}
    >
      <SelectionBarWrap>
        { SETTINGS.map(setting => {
          const isFocused = setting.key === focusedView;
          return (
            <SelectionTab 
              key={setting.key}
              activeOpacity={0.6}
              onPress={() => onSwitchFocusView(setting.key)}
              isFocused={isFocused}
            >
              { setting.icon(isFocused ? theme.base.background[200] : theme.base.text[200]) }
              <SettingLabelText 
                fontML 
                bold 
                margin="0 0 0 5px"
                isFocused={isFocused}
              >
                { setting.name }
              </SettingLabelText> 
            </SelectionTab>
          )
        })}
      </SelectionBarWrap>
    </SelectionBarContainer>
  )
}

const FormModalLayout = ({ 
  visible, 
  setVisible, 
  id, 
  symbol, 
  name,
  currentPrice,
  image,
  last_updated
}: FormModalProps) => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const { currency } = useLocales();
  const [unMountingList, setUnMountingList] = useState({
    quantity: [],
    pricePerCoin: [],
    fee: []
  });
  const [dummyFormData, setDummyFormData] = useState<DummyData>({
    quantity: '0',
    pricePerCoin: null,
    fee: '0'
  });
  const [formData, setFormData] = useState<FormData>({
    quantity: '0',
    date: new Date(),
    pricePerCoin: null,
    fee: '0',
    notes: '',
  })
  const hScrollViewRef = useRef<ScrollView>(null); 
  const numericPadTranslateY = useRef(new Animated.Value(0)).current;
  const numericPadOpacity = useRef(new Animated.Value(1)).current;
  const [transactionPurpose, setTransactionPurpose] = useState('Buy');
  const [isHideNumericPad, setIsHideNumericPad] = useState(false);
  const [focusedView, setFocusedView] = useState<FocusedView>(SETTINGS[0].key);
  const [isPriceFixed, setIsPriceFixed] = useState(false);
  const { data: coinDetailData } = useCoinDetailData({ id, suspense: false })
  const { data: historySnapshotData } = useHistorySnapshot({
    id,
    date: format(formData.date, 'dd-MM-yyyy'),
    suspense: false,
    willNotRequest: 
      format(formData.date, 'dd-MM-yyyy') === format(new Date(), 'dd-MM-yyyy')
      || isPriceFixed
  })
  // pricepercoin을 사용자가 설정했다면 요청x, 설정한 date일자가 같다면 요청 x

  useEffect(() => {
    if(coinDetailData) {
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
    const index = SETTINGS.findIndex(setting => setting.key === focusedView);

    if(hScrollViewRef.current) {
      hScrollViewRef.current.scrollTo({
        x: width * index,
      })
    } 
  }, [focusedView])

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
    const dummyKey = focusedView as 'quantity' | 'fee'
    const value = formData[dummyKey];

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

  const resetPricePerCoin = () => {
    if(coinDetailData) {
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
  }

  const setDate = (date: Date) => {
    // dd-mm-yyyy
    setFormData(
      prev => ({
        ...prev,
        date: date
      })
    )
  }

  const setNotes = (text: string) => {
    if(text.length > NOTES_MAX_LENGTH) return ;

    setFormData(
      prev => ({
        ...prev,
        notes: text
      })
    )
  }

  const onSwitchFocusView = useCallback((key: FocusedView) => {
    setFocusedView(key);
  }, [])

  const onIsPriceFiexedChange = () => {
    setIsPriceFixed(prev => !prev);
  }

  const onSwitchTransactionPurpose = (label: string) => {
    setTransactionPurpose(label);
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
  return (
    <>
      <ScrollCloseModal
        visible={visible}
        setVisible={setVisible}
        headerComponent={
          <>
            <TransactionPurposeBar
              labels={PURPOSES}
              height={TRANSACTION_PURPOSE_BAR_HEIGHT}
              onSwitchTransactionPurpose={onSwitchTransactionPurpose}
              transactionPurpose={transactionPurpose}
            />
            <SettingsSelectionBar 
              onSwitchFocusView={onSwitchFocusView}
              focusedView={focusedView}
            />
          </>
        }
        titleComponent={
          <TitleWrap>
            <ScrollTextView 
              horizontal 
              maxWidth={width / 2}
              showsHorizontalScrollIndicator={false}
            >
              <Text color100 bold fontX>
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
          </TitleWrap>
        }
        footerComponent={
          <ConfirmButton>
            <Text style={{ color: 'white' }} fontML bold>
              { t(`portfolio.add transaction`) }
            </Text>
          </ConfirmButton>
        }
        footerHeight={FOOTER_HEIGHT}
      >
        <Container>
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
              fee={dummyFormData.fee}
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
      </ScrollCloseModal>
    </>
  )
}

export default FormModalLayout;


type ScrollTextViewProps = {
  maxWidth: number;
}
type SelectionProps = {
  isFocused: boolean;
}
const Container = styled.View`
  height: ${ VIEW_HEIGHT }px;
  justify-content: space-between;
`

const TitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
`
const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  height: ${FOOTER_HEIGHT - 30}px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  border-top-left-radius: ${({ theme }) => theme.border.l};
  border-top-right-radius: ${({ theme }) => theme.border.l};
  align-items: center;
  justify-content: center;
`

const SelectionBarContainer = styled.ScrollView`
  height: ${ SELECT_TAB_HEIGHT }px;
`

const SelectionBarWrap = styled.View`
  flex-direction: row;
`

const SelectionTab = styled.TouchableOpacity<SelectionProps>`
  flex-direction: row;
  height: 30px;
  padding: 0 12px;
  background-color: ${({ isFocused, theme }) => 
    isFocused ? theme.base.text[100] : theme.base.background[300]};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.border.m};
  /* border-color: ${({ isFocused, theme }) => 
    isFocused ? theme.base.primaryColor : 'transparent'}; */
  /* border-width: 1px; */
`

const ScrollTextView = styled.ScrollView<ScrollTextViewProps>`
  max-width: ${ ({ maxWidth }) => maxWidth }px;
`

const HorizontalScrollView = styled.ScrollView``

const PadWrap = styled.View`
  padding: 0 ${({ theme }) => theme.content.spacing};
`

const SettingLabelText = styled(Text)<SelectionProps>`
  color: ${({ isFocused, theme }) => 
    isFocused ? theme.base.background[200] : theme.base.text[200]  
  };
` 