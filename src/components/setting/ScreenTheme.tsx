import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Octicons } from '@expo/vector-icons';

import useGlobalTheme from '/hooks/useGlobalTheme';

import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import Blank from './Blank';

type RowProps = {
  onPress: () => void;
  title: string;
  enabled: boolean;
};

const Row = ({ onPress, title, enabled }: RowProps) => {
  const { theme } = useGlobalTheme();

  return (
    <RowContainer
      onPress={onPress}
      underlayColor={theme.base.underlayColor[100]}
    >
      <>
        <Text fontML bold>
          {title}
        </Text>
        <Octicons
          name="check"
          size={28}
          color={enabled ? theme.base.primaryColor : 'transparent'}
        />
      </>
    </RowContainer>
  );
};

const ScreenTheme = () => {
  const { localScheme, onSchemeChange } = useGlobalTheme();
  const { t } = useTranslation();

  return (
    <SurfaceWrap
      title={t(`setting.screen theme settings`)}
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Row
        onPress={() => onSchemeChange('dark')}
        title={t(`setting.dark mode`)}
        enabled={localScheme === 'dark'}
      />
      <Row
        onPress={() => onSchemeChange('light')}
        title={t(`setting.light mode`)}
        enabled={localScheme === 'light'}
      />
      <Row
        onPress={() => onSchemeChange('default')}
        title={t(`setting.system theme`)}
        enabled={localScheme === 'default'}
      />
      <Blank />
    </SurfaceWrap>
  );
};

export default ScreenTheme;

const RowContainer = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: 48px;
`;
