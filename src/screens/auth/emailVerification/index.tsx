import React from 'react'

import EmailVerification from '/components/auth/EmailVerification'
import AsyncBoundary from '/components/common/AsyncBoundary'
import GeneralTemplate from '/components/GeneralTemplate'

const EmailVerificationScreen = () => {
  return (
    <GeneralTemplate>
      <AsyncBoundary>
        <EmailVerification />
      </AsyncBoundary>
    </GeneralTemplate>
  )
}

export default EmailVerificationScreen
