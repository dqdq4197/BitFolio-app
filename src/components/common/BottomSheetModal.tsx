import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components/native';
import { 
  BottomSheetModal, 
  BottomSheetBackgroundProps,
  BottomSheetModalProps,
  BottomSheetBackdrop,
  BottomSheetHandleProps 
} from '@gorhom/bottom-sheet';


interface ModalProps extends BottomSheetModalProps {}

const Handle: React.FC<BottomSheetHandleProps> = ({ animatedIndex, animatedPosition }) => {

  return (
    <HandleContainer>
      <LeftIndicator />
      <RightIndicator />
    </HandleContainer>
  );
};

const CustomBackground = ({ style }: BottomSheetBackgroundProps) => {
  return <BackgroundView style={style}/>
}

const BottomModal = forwardRef(({ 
  children, 
  snapPoints, 
  ...props 
}: ModalProps, ref:React.Ref<BottomSheetModal>) => {

  return (
    <>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={BottomSheetBackdrop}
        backgroundComponent={CustomBackground}
        handleComponent={Handle}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12
        }}
        {...props}
      >
        { children }
      </BottomSheetModal>
    </>
  )
})

export default BottomModal;

const BackgroundView = styled.View`
  background-color: ${({ theme }) => theme.base.background[200]};
  border-top-left-radius: ${({ theme }) => theme.border.l};
  border-top-right-radius: ${({ theme }) => theme.border.l};
`
const HandleContainer = styled.View`
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.base.background[200]};
  padding: 20px 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
const Indicator = css`
  position: absolute;
  width: 25px;
  height: 4px;
`
const LeftIndicator = styled.View`
  ${ Indicator }
  background-color: ${({ theme }) => theme.base.text[400]};
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  transform: translateX(-1px);
`
const RightIndicator = styled.View`
  ${ Indicator }
  background-color: ${({ theme }) => theme.base.text[400]};
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  transform: translateX(1px);
`