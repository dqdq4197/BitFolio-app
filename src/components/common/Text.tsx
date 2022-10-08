import React from 'react';
import { TextProps, Animated } from 'react-native';
import styled from 'styled-components/native';

export interface TextStyleProps extends TextProps {
  as?: Animated.AnimatedComponent<typeof Text>;
  margin?: string;
  padding?: string;
  color?: string;
  lineHeight?: number;
  color100?: boolean;
  color300?: boolean;
  color400?: boolean;
  error?: boolean;
  primaryColor?: boolean;
  dark100?: boolean;
  light100?: boolean;
  removeColor?: boolean;
  fontXXXL?: boolean;
  fontXXL?: boolean;
  fontXL?: boolean;
  fontX?: boolean;
  fontL?: boolean;
  fontML?: boolean;
  fontM?: boolean;
  fontS?: boolean;
  fontXS?: boolean;
  light?: boolean;
  bold?: boolean;
  heavy?: boolean;
  black?: boolean;
  center?: boolean;
  right?: boolean;
  underline?: boolean;
  italic?: boolean;
  children?: any;
}

export default function TextStyle({ ...props }: TextStyleProps) {
  return <Text {...props}>{props.children}</Text>;
}

const Text = styled.Text<TextStyleProps>`
  margin: ${props => props.margin ?? 0};
  padding: ${props => props.padding ?? 0};
  ${props => props.lineHeight && `line-height: ${props.lineHeight}px`};

  ${({
    color,
    color100,
    color300,
    color400,
    error,
    primaryColor,
    removeColor,
    dark100,
    light100,
    theme,
  }) => {
    if (color) return `color: ${color}`;
    switch (true) {
      case color100:
        return `color: ${theme.base.text[100]}`;
      case color300:
        return `color: ${theme.base.text[300]}`;
      case color400:
        return `color: ${theme.base.text[400]}`;
      case primaryColor:
        return `color: ${theme.base.primaryColor}`;
      case removeColor:
        return `color: ${theme.base.removeColor}`;
      case dark100:
        return `color: ${theme.base.dark100}`;
      case light100:
        return `color: ${theme.base.light100}`;
      case error:
        return `color: ${theme.base.error}`;
      default:
        return `color: ${theme.base.text[200]}`;
    }
  }}

  ${({
    fontXXXL,
    fontXXL,
    fontXL,
    fontX,
    fontL,
    fontML,
    fontM,
    fontS,
    fontXS,
    theme,
  }) => {
    switch (true) {
      case fontXXXL:
        return `font-size: ${theme.size.font_xxxl}`;
      case fontXXL:
        return `font-size: ${theme.size.font_xxl}`;
      case fontXL:
        return `font-size: ${theme.size.font_xl}`;
      case fontX:
        return `font-size: ${theme.size.font_x}`;
      case fontL:
        return `font-size: ${theme.size.font_l}`;
      case fontML:
        return `font-size: ${theme.size.font_ml}`;
      case fontM:
        return `font-size: ${theme.size.font_m}`;
      case fontS:
        return `font-size: ${theme.size.font_s}`;
      case fontXS:
        return `font-size: ${theme.size.font_xs}`;

      default:
        return `font-size: ${theme.size.font_m}`;
    }
  }}

  ${({ light, bold, heavy, black }) => {
    switch (true) {
      case light:
        return `font-weight: 200`;
      case bold:
        return `font-weight: 600`;
      case heavy:
        return `font-weight: 700`;
      case black:
        return `font-weight: 900`;

      default:
        return `font-weight: 400`;
    }
  }}

  ${({ center, right }) => {
    switch (true) {
      case center:
        return `text-align: center`;
      case right:
        return `text-align: right`;

      default:
        return `text-align: left`;
    }
  }}

  ${({ italic, underline }) => {
    // eslint-disable-next-line default-case
    switch (true) {
      case italic:
        return `font-style: italic`;
      case underline:
        return `text-decoration-line: underline`;

      default:
        return ``;
    }
  }}
`;
