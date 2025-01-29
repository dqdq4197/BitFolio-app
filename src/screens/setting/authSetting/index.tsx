import React from 'react'

import GeneralTemplate from '/components/GeneralTemplate'
import Currency from '/components/setting/Currency'

/**
 * 비밀 번호 변경
 * 이메일 변경
 * 닉네임 변경 (displayName, uid)
 * 프로필 사진 변경
 */
const AuthSettingScreen = () => {
  return (
    <GeneralTemplate>
      <Currency />
    </GeneralTemplate>
  )
}

export default AuthSettingScreen
