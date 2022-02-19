import React, { forwardRef } from 'react';
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import Text from '/components/common/Text';

type SheetProps = BottomSheetProps;

// Incomplete
// TODO. create scollable sheet
const CustomBottomSheet = forwardRef(
  ({ snapPoints, onChange }: SheetProps, ref: React.Ref<BottomSheet>) => {
    return (
      <BottomSheet
        ref={ref}
        detached
        snapPoints={snapPoints}
        onChange={onChange}
        enablePanDownToClose
        enableOverDrag
        enableContentPanningGesture
        enableHandlePanningGesture
        activeOffsetY={50}
      >
        <BottomSheetView>
          <Text>Awesome 🔥</Text>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default CustomBottomSheet;
