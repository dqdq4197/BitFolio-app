import React from 'react';
import { format } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import useLocales from '/hooks/useLocales';
import Text, { TextStyleProps } from './Text';

type CustomText = {
  children: React.ReactNode;
}

interface FormatTextProps extends TextStyleProps{
  formatType: 'Pp'
  date: number | Date
}

const DateFormatText = ({ 
  formatType, 
  date,
  ...textStyles
}: FormatTextProps) => {
  const { language } = useLocales();

  const CustomText = ({ children }: CustomText) => (
    <Text
      {...textStyles}
    >
      { children}
    </Text>
  )
  
  if(formatType === 'Pp') 
    return (
      <CustomText>
        { format(
          new Date(date), language === 'en' ? 'PP' : 'PPP', {
          locale: language === 'en' ? enUS : ko
        }) } 
        &nbsp;
        { language === 'ko' && (
          format(new Date(date), 'a', {
            locale: ko
          }) + ' '
        )} 
        { language === 'ko' 
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