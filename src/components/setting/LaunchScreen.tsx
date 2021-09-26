import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { Octicons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppSelector, useAppDispatch } from '/hooks/useRedux';
import { changeLaunchScreen } from '/store/baseSetting';
import { TAB_ROUTE_NAME } from '/lib/constant';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import Blank from './Blank';

type LaunchScreenProps = {}

type RowProps = {
  onPress: () => void
  title: string
  enabled: boolean
}

const Row = ({ onPress, title, enabled }: RowProps) => {

  const { theme } = useGlobalTheme();
  
  return (
    <RowContainer
      onPress={onPress}
      underlayColor={ theme.base.underlayColor[100] }
    >
      <>
        <Text fontML bold>
          { title }
        </Text>
        <Octicons 
          name="check" 
          size={28} 
          color={
            enabled 
            ? theme.base.primaryColor
            : 'transparent'
          }
        />
      </>
    </RowContainer>
  )
}

const LaunchScreen = ({}: LaunchScreenProps) => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { launchScreen } = useAppSelector(state => state.baseSettingReducer);

  const onLaunchScreenChange = (key: keyof typeof TAB_ROUTE_NAME) => {
    dispatch(changeLaunchScreen(key))
  }

  return (
    <SurfaceWrap
      title={ t(`setting.launch screen settings`) }
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Row 
        onPress={() => onLaunchScreenChange(TAB_ROUTE_NAME.portfolio)}
        title={ t(`common.${ TAB_ROUTE_NAME.portfolio }`) }
        enabled={ launchScreen === TAB_ROUTE_NAME.portfolio }
      />
      <Row 
        onPress={() => onLaunchScreenChange(TAB_ROUTE_NAME.home)}
        title={ t(`common.${ TAB_ROUTE_NAME.home }`) }
        enabled={ launchScreen === TAB_ROUTE_NAME.home }
      />
      <Row 
        onPress={() => onLaunchScreenChange(TAB_ROUTE_NAME.news)}
        title={ t(`common.${ TAB_ROUTE_NAME.news }`) }
        enabled={ launchScreen === TAB_ROUTE_NAME.news }
      />
      <Blank/>
    </SurfaceWrap>
  )
}

export default LaunchScreen;

const RowContainer = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: 48px;
`