import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import { VALIDATIONS } from '/lib/constant';

import AsyncButton from '/components/common/AsyncButton';
import TextField from '/components/common/TextField';
import FormLayout from '/components/common/FormLayout';

const SUBMIT_BUTTON_HEIGTH = 50;

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
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

  return (
    <FormLayout
      stickyFooterComponent={
        <AsyncButton
          fontML
          text={t(`auth.login`)}
          isDisabled={!watch().email.length}
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
    </FormLayout>
  );
};

export default ChangePassword;
