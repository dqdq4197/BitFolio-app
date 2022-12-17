import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';

import { useFeedBackAlertContext } from '/hooks/context/useFeedBackContext';
import { useSignInWithEmailAndPassword } from '/hooks/firebase';
import { VALIDATIONS } from '/lib/constant';
import type { SettingScreenProps } from '/types/navigation';

import AsyncButton from '/components/common/AsyncButton';
import FormLayout from '/components/common/FormLayout';
import Text from '/components/common/Text';
import TextField from '/components/common/TextField';

const SUBMIT_BUTTON_HEIGTH = 50;

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SettingScreenProps<'Login'>['navigation']>();
  const { openAlert } = useFeedBackAlertContext();
  const { signInWithEmailAndPassword, isLoading, errorMessage, user } =
    useSignInWithEmailAndPassword();
  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setTimeout(() => setFocus('email'), 500);
  }, [setFocus]);

  useEffect(() => {
    if (user) {
      if (user.user.emailVerified) {
        navigation.navigate('Main', {
          screen: 'Home',
          params: { screen: 'CoinMarketHome' },
        });
        openAlert({
          message: t(`auth.successfully logged in`),
          type: 'snackbar',
          severity: 'success',
        });
      } else {
        navigation.navigate('EmailVerification');
      }
    }
  }, [navigation, openAlert, t, user]);

  useEffect(() => {
    if (errorMessage) {
      openAlert({ message: errorMessage, type: 'snackbar', severity: 'error' });
    }
  }, [errorMessage, openAlert]);

  const onSubmit = async ({ email, password }: FormValues) => {
    await signInWithEmailAndPassword(email, password);
  };

  const moveToRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const moveToForgotPasswordScreen = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <FormLayout
      stickyFooterComponent={
        <AsyncButton
          fontML
          text={t(`auth.login`)}
          isDisabled={
            !watch().email.length || !watch().password.length || isLoading
          }
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          height={SUBMIT_BUTTON_HEIGTH}
          borderPosition={['top']}
          hasNotch
        />
      }
    >
      <Controller
        control={control}
        rules={{
          required: `${t(`auth.n.required`, { n: t(`auth.email address`) })}`,
          pattern: {
            value: VALIDATIONS.email.pattern,
            message: `${t(`auth.email message`)}`,
          },
        }}
        render={({ field: { onChange, onBlur, value, ref, name } }) => (
          <TextField
            label={t(`auth.email`)}
            placeholder={t(`auth.enter your email address`)}
            keyboardType="email-address"
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
            message: `${t(`auth.password message`)}`,
          },
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField
            label={t(`auth.password`)}
            placeholder={t(`auth.enter your password`)}
            type="password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            errorMessage={errors.password?.message}
            marginBottom={6}
          />
        )}
        name="password"
      />
      <Text right bold onPress={moveToForgotPasswordScreen}>
        {t(`auth.forgot your password?`)}
      </Text>
      <ExtraView>
        <Text>
          <Text center>{`${t(`auth.don't have an account?`)}  `}</Text>
          <Text primaryColor bold onPress={moveToRegisterScreen}>
            {t(`auth.create an account`)}
          </Text>
        </Text>
      </ExtraView>
    </FormLayout>
  );
};

export default Login;

const ExtraView = styled.View`
  width: 100%;
  height: 25px;
  margin-top: 70px;
`;
