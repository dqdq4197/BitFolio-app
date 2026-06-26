import React, {
  Children,
  cloneElement,
  CSSProperties,
  PropsWithChildren,
} from 'react'
import { View, ViewProps } from 'react-native'
import styled from 'styled-components/native'

interface StackProps extends ViewProps {
  direction?: CSSProperties['flexDirection']
  divider?: React.ReactElement
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  spacing?: number
  bgColor?: CSSProperties['backgroundColor'] | 'surface'
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  flex?: CSSProperties['flex']
  mx?: number
  my?: number
  mt?: number
  mb?: number
  mr?: number
  ml?: number
  px?: number | 'content'
  py?: number
  pt?: number
  pb?: number
  pr?: number
  pl?: number
}

/**
 * joinChildren([a, b, c], x);
 * [a, x, b, x, c]
 */
function joinChildren(
  children: React.ReactNode,
  separator: React.ReactElement
) {
  const childrenArray = Children.toArray(children).filter(
    Boolean
  ) as React.ReactNode[]

  return childrenArray.reduce((output, child, index) => {
    ;(output as React.ReactNode[]).push(child)

    if (index < childrenArray.length - 1) {
      ;(output as React.ReactNode[]).push(
        cloneElement(separator, {
          key: `separator-${index}`,
        })
      )
    }
    return output
  }, [])
}

function conditionalStyling(
  key: string,
  value?: string | number,
  prefix?: 'px'
) {
  if (value === undefined) return ``
  return `${key}: ${value}${prefix || ''}`
}

function Stack({
  ref,
  ...props
}: PropsWithChildren<StackProps> & { ref?: React.Ref<View> }) {
  const {
    direction,
    divider,
    alignItems,
    justifyContent,
    spacing,
    bgColor,
    width,
    height,
    flex,
    mx,
    my,
    mt,
    mb,
    mr,
    ml,
    px,
    py,
    pt,
    pb,
    pr,
    pl,
    children,
    ...rest
  } = props
  const styles = {
    direction,
    alignItems,
    justifyContent,
    spacing,
    bgColor,
    width,
    height,
    flex,
    mx,
    my,
    mt,
    mb,
    mr,
    ml,
    px,
    py,
    pt,
    pb,
    pr,
    pl,
  }
  return (
    <Container
      ref={ref}
      $direction={styles.direction}
      $alignItems={styles.alignItems}
      $justifyContent={styles.justifyContent}
      $spacing={styles.spacing}
      $bgColor={styles.bgColor}
      $width={styles.width}
      $height={styles.height}
      $flex={styles.flex}
      $mx={styles.mx}
      $my={styles.my}
      $mt={styles.mt}
      $mb={styles.mb}
      $mr={styles.mr}
      $ml={styles.ml}
      $px={styles.px}
      $py={styles.py}
      $pt={styles.pt}
      $pb={styles.pb}
      $pr={styles.pr}
      $pl={styles.pl}
      {...rest}
    >
      {divider ? joinChildren(children, divider) : children}
    </Container>
  )
}

export default Stack

type StyledStackProps = {
  $direction?: CSSProperties['flexDirection']
  $alignItems?: CSSProperties['alignItems']
  $justifyContent?: CSSProperties['justifyContent']
  $spacing?: number
  $bgColor?: CSSProperties['backgroundColor'] | 'surface'
  $width?: CSSProperties['width']
  $height?: CSSProperties['height']
  $flex?: CSSProperties['flex']
  $mx?: number
  $my?: number
  $mt?: number
  $mb?: number
  $mr?: number
  $ml?: number
  $px?: number | 'content'
  $py?: number
  $pt?: number
  $pb?: number
  $pr?: number
  $pl?: number
}

const Container = styled.View<StyledStackProps>`
  ${({
    $alignItems,
    $justifyContent,
    $direction = 'column',
    $bgColor,
    theme,
    $width,
    $height,
    $flex,
    $mb,
    $mt,
    $mx = 0,
    $my = 0,
    $mr,
    $ml,
    $px = 0,
    $py = 0,
    $pt,
    $pb,
    $pr,
    $pl,
  }) => `
    ${conditionalStyling('flex', $flex)};
    width: ${typeof $width === 'number' ? `${$width}px` : $width};
    height: ${typeof $height === 'number' ? `${$height}px` : $height};
    padding: ${$py}px ${$px === 'content' ? theme.content.spacing : `${$px}px`};
    margin: ${$my}px ${$mx}px;
    flex-direction: ${$direction};
    ${conditionalStyling('padding-top', $pt, 'px')};
    ${conditionalStyling('padding-bottom', $pb, 'px')};
    ${conditionalStyling('padding-left', $pl, 'px')};
    ${conditionalStyling('padding-right', $pr, 'px')};
    ${conditionalStyling('margin-top', $mt, 'px')};
    ${conditionalStyling('margin-bottom', $mb, 'px')};
    ${conditionalStyling('margin-right', $mr, 'px')};
    ${conditionalStyling('margin-left', $ml, 'px')};
    ${conditionalStyling('align-items', $alignItems)};
    ${conditionalStyling('justify-content', $justifyContent)};
    ${
      $bgColor &&
      `
      background-color: ${
        $bgColor === 'surface' ? theme.base.background.surface : $bgColor
      };
    `
    }
  `}
`
