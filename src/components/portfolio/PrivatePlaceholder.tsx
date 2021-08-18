import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

type CircleProps = {
  diameter: number
  horizontalSpacing: number
  color100?: boolean
  color300?: boolean
  color400?: boolean
}

interface PlaceholderProps extends CircleProps {
  numberOfCircle: number
}

const PrivatePlaceholder = ({ 
  numberOfCircle,
  ...props
 }: PlaceholderProps) => {

  const [circles, setCircles] = useState<number[]>([]);
  
  useEffect(() => {
    setCircles(new Array(numberOfCircle).fill(1));
  }, [])

  return (
    <Container>
      { circles.map((_, i) =>  
        <Circle
          key={i} 
          { ...props }
        />
      ) }
    </Container>
  )
}

export default PrivatePlaceholder;

const Container = styled.View`
  flex-direction: row;
`

const Circle = styled.View<CircleProps>`
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  border-radius:  ${({ diameter }) => diameter / 2}px;;
  margin: 0 ${({ horizontalSpacing }) => horizontalSpacing}px;

  ${({ color100, color300, color400, theme }) => {
    switch (true) {
      case color100:
        return `background-color: ${theme.base.text[100]}`
      case color300:
        return `background-color: ${theme.base.text[300]}`  
      case color400:
        return `background-color: ${theme.base.text[400]}`  
        
      default:
        return `background-color: ${theme.base.text[200]}`  
    }
  }}
`