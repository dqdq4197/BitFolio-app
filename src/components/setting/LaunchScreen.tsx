import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector, useAppDispatch } from '/hooks/useRedux'
import { changeLaunchScreen } from '/store/slices/baseSetting'
import type { MainTabParamList } from '/types/navigation'

import SurfaceWrap from '/components/common/SurfaceWrap'
import Select from '/components/common/Select'
import Blank from './Blank'

const LaunchScreen = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { launchScreen } = useAppSelector((state) => state.baseSettingReducer)

  const onLaunchScreenChange = (key: keyof MainTabParamList) => {
    dispatch(changeLaunchScreen(key))
  }

  return (
    <SurfaceWrap
      title={t(`setting.launch screen settings`)}
      flex={1}
      parentPaddingZero
      marginTopZero
      fontML
    >
      <Select>
        <Select.Option
          onPress={() => onLaunchScreenChange('Portfolio')}
          title={t(`common.portfolio`)}
          enabled={launchScreen === 'Portfolio'}
        />
        <Select.Option
          onPress={() => onLaunchScreenChange('Home')}
          title={t(`common.home`)}
          enabled={launchScreen === 'Home'}
        />
        <Select.Option
          onPress={() => onLaunchScreenChange('News')}
          title={t(`common.news`)}
          enabled={launchScreen === 'News'}
        />
      </Select>
      <Blank />
    </SurfaceWrap>
  )
}

export default LaunchScreen
