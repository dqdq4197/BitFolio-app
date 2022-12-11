import React, { useEffect, useRef, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';

import { useAppDispatch, useAppSelector } from '/hooks/useRedux';
import { changeWatchList } from '/store/slices/baseSetting';

type IconProps = {
  id: string;
};

const WatchListIcon = ({ id }: IconProps) => {
  const { watchList } = useAppSelector(state => state.baseSettingReducer);
  const [isRendered, setIsRendered] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const dispatch = useAppDispatch();

  const handleHeartPress = () => {
    dispatch(changeWatchList(id));
    Haptics.impactAsync();
    if (isActive) {
      animationRef.current?.reset();
    } else {
      animationRef.current?.play(20, 140);
    }
  };

  const isActive = useMemo(() => {
    return watchList.includes(id);
  }, [id, watchList]);

  useEffect(() => {
    if (!isRendered) {
      setIsRendered(true);
      if (isActive) {
        animationRef.current?.play(130, 130);
      }
    }
  }, [isActive, isRendered]);

  return (
    <Container onPress={handleHeartPress}>
      <LottieView
        ref={animationRef}
        source={require('../../../assets/lottie/watchListIcon.json')}
        style={{
          width: 56,
          height: 56,
          transform: [
            {
              translateX: -6,
            },
            { translateY: -6 },
          ],
        }}
        loop={false}
      />
    </Container>
  );
};

export default WatchListIcon;

const Container = styled.Pressable`
  width: 28px;
  height: 35px;
`;
