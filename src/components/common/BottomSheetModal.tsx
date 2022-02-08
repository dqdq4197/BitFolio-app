import React, { forwardRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

type HandleProps = Pick<ModalProps, 'handleColor'>;
interface BackgroundProps extends Pick<ModalProps, 'bgColor'> {
  style: StyleProp<ViewStyle>;
}

interface ModalProps extends BottomSheetModalProps {
  bgColor?: string;
  handleColor?: string;
}

const $black = '#000';

const Handle = ({ handleColor }: HandleProps) => {
  return (
    <HandleContainer handleColor={handleColor}>
      <LeftIndicator />
      <RightIndicator />
    </HandleContainer>
  );
};

const CustomBackground = ({ style, bgColor }: BackgroundProps) => {
  return <BackgroundView style={style} bgColor={bgColor} />;
};

const BottomModal = forwardRef(
  (
    { children, snapPoints, bgColor, handleColor, ...props }: ModalProps,
    ref: React.Ref<BottomSheetModal>
  ) => {
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        backgroundComponent={({ style }) => (
          <CustomBackground style={style} bgColor={bgColor} />
        )}
        handleComponent={() => <Handle handleColor={handleColor} />}
        style={{
          shadowColor: $black,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
        }}
        {...props}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

export default BottomModal;

const BackgroundView = styled.View<Pick<ModalProps, 'bgColor'>>`
  background-color: ${({ theme, bgColor }) =>
    bgColor || theme.base.background[200]};
  border-top-left-radius: ${({ theme }) => theme.border.l};
  border-top-right-radius: ${({ theme }) => theme.border.l};
`;

const HandleContainer = styled.View<Pick<ModalProps, 'handleColor'>>`
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, handleColor }) =>
    handleColor || theme.base.background[200]};
  padding: 20px 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const Indicator = css`
  position: absolute;
  width: 25px;
  height: 4px;
`;

const LeftIndicator = styled.View`
  ${Indicator}
  background-color: ${({ theme }) => theme.base.text[400]};
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  transform: translateX(-1px);
`;

const RightIndicator = styled.View`
  ${Indicator}
  background-color: ${({ theme }) => theme.base.text[400]};
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  transform: translateX(1px);
`;
