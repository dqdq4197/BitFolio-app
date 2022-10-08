import React, { PropsWithChildren } from 'react';
import { View, TouchableHighlightProps } from 'react-native';
import styled, { ThemeConsumer } from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';

import Text from './Text';

const Select = ({ children }: PropsWithChildren<unknown>) => {
  return <SelectContainer>{children}</SelectContainer>;
};

interface SelectOptionProps extends TouchableHighlightProps {
  title: string;
  subTitle?: string;
  enabled: boolean;
}

Select.Option = ({
  title,
  subTitle,
  enabled = false,
  ...rest
}: SelectOptionProps) => {
  return (
    <ThemeConsumer>
      {theme => (
        <OptionContainer
          {...rest}
          underlayColor={theme.base.underlayColor[100]}
        >
          <>
            <View>
              <Text fontML bold>
                {title}
              </Text>
              {subTitle && (
                <Text bold color300 margin="5px 0 0 0">
                  {subTitle}
                </Text>
              )}
            </View>
            <Octicons
              name="check"
              size={28}
              color={enabled ? theme.base.primaryColor : 'transparent'}
            />
          </>
        </OptionContainer>
      )}
    </ThemeConsumer>
  );
};

export default Select;

const SelectContainer = styled.View``;

const OptionContainer = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  padding: 0 ${({ theme }) => theme.content.spacing};
`;
