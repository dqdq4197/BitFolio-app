import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { baseTypes } from 'base-types';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';
import useLocales from '/hooks/useLocales';
import { CURRENCIES } from '/lib/constant';
import { useAppDispatch } from '/hooks/useRedux';
import { createPortfolio } from '/store/portfolio';
import ScrollCloseModal from '/components/common/ScrollCloseModal';

type FormModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type TextFieldProps = {
  title: string;
  textSideComponent: React.ReactNode;
  children: React.ReactNode;
  marginTop?: number;
  onPress?: () => void;
}

type CurrencyModalProps = {
  visible: boolean;
  onModalClose: () => void;
  currentCurrency: {
    value: string,
    iso: string
  };
  onCurrencyChange: (value: string, iso: string) => void;
}

const TextField = ({ 
  title, 
  textSideComponent, 
  children, 
  marginTop = 20,
  onPress
}: TextFieldProps) => {
  return (
    <>
      <Text fontM bold margin={`${marginTop}px 0 0 0`}>
        { title }
      </Text>
      <TextInputWrap onPress={onPress}>
        { children }
        <TextSideView>
          { textSideComponent }
        </TextSideView>
      </TextInputWrap>
    </>
  )
}

const CurrencyModal = ({ 
  visible, 
  onModalClose, 
  currentCurrency, 
  onCurrencyChange 
}: CurrencyModalProps) => {
  const { theme } = useGlobalTheme();
  const AnimateRef = useRef(new Animated.Value(0)).current;
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    if(visible) {
      setIsClosed(false);
      Animated.timing(AnimateRef, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(AnimateRef, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsClosed(true)
      });
    }
  }, [visible])

  const renderCurrencies = () => {
    const rows = [];
    for(const currency in CURRENCIES) {
      const { name, iso, unicode, symbol } = CURRENCIES[currency as baseTypes.Currency];
      const value = name + ' - ' + symbol
      rows.push(
        <Row key={name} onPress={() => {
          onModalClose();
          onCurrencyChange(value, iso.toLocaleLowerCase());
        }}>
          <ColView>
            <Text fontML bold>
              { name }
            </Text>
            <Text color300>
              { iso } - { unicode } 
            </Text>
          </ColView>
          <Octicons 
            name="check" 
            size={28} 
            color={
              currentCurrency.iso === iso.toLowerCase()
              ? theme.base.primaryColor
              : 'transparent'
            }
          />
        </Row>
      )
    }

    return rows;
  }

  return (
    <FadeInOutView
      as={Animated.View}
      style={{
        opacity: AnimateRef,
        display: isClosed ? 'none': 'flex'
      }}
    >
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        
      >
        <ModalContainer onPress={onModalClose} activeOpacity={1}>
          <ModalView activeOpacity={1}>
            { renderCurrencies() }
          </ModalView>
        </ModalContainer>
      </Modal>
    </FadeInOutView>
  )
}
const CreatePortfolioModal = ({ visible, setVisible }: FormModalProps) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useGlobalTheme();
  const { currency } = useLocales();
  const [ModalVisible, setModalVible] = useState(false);
  const [formData, setFormData] = useState({
    name: t('portfolio.new portfolio'),
    currency: {
      value: CURRENCIES[currency].name + ' - ' + CURRENCIES[currency].symbol,
      iso: currency as string
    }
  })

  const handleNameChange = (text: string) => {
    if(text.length > 20) return; 
    setFormData(
      prev => ({
        ...prev,
        name: text
      })
    )
  }
  
  const handleCurrencyChange = (value: string, iso: string) => {
    setFormData(
      prev => ({
        ...prev,
        currency: {
          value,
          iso
        }
      })
    )
  }

  const handleNameFocus = () => {
    if(formData.name === t('portfolio.new portfolio')) {
      setFormData(
        prev => ({
          ...prev,
          name: ''
        })
      )
    }
  }

  const handleNameBlur = () => {
    let removedSpace = formData.name.replace(/\s/g, '')
    if(removedSpace === '') {
      setFormData(
        prev => ({
          ...prev,
          name: t('portfolio.new portfolio')
        })
      )
    }
  }

  const onModalOpen = () => {
    setModalVible(true);
  }

  const onModalClose = () => {
    setModalVible(false);
  }

  const handleConfirmPress = () => {
    const { name, currency } = formData;
    dispatch(
      createPortfolio({
        name,
        currency: currency.iso as baseTypes.Currency
      })
    )
      
    setVisible(false);
  }

  return (
    <>
      <ScrollCloseModal
        visible={visible}
        setVisible={setVisible}
        headerComponent={
          <Text fontXL bold color100 margin={`0 0 10px ${theme.content.spacing}`}>
            { t('portfolio.portfolio creation') }
          </Text>
        }
        footerComponent={
          <ConfirmButton
            activeOpacity={0.8}
            onPress={handleConfirmPress}
          >
            <Text color100 fontL bold>
              { t('common.confirm').toUpperCase() }
            </Text>
          </ConfirmButton>
        }
        extraComponent={
          <CurrencyModal 
            visible={ ModalVisible }
            onModalClose={onModalClose}
            currentCurrency={ formData.currency }
            onCurrencyChange={handleCurrencyChange}
          />
        }
      >
        <TextField
          title={ t('portfolio.portfolio name') }
          textSideComponent={
            <Text style={
              formData.name.length === 20 && {
                color: theme.base.primaryColor
              }
            }>
              { `${formData.name.length}/20` } 
            </Text>
          }
        >
          <TextInput
            spellCheck={false}
            value={ formData.name }
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            onChangeText={handleNameChange}
          />
        </TextField>
        <TextField
          title={ t('portfolio.main fiat currency') }
          onPress={onModalOpen}
          textSideComponent={
            <Ionicons 
              name="ios-chevron-down" 
              size={20} 
              color={theme.base.text[200]}
            />
          }
        >
          <Text color100 fontML bold>
            { formData.currency.value }
          </Text>
        </TextField>
      </ScrollCloseModal>
    </>
  )
}

export default CreatePortfolioModal;

const Modal = styled.Modal``

const TextInputWrap = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.m};
  justify-content: space-between;
  align-items:center;
  margin-top: 5px;
  padding: 0 10px;
`
const TextInput = styled.TextInput`
  width: 85%;
  height: 40px;
  color: ${({ theme }) => theme.base.text[100]};
  font-weight: bold;
  font-size: ${({ theme }) => theme.size.font_ml};
`
const ConfirmButton = styled.TouchableOpacity`
  height: 45px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  border-top-left-radius: ${({ theme }) => theme.border.l};
  border-top-right-radius: ${({ theme }) => theme.border.l};
  align-items: center;
  justify-content: center;
`
const TextSideView = styled.View`
  width: 40px;
  align-items: flex-end;
`
const FadeInOutView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.5;
`

const ModalContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: transparent;
  justify-content: flex-end;
`

const ModalView = styled.TouchableOpacity`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.base.background[200]};
  border-top-left-radius: ${({ theme }) => theme.border.ml};
  border-top-right-radius: ${({ theme }) => theme.border.ml};
`

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  margin-top: 30px;
`

const ColView = styled.View`

`