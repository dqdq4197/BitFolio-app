import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme'
import { PortfolioStatsType } from '/hooks/usePortfolioStats';
import CommonAnalysis from './CommonAnalysis';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import AllocationView from './AllocationView';
import StatisticsView from './StatisticsView';


Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

type SheetProps = {
  portfolioStats: PortfolioStatsType | null
}

type TabProps = {
  title: string
  icon: React.ReactNode
}


const Tab = ({ title, icon }: TabProps) => {
  return (
    <TabButton activeOpacity={0.6}>
      <IconWrap>
        { icon }
      </IconWrap>
      <Text color100 bold fontML>
        { title }
      </Text>
    </TabButton>
  )
}

const PortfolioAnalysisSheet = ({ portfolioStats }: SheetProps) => {
  
  const { theme } = useGlobalTheme();
  const [activeTab, setActiveTab] = useState<'allocation' | 'analysis'>('allocation');
  const [isHide, setIsHide] = useState(false);

  const handleHideButtonPress = () => {
    setIsHide(!isHide)
    LayoutAnimation.configureNext({ 
      duration: 500, 
      create: { 
        duration:300,
        type: 'linear', 
        property: 'opacity' 
      }, 
      update: { 
        type: 'spring', 
        springDamping: 0.7
      }, 
      delete: { 
        duration:200,
        type: 'linear', 
        property: 'opacity' 
      } 
    });
  }

  return (
    <>
    <SurfaceWrap 
      marginTopZero
    >
      <CommonAnalysis 
        total_balance={portfolioStats?.total_balance}
        portfolio_all_time_pl_percentage={portfolioStats?.portfolio_all_time_pl_percentage}
        portfolio_change_24h={portfolioStats?.portfolio_change_24h}
      />
    </SurfaceWrap>
    <SurfaceWrap
      paddingBottomZero
      parentPaddingZero
    >
      <>
        <TabContainer>
          <Tab 
            title="Allocation"
            icon={<MaterialCommunityIcons name="chart-arc" size={20} color={theme.base.text[100]} />}
          />
          <Tab 
            title="Statistics"
            icon={<Ionicons name="analytics" size={18} color={theme.base.text[100]} />}
          />
        </TabContainer>
        { !isHide && (
          <ContentWrap
            as={Animated.View}
          >
            { activeTab === 'allocation'
              ? <AllocationView 
                  coins={portfolioStats?.coins}
                  tatalCosts={portfolioStats?.total_costs}
                />
              : <StatisticsView />
            }
          </ContentWrap>
        ) }
      </>
      <HideButton 
        underlayColor={theme.base.background[300]}
        onPress={handleHideButtonPress}
      >
        <Arrow isHide={isHide}>
          <MaterialIcons name="arrow-back-ios" size={24} color={theme.base.text[300]}  />
        </Arrow>
      </HideButton>
    </SurfaceWrap>
    </>
  )
}


export default PortfolioAnalysisSheet;

type HideType = {
  isHide: boolean
}

const TabContainer = styled.View`
  flex-direction: row;
  height: 45px;
  padding: 0 ${({ theme }) => theme.content.spacing};
  align-items: center;
  justify-content: space-evenly;
`

const TabButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 45%;
  height: 90%;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.ml};
  align-items: center;
  justify-content: center;
`

const IconWrap = styled.View`
  margin-right: 5px;
`

const ContentWrap = styled.View`
  padding: 0 ${({ theme }) => theme.content.spacing};
  overflow: hidden;
`

const HideButton = styled.TouchableHighlight`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`

const Arrow = styled.View<HideType>`
  top: ${({ isHide }) => isHide ? -2 : 6 }px;
  transform: ${({ isHide }) => isHide
    ? `rotate(270deg)`
    : `rotate(90deg)`
  }  scaleX(1.5);
`