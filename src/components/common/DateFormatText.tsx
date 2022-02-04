import React from 'react';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import useLocales from '/hooks/useLocales';
import Text, { TextStyleProps } from './Text';

type CustomText = {
  children: React.ReactNode;
}

interface FormatTextProps extends TextStyleProps {
  formatType: 'Pp'
  date: number | Date
  afterPrefix?: string
  beforePrefix?: string
}

const DateFormatText = ({
  formatType,
  date,
  afterPrefix,
  beforePrefix,
  ...textStyles
}: FormatTextProps) => {
  const { language } = useLocales();

  const CustomText = React.useCallback(({ children }: CustomText) => {
    return (<Text
      {...textStyles}
    >
      {afterPrefix}
      {afterPrefix && (
        <Text>
          &nbsp;
        </Text>
      )}
      {children}
      {beforePrefix}
    </Text>)
  }, [date])

  if (formatType === 'Pp')
    return (
      <CustomText>
        {format(
          new Date(date), language === 'en' ? 'PP' : 'PPP', {
          locale: language === 'en' ? enUS : ko
        })}
        &nbsp;
        {language === 'ko' && (
          format(new Date(date), 'a', {
            locale: ko
          }) + ' '
        )}
        {language === 'ko'
          ? format(new Date(date), 'p', {
            locale: enUS
          }).slice(0, -2)
          : format(new Date(date), 'p', {
            locale: enUS
          })
        }
      </CustomText>
    )


  return (
    <>
    </>
  )
}

export default DateFormatText;