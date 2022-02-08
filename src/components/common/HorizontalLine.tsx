import React from 'react';
import styled, { css } from 'styled-components/native';

type LineProps = {
  fullWidth?: boolean;
};

const HorizontalLine = ({ fullWidth = false }: LineProps) => {
  return <Line fullWidth={fullWidth} />;
};

export default HorizontalLine;

const Line = styled.View<LineProps>`
  border-bottom-color: ${({ theme }) => theme.base.background[200]};
  border-bottom-width: 1.5px;
  ${props =>
    props.fullWidth &&
    css`
      margin: 0 -${props.theme.content.spacing};
    `}
`;
