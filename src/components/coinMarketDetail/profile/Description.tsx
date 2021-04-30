import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';



type DescriptionProps = {
  data: string,
}
const Description = ({ data }:DescriptionProps) => {

  return (
    <ScrollView>
      <Text fontML>
        { data }
      </Text>
    </ScrollView>
  )
}

export default Description;