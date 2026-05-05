import LottieView from 'lottie-react-native'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components/native'

import useFirstMountState from '@/hooks/use-first-mount-state'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { changeWatchList } from '@/store/slices/base-setting'

type IconProps = {
  id: string
}

const WatchListIcon = ({ id }: IconProps) => {
  const { watchList } = useAppSelector(state => state.baseSettingReducer)
  const animationRef = useRef<LottieView>(null)
  const isFirstMount = useFirstMountState()

  const dispatch = useAppDispatch()

  const handleHeartPress = useCallback(() => {
    dispatch(changeWatchList(id))
  }, [id, dispatch])

  const isActive = useMemo(() => {
    return watchList.includes(id)
  }, [id, watchList])

  useEffect(() => {
    if (!animationRef.current) {
      return
    }

    if (isFirstMount && isActive) {
      animationRef.current.play(130, 130)
    }

    if (!isFirstMount) {
      if (isActive) {
        animationRef.current.play(20, 140)
      } else {
        animationRef.current.reset()
      }
    }
  }, [isActive, isFirstMount])

  return (
    <Container onPress={handleHeartPress}>
      <LottieView
        ref={animationRef}
        source={require('../../../assets/lottie/watchListIcon.json')}
        speed={2}
        style={{
          width: 60,
          height: 60,
          top: -15,
          left: -15,
        }}
        loop={false}
      />
    </Container>
  )
}

export default WatchListIcon

const Container = styled.Pressable`
  width: 30px;
  height: 30px;
`
