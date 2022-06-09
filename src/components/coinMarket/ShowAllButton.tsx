import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';
import type { HomeParamList, HomeScreenProps } from '/types/navigation';

import Text from '/components/common/Text';

type ButtonProps = {
  route: keyof Pick<HomeParamList, 'CoinHighMarketCap' | 'CoinHighVolume'>;
};

const ShowAllButton = ({ route }: ButtonProps) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<HomeScreenProps<'CoinMarketHome'>['navigation']>();
  const { theme } = useGlobalTheme();

  const handleShowMorePress = () => {
    navigation.navigate(route);
  };

  return (
    <Container>
      <Button
        onPress={handleShowMorePress}
        activeOpacity={0.8}
        underlayColor={theme.base.background[200]}
        hitSlop={{
          left: 100,
          right: 100,
          top: 30,
          bottom: 30,
        }}
      >
        <ShowAllText>
          <Text fontML>{t('coinMarketHome.show all')}</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={theme.base.text[200]}
          />
        </ShowAllText>
      </Button>
    </Container>
  );
};

export default ShowAllButton;

const Container = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  width: 110px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.border.s};
`;

const ShowAllText = styled.View`
  flex-direction: row;
  align-items: center;
`;
