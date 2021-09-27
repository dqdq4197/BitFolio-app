import React from 'react';
import styled from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { FocusedView, SettingsType } from './FormModal';
import Text from '/components/common/Text';



type SelectionBar = {
  onSwitchFocusView: (key: FocusedView) => void
  focusedView: FocusedView
  SETTINGS:SettingsType[]
  SELECT_TAB_HEIGHT: number
}

const SettingsSelectionBar = ({ 
  onSwitchFocusView, 
  focusedView,
  SETTINGS,
  SELECT_TAB_HEIGHT
}: SelectionBar) => {

  const { theme } = useGlobalTheme();
  return (
    <SelectionBarContainer
      height={SELECT_TAB_HEIGHT}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: parseInt(theme.content.spacing)
      }}
    >
      <SelectionBarWrap>
        { SETTINGS.map(setting => {
          const isFocused = setting.key === focusedView;
          return (
            <SelectionTab 
              key={setting.key}
              activeOpacity={0.6}
              onPress={() => onSwitchFocusView(setting.key)}
              isFocused={isFocused}
            >
              { setting.icon(isFocused ? theme.base.background[200] : theme.base.text[200]) }
              <SettingLabelText 
                fontML 
                bold 
                margin="0 0 0 5px"
                isFocused={isFocused}
              >
                { setting.name }
              </SettingLabelText> 
            </SelectionTab>
          )
        })}
      </SelectionBarWrap>
    </SelectionBarContainer>
  )
}

export default SettingsSelectionBar;

type ContainerProps = {
  height: number
}

type SelectionProps = {
  isFocused: boolean;
}

const SelectionBarContainer = styled.ScrollView<ContainerProps>`
  height: ${({ height }) => height}px;
`

const SelectionBarWrap = styled.View`
  flex-direction: row;
`

const SelectionTab = styled.TouchableOpacity<SelectionProps>`
  flex-direction: row;
  height: 30px;
  padding: 0 12px;
  background-color: ${({ isFocused, theme }) => 
    isFocused ? theme.base.text[200] : theme.base.background[300]};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: ${({ theme }) => theme.border.m};
  /* border-color: ${({ isFocused, theme }) => 
    isFocused ? theme.base.primaryColor : 'transparent'}; */
  /* border-width: 1px; */
`

const SettingLabelText = styled(Text)<SelectionProps>`
  color: ${({ isFocused, theme }) => 
    isFocused ? theme.base.background[200] : theme.base.text[200]  
  };
` 