import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components/native';

import { VALIDATIONS } from '/lib/constant';

import Text from '/components/common/Text';
import AsyncButton from '/components/common/AsyncButton';
import TextField from '/components/common/TextField';
import FormLayout from '/components/common/FormLayout';

const SUBMIT_BUTTON_HEIGTH = 50;

const Login = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { control, handleSubmit, setFocus, watch, formState: { errors } } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setTimeout(() => setFocus('email'), 500);
  }, [setFocus]);

  const onSubmit = (data: Object) => {
    console.log(data);
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
          isDisabled={!watch().email.length || !watch().password.length}
          isLoading={false}
          onPress={handleSubmit(onSubmit)}
          height={SUBMIT_BUTTON_HEIGTH}
          borderPosition={['top']}
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
        <Text center>
          {t(`auth.don't have an account?`) + '  '}
          <Text primaryColor bold onPress={moveToRegisterScreen}>
            {t(`auth.create an account`)}
          </Text>
        </Text>
      </ExtraView>
    </FormLayout>
  );
}

export default Login;

const ExtraView = styled.View`
  width: 100%;
  height: 25px;
  margin-top: 70px;
`;
