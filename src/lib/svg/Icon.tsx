import React from 'react'
import { SvgXml, XmlProps } from 'react-native-svg'

interface BaseType {
  name: 'profile'
  fstColor?: string
  scdColor?: string
}

type SvgProps = BaseType & Omit<XmlProps, 'xml'>

export default function SvgComponent({
  name,
  fstColor = 'white',
  scdColor = 'white',
  ...rest
}: SvgProps) {
  const xmls = {
    profile: `
      <?xml version="1.0" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
      "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
     width="238.000000pt" height="250.000000pt" viewBox="0 0 238.000000 250.000000"
     preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,250.000000) scale(0.100000,-0.100000)"
    fill="${fstColor}" stroke="none">
    <path d="M1047 2110 c-215 -39 -407 -152 -538 -317 -230 -290 -251 -699 -50
    -1005 122 -187 287 -307 508 -370 113 -32 324 -32 438 0 312 89 536 317 622
    633 27 99 24 320 -5 422 -89 312 -306 530 -614 617 -82 24 -281 35 -361 20z
    m273 -84 c406 -73 693 -458 642 -861 -14 -109 -55 -229 -108 -316 -34 -57
    -148 -189 -163 -189 -3 0 -18 19 -33 43 -37 59 -143 159 -198 187 -81 41 -154
    61 -245 67 -187 11 -353 -64 -474 -215 -27 -33 -51 -67 -54 -74 -3 -9 -22 4
    -56 37 -164 157 -252 411 -223 640 22 176 86 312 205 441 184 197 446 287 707
    240z"/>
    <path d="M1120 1671 c-95 -21 -182 -88 -228 -176 -24 -44 -27 -62 -27 -145 0
    -83 3 -101 27 -145 32 -62 104 -130 166 -158 67 -30 188 -30 257 1 63 29 129
    92 163 157 24 44 27 61 27 145 0 83 -3 101 -27 145 -32 61 -104 130 -163 156
    -49 22 -144 32 -195 20z"/>
    </g>
    </svg>`,
  }

  return <SvgXml {...rest} xml={xmls[name]} />
}
