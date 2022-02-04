import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';

import Text from '/components/common/Text';
import FormModal, {
  InitialDataType,
} from '/components/portfolio/transactionModal/FormModal';

type ButtonProps = {
  id: string;
  name: string;
  image: string;
  symbol: string;
  portfolioId: string;
  transactionId: string;
  initialData: InitialDataType;
};

const EditTransactionButton = ({
  portfolioId,
  id,
  name,
  image,
  symbol,
  transactionId,
  initialData,
}: ButtonProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const handleButtonPress = () => {
    setVisible(true);
  }

  return (
    <>
      <Container activeOpacity={0.6} onPress={handleButtonPress}>
        <Text fontML color="white" bold>
          {t(`coinDetail.edit transaction`)}
        </Text>
      </Container>
      {visible && (
        <FormModal
          visible={visible}
          setVisible={setVisible}
          portfolioId={portfolioId}
          id={id}
          name={name}
          image={image}
          symbol={symbol}
          transactionId={transactionId}
          initialData={initialData}
        />
      )}
    </>
  );
};

export default EditTransactionButton;

const Container = styled.TouchableOpacity`
  height: 45px;
  align-items: center;
  justify-content: center;
  margin: 30px 10px 0;
  background-color: ${({ theme }) => theme.base.primaryColor};
  border-radius: ${({ theme }) => theme.border.m};
`;
