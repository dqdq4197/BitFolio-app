import styled, { css } from 'styled-components/native'

type LineProps = {
  fullWidth?: boolean
}

type StyledLineProps = {
  $fullWidth?: boolean
}

const HorizontalLine = ({ fullWidth = false }: LineProps) => {
  return <Line $fullWidth={fullWidth} />
}

export default HorizontalLine

const Line = styled.View<StyledLineProps>`
  border-bottom-color: ${({ theme }) => theme.base.background[200]};
  border-bottom-width: 1.5px;
  ${({ $fullWidth, theme }) =>
    $fullWidth &&
    css`
      margin: 0 -${theme.content.spacing};
    `}
`
