import React, { useState, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import FormModal from '/components/portfolio/transactionModal/FormModal';
import useCoinDetail from '/hooks/data/useCoinDetail';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import useGlobalTheme from '/hooks/useGlobalTheme';
import AsyncButton from '/components/common/AsyncButton';


type ButtonProps = {
  portfolioId: string
  width?: number
  height?: number
}

const { width: DWidth } = Dimensions.get('window');

const AddTransactionButton = ({ 
  portfolioId, 
  width,
  height = 45
}: ButtonProps) => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();
  const { id } = useCoinIdContext();
  const { data, isLoading } = useCoinDetail({ id });
  const [visible, setVisible] = useState(false);

  const handleButtonPress = () => {
    setVisible(true);
  }

  const initailWidth = useMemo(() => {
    return DWidth - parseInt(theme.content.spacing) * 2
  }, [DWidth, theme])

  return (
    <>
      <AsyncButton 
        bold
        fontML
        color100
        text={ t(`common.add transaction`) }
        width={ width || initailWidth }
        height={height}
        onPress={handleButtonPress}
        isLoading={isLoading}
        isDisabled={isLoading}
        borderPosition={['top', 'bottom']}
      />
      { data && visible && (
        <FormModal 
          visible={visible}
          setVisible={setVisible}
          portfolioId={portfolioId}
          id={data.id}
          name={data.name}
          image={data.image.large}
          symbol={data.symbol}
        />
      )}
    </>
  )
}

export default AddTransactionButton;