import React, { forwardRef, useMemo } from 'react';
import { 
  BottomSheetModal, 
  BottomSheetBackgroundProps,
  BottomSheetModalProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

interface ModalProps extends BottomSheetModalProps {}

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
        {...props}
      >
        { children }
      </BottomSheetModal>
    </>
  )
})

export default BottomModal;

const BackgroundView = styled.View`
  background-color: ${({ theme }) => theme.base.background['surface']};
  border-top-left-radius: ${({ theme }) => theme.border.l};
  border-top-right-radius: ${({ theme }) => theme.border.l};
`