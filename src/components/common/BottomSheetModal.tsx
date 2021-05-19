import React, { forwardRef, useEffect, useState } from 'react';
import { Dimensions, Modal } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

const { width, height} = Dimensions.get('window');

interface ModalProps  {
  children: React.ReactNode;
  snapPoints?: string[];
  visible: boolean;
}

const BottomModal = forwardRef(({ 
  children, 
  snapPoints=['25%', '50%'], 
  visible,
  ...props 
}: ModalProps, ref:React.Ref<BottomSheetModal>) => {

  const [ss, sset] =useState(false);
  // const animationConfigs = useBottomSheetSpringConfigs({
  //   damping: 80,
  //   overshootClamping: true,
  //   restDisplacementThreshold: 0.1,
  //   restSpeedThreshold: 0.1,
  //   stiffness: 500,
  // });Z
  useEffect(() => {
    // return () => ref!.current?.dismiss();
    console.log(visible)
  }, [visible])
  return (
    <>
        {/* {ss && <View/> } */}
        <BottomSheetModal
          ref={ref}
          // backdropComponent={View}
          handleHeight={height} 
          snapPoints={snapPoints}
          // animationConfigs={animationConfigs}
          {...props}
          onChange={(event) => {
            if(event === -1) {
              sset(false);
            } else {
              sset(true)
            }
          }}
        >
          { children }
        </BottomSheetModal>
    </>
  )
})

export default BottomModal;

const View = styled.View`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  width: ${width}px;
  height: ${height}px;
  z-index: 9999;
`

const Dummy = styled.View`
  width: 50px;
  height: 50px;
  background-color: red;
`