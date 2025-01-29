import LottieView from 'lottie-react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components/native'

import useFirstMountState from '/hooks/useFirstMountState'
import { useAppDispatch, useAppSelector } from '/hooks/useRedux'
import { changeWatchList } from '/store/slices/baseSetting'

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
          width: 62,
          height: 62,
          transform: [
            {
              translateX: -8,
            },
            { translateY: -8 },
          ],
        }}
        loop={false}
      />
    </Container>
  )
}

export default WatchListIcon

const Container = styled.Pressable`
  width: 28px;
  height: 35px;
`
