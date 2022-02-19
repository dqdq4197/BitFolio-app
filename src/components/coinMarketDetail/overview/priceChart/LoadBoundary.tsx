import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';

import Text from '/components/common/Text';
import GlobalIndicator from '/components/common/GlobalIndicator';

type BoundaryProps = {
  isNotFound: boolean;
  isLoading: boolean;
};

const LoadBoundary = ({ isNotFound, isLoading }: BoundaryProps) => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();

  if (!isNotFound && !isLoading) return <></>;

  if (isNotFound) {
    return (
      <NotFoundViewContainer>
        <AntDesign name="frowno" size={34} color={theme.base.text[300]} />
        <Text center lineHeight={30}>
          {t(`coinDetail.not found fst`)}
        </Text>
        <Text center>{t(`coinDetail.not found scd`)}</Text>
      </NotFoundViewContainer>
    );
  }

  return <GlobalIndicator isLoaded={false} />;
};

export default LoadBoundary;

const NotFoundViewContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;
