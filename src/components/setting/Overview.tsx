import React, { useLayoutEffect } from 'react';
import { APP_VERSION } from '@env';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuthContext } from '/hooks/context/useAuthContext';
import useGlobalTheme from '/hooks/useGlobalTheme';
import type { SettingScreenProps, SettingParamList } from '/types/navigation';

import SurfaceWrap from '/components/common/SurfaceWrap';
import ScrollView from '/components/common/ScrollView';
import Stack from '/components/common/Stack';
import List from '/components/common/List';
import Text from '/components/common/Text';
import LogoutButton from './LogoutButton';
import AppSettingList from './AppSettingList';

const Overview = () => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();
  const navigation =
    useNavigation<SettingScreenProps<'Overview'>['navigation']>();
  const { currentUser } = useAuthContext();

  const linkTo = (route: keyof SettingParamList) => {
    navigation.navigate(route);
  };

  useLayoutEffect(() => {
    if (currentUser) {
      navigation.setOptions({
        headerRight: () => <LogoutButton />,
      });
    }
  }, [navigation, currentUser]);

  const handleProfilePress = () => {
    if (currentUser) {
      console.log(currentUser);
      linkTo('AuthSetting');
    } else {
      linkTo('Login');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SurfaceWrap parentPaddingZero marginTopZero fontML>
        <TouchableProfile
          underlayColor={theme.base.underlayColor[100]}
          onPress={handleProfilePress}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center">
              <IconWrap>
                <LottieView
                  source={require('../../../assets/lottie/randomAvatar.json')}
                  autoPlay
                  loop
                  speed={0.5}
                />
              </IconWrap>
              <Text fontX bold>
                {currentUser
                  ? currentUser.displayName
                  : t(`auth.login or register`)}
              </Text>
            </Stack>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color={theme.base.text[200]}
            />
          </Stack>
        </TouchableProfile>
      </SurfaceWrap>
      <SurfaceWrap title={t(`setting.app settings`)} parentPaddingZero fontML>
        <AppSettingList
          onCurrencyPress={() => linkTo('Currency')}
          onLanguagePress={() => linkTo('Language')}
          onLounchScreenPress={() => linkTo('LaunchScreen')}
          onScreenThemePress={() => linkTo('ScreenTheme')}
        />
      </SurfaceWrap>
      <SurfaceWrap title={t(`setting.support`)} parentPaddingZero fontML>
        <List>
          <List.Row left={t('setting.app version')} right={APP_VERSION} />
        </List>
      </SurfaceWrap>
    </ScrollView>
  );
};

export default Overview;

const TouchableProfile = styled.TouchableHighlight`
  height: 60px;
  padding: 0 ${({ theme }) => theme.content.spacing};
  justify-content: center;
`;

const IconWrap = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.base.text[300]};
  margin-right: 16px;
`;
