import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dimensions, ScrollView, Animated } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, FontAwesome, MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import ScrollCloseModal from '/components/common/ScrollCloseModal';
import NumericPad from '/components/common/NumericPad';
import Text from '/components/common/Text';
import SetQuantityView from './SetQuantityView';
import SetDateView from './SetDateView'
import SetPricePerCoinView from './SetPricePerCoinView';
import SetFeeView from './SetFeeView';
import SetNotesView from './SetNotesView';


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

type FormData = {
  quantity: string;
  date: string;
  pricePerCoin: string;
  fee: string;
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

const SELECT_TAB_HEIGHT = 40;
const HEADER_HEIGHT = 65;
const NUMERIC_PAD_HEIGHT = 270;
const FOOTER_HEIGHT = 75; // confirm button height + padding bottom
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
          return (
            <SelectionTab 
              key={setting.key}
              activeOpacity={0.6}
              onPress={() => onSwitchFocusView(setting.key)}
              isFocused={setting.key === focusedView}
            >
              { setting.icon(theme.base.text[200]) }
              <Text fontML margin="0 0 0 5px">
                { setting.name }
              </Text> 
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
  const { theme } = useGlobalTheme();
  const navigation = useNavigation();
  const [unMountingList, setUnMountingList] = useState({
    quantity: [],
    pricePerCoin: [],
    fee: []
  });
  const [dummyFormData, setDummyFormData] = useState({
    quantity: '0',
    pricePerCoin: currentPrice.toString(),
    fee: '0'
  });
  const [formData, setFormData] = useState<FormData>({
    quantity: '0',
    date: '0',
    pricePerCoin: currentPrice.toString(),
    fee: '0',
    notes: '',
  })
  const hScrollViewRef = useRef<ScrollView>(null); 
  const numericPadTranslateY = useRef(new Animated.Value(0)).current;
  const numericPadOpacity = useRef(new Animated.Value(1)).current;
  const [isHideNumericPad, setIsHideNumericPad] = useState(false);
  const [focusedView, setFocusedView] = useState<FocusedView>(SETTINGS[0].key);

  useEffect(() => {
    // initial state reset when close modal!
    if(!visible) {
      setFormData({
        quantity: '0',
        date: '0',
        pricePerCoin: currentPrice.toString(),
        fee: '0',
        notes: '',
      })
      setDummyFormData({
        quantity: '0',
        fee: '0',
        pricePerCoin: currentPrice.toString()
      })
      setUnMountingList({
        quantity: [],
        pricePerCoin: [],
        fee: []
      })
    }
  }, [visible])

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

  const handleBackspacePress = useCallback(() => {
    const value = formData[focusedView];
    const dummyKey = focusedView as 'quantity' | 'pricePerCoin' | 'fee'
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
    const value = formData[focusedView];
    const dummyKey = focusedView as 'quantity' | 'pricePerCoin' | 'fee'
    
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

  const onSwitchFocusView = useCallback((key: FocusedView) => {
    setFocusedView(key);
  }, [])

  return (
    <>
      <ScrollCloseModal
        visible={visible}
        setVisible={setVisible}
        headerComponent={
          <SettingsSelectionBar 
            onSwitchFocusView={onSwitchFocusView}
            focusedView={focusedView}
          />
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
            <Text color100 fontXL>
              확인
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
              quantity={dummyFormData.quantity}
              unMountingList={unMountingList.quantity}
              symbol={symbol}
              pricePerCoin={formData.pricePerCoin}
              onSwitchFocusView={onSwitchFocusView}
              height={height - HEADER_HEIGHT - SELECT_TAB_HEIGHT - NUMERIC_PAD_HEIGHT - FOOTER_HEIGHT }
            />
            <SetDateView 
              height={height - HEADER_HEIGHT - SELECT_TAB_HEIGHT - FOOTER_HEIGHT}
            />
            <SetPricePerCoinView 
              pricePerCoin={dummyFormData.pricePerCoin}
              unMountingList={unMountingList.pricePerCoin}
              height={height - HEADER_HEIGHT - SELECT_TAB_HEIGHT - NUMERIC_PAD_HEIGHT - FOOTER_HEIGHT}
            />
            <SetFeeView 
              fee={dummyFormData.fee}
              unMountingList={unMountingList.fee}
              height={height - HEADER_HEIGHT - SELECT_TAB_HEIGHT - NUMERIC_PAD_HEIGHT - FOOTER_HEIGHT}
            />
            <SetNotesView 
              height={height - HEADER_HEIGHT - SELECT_TAB_HEIGHT - FOOTER_HEIGHT}
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
              onNumericKeyPress={handleNumericKeyPress}
              onBackspacePress={handleBackspacePress}
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
type SelectionTabProps = {
  isFocused: boolean;
}
const Container = styled.View`
  height: ${ height - SELECT_TAB_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT }px;
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

const SelectionTab = styled.TouchableOpacity<SelectionTabProps>`
  flex-direction: row;
  height: 30px;
  padding: 0 8px;
  background-color: ${({ theme }) => theme.base.background[300]};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.border.m};
  border-color: ${({ isFocused, theme }) => 
    isFocused ? theme.base.primaryColor : 'transparent'};
  border-width: 1px;
`

const ScrollTextView = styled.ScrollView<ScrollTextViewProps>`
  max-width: ${ ({ maxWidth }) => maxWidth }px;
`

const HorizontalScrollView = styled.ScrollView``

const PadWrap = styled.View`
  padding: 0 ${({ theme }) => theme.content.spacing};
`