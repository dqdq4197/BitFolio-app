import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" {...props} fill="none" fillRule="evenodd" stroke="white" width={24} height={24} color="white" >
      <G data-name="Layer 2">
        <G data-name="bar-chart">
          <Path d="M24 0v24H0V0z" />
          <Path
            d="M12 4a1 1 0 00-1 1v15a1 1 0 002 0V5a1 1 0 00-1-1zM19 12a1 1 0 00-1 1v7a1 1 0 002 0v-7a1 1 0 00-1-1zM5 8a1 1 0 00-1 1v11a1 1 0 002 0V9a1 1 0 00-1-1z"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
