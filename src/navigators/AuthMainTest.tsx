import AsyncBoundary from '/components/common/AsyncBoundary'

/**
 * @Deprecated
 */
const Auth = () => {
  return (
    <AsyncBoundary>
      <></>
      {/* <Text fontX onPress={() => navigation.navigate('Login')}>
          로그인하러 가기
        </Text>
        <Text fontX onPress={() => navigation.navigate('Language')}>
          Language
        </Text> */}
    </AsyncBoundary>
  )
}

export default Auth
