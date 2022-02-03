import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import * as WebBrowser from 'expo-web-browser';

import { 
  VALIDATIONS, 
  TURMS_OF_SERVICE,
  PRIVACY_POLICY_EN,
  PRIVACY_POLICY_KO
} from '/lib/constant';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';

import Text from '/components/common/Text';
import AsyncButton from '/components/common/AsyncButton';
import TextField from '/components/common/TextField';
import FormLayout from '/components/common/FormLayout';

const SUBMIT_BUTTON_HEIGTH = 50;

const Register = () => {
  const { t } = useTranslation(); 
  const navigation = useNavigation();
  const { language } = useLocales();
  const { theme } = useGlobalTheme();
  const { control, handleSubmit, setFocus, watch ,formState: { errors } } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    setTimeout(() => setFocus("email"), 500);
  }, [setFocus])

  const onSubmit = (data: Object) => {
    console.log(data);
  }
    
  const moveToLoginScreen = () => {
    navigation.navigate("Login");
  }

  const openTermsOfUse = () => {
    WebBrowser.openBrowserAsync(
      TURMS_OF_SERVICE, {
      toolbarColor: theme.base.background.surface,
      enableBarCollapsing: true
    })
  }
  
  const openPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync(
      language === 'en' ? PRIVACY_POLICY_EN : PRIVACY_POLICY_KO, {
      toolbarColor: theme.base.background.surface,
      enableBarCollapsing: true
    })
  }


  return (
    <FormLayout
      stickyFooterComponent={
        <>
        <ExtraView>
          <Text>
            { t(`auth.agree to terms of use & privacy policy`) }
            &nbsp;
            <Text primaryColor onPress={openTermsOfUse}>
              { t(`common.terms of use`) }
            </Text>
            &nbsp;&amp;&nbsp;
            <Text primaryColor onPress={openPrivacyPolicy}>
              { t(`common.privacy policy`) }
            </Text>
          </Text>
        </ExtraView>
        <AsyncButton 
          fontML
          text={t(`auth.create an account`)}
          isDisabled={!watch().email.length || !watch().password.length}
          isLoading={false}
          onPress={handleSubmit(onSubmit)}
          height={SUBMIT_BUTTON_HEIGTH}
          borderPosition={['top']}
        />
        </>
      }
    >
      <Controller
        control={control}
        rules={{
          required: `${t(`auth.n.required`, { n: t(`auth.email address`) })}`,
          pattern: {
            value: VALIDATIONS.email.pattern,
            message: `${t(`auth.email message`)}`
          }
        }}
        render={({ field: { onChange, onBlur, value, ref, name } }) => (
          <TextField 
            label={ t(`auth.email`) }
            placeholder={t(`auth.enter your email address`)}
            keyboardType='email-address'
            textContentType="emailAddress"
            value={value}
            ref={ref}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors[name]?.message}
            marginBottom={25}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: `${t(`auth.n.required`, { n: t(`auth.password`) })}`,
          pattern: {
            value: VALIDATIONS.password.pattern, 
            message: `${t(`auth.password message`)}`
          }
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField 
            label={ t(`auth.password`) }
            placeholder={t(`auth.enter your password`)}
            type="password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            errorMessage={errors['password']?.message}
            alertMessage={t(`auth.password message`)}
            marginBottom={6}
          />
        )}
        name="password"
      />
      <Text right>
        { t(`auth.already have an account?`) }
        &nbsp;&nbsp;
        <Text 
          primaryColor
          bold
          onPress={moveToLoginScreen}
        >
          { t(`auth.login`) }
        </Text>
      </Text>
    </FormLayout>
  )
}

export default Register;

const ExtraView = styled.View`
  padding: 8px ${({ theme }) => theme.content.spacing};
`