import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { VALIDATIONS } from '@/lib/constant'

import AsyncButton from '@/components/common/AsyncButton'
import FormLayout from '@/components/common/FormLayout'
import TextField from '@/components/common/TextField'

const SUBMIT_BUTTON_HEIGHT = 50

const ChangePassword = () => {
  const { t } = useTranslation()
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
  })

  useEffect(() => {
    setTimeout(() => setFocus('email'), 500)
  }, [setFocus])

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <FormLayout
      stickyFooterComponent={
        <AsyncButton
          fontML
          text={t(`auth.login`)}
          isDisabled={!watch().email.length}
          isLoading={false}
          onPress={handleSubmit(onSubmit)}
          height={SUBMIT_BUTTON_HEIGHT}
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
  )
}

export default ChangePassword
