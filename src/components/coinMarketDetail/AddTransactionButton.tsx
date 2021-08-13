import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import FormModal from '/components/portfolio/transactionModal/FormModal';
import useCoinDetailData from '/hooks/useCoinDetailData';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import AsyncButton from '/components/common/AsyncButton';


type ButtonProps = {
  portfolioId?: string
}
const AddTransactionButton = ({ portfolioId }: ButtonProps) => {
  const { t } = useTranslation();
  const { id } = useCoinIdContext();
  const { data } = useCoinDetailData({ id });
  const [visible, setVisible] = useState(false);

  const handleButtonPress = () => {
    setVisible(true);
  }
  return (
    <Container>
      <AsyncButton 
        bold
        fontML
        color100
        text={ t(`common.add transaction`) }
        height={45}
        onPress={handleButtonPress}
        isLoading={!data}
        isDisabled={!data}
        borderPosition={['top', 'bottom']}
      />
      { data && visible && (
        <FormModal 
          visible={visible}
          setVisible={setVisible}
          portfolioId={portfolioId ?? null}
          id={data.id}
          name={data.name}
          image={data.image.large}
          symbol={data.symbol}
        />
      )}
    </Container>
  )
}

export default AddTransactionButton;

const Container = styled.TouchableOpacity`
  margin: 0 ${({ theme }) => theme.content.spacing} 12px;
`