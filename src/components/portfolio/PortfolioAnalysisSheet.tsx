import React from 'react';
import { Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import useGlobalTheme from '/hooks/useGlobalTheme'
import { PortfolioStatsType } from '/hooks/usePortfolioStats';
import { useAppSelector, useAppDispatch, shallowEqual } from '/hooks/useRedux';
import { changeAnalysisActiveTab, onHideAnalysisSheet, ActiveTabType } from '/store/portfolio';
import CommonAnalysis from './CommonAnalysis';
import Text from '/components/common/Text';
import SurfaceWrap from '/components/common/SurfaceWrap';
import GlobalIndicator from '/components/common/GlobalIndicator';
import AllocationView from './AllocationView';
import StatisticsView from './StatisticsView';
import { usePortfolioContext } from './PortfolioDataContext'



Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

type EmptyViewProps = {
  isLoading: boolean
}

type TabProps = {
  tabKey: ActiveTabType
  title: string
  icon: React.ReactNode
  isActive: boolean
  onPress: (title: ActiveTabType) => void
}

type SheetProps = {
  portfolioStats: PortfolioStatsType | null
}

const Tab = ({ tabKey, title, icon, isActive, onPress }: TabProps) => {
  return (
    <TabButton 
      activeOpacity={0.6} 
      isActive={isActive}
      onPress={() => onPress(tabKey)}
    >
      <IconWrap>
        { icon }
      </IconWrap>
      <CustomText 
        color100 
        bold 
        fontML
        isActive={isActive}
      >
        { title }
      </CustomText>
    </TabButton>
  )
}

const EmptyView = ({ isLoading }: EmptyViewProps) => {
  const { theme } = useGlobalTheme();
  const { t } = useTranslation();

  return (
    <EmptyViewContainer>
      { !isLoading 
        ? <>
            <MaterialCommunityIcons 
              name="text-box-search-outline" 
              size={32} 
              color={ theme.base.text[300] }
            />
            <Text fontML bold margin="10px 0 0 0">
              { t(`coinDetail.there is no transaction history`) }
            </Text>
            <Text margin="10px 0 0 0" bold color300>
              { t(`coinDetail.add your first transaction`) }
            </Text>
          </>
        : <GlobalIndicator 
            isLoaded={false}
            size="large"
            transparent
          />
      }
    </EmptyViewContainer>
  )
}

const PortfolioAnalysisSheet = ({ portfolioStats }: SheetProps) => {
  
  const { theme } = useGlobalTheme();
  const dispatch = useAppDispatch();
  const { isLoading } = usePortfolioContext();
  const { portfolio, activeIndex } = useAppSelector(state => ({
    portfolio: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex
  }), shallowEqual)
  const { 
    isHideAnalysisSheet: isHide, 
    analysisActiveTab: activeTab,
  } = portfolio[activeIndex];

  const handleTabButtonPress = (tabKey: ActiveTabType) => {
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
    dispatch(changeAnalysisActiveTab(tabKey))
    isHide && dispatch(onHideAnalysisSheet(false))
  }

  const handleHideButtonPress = () => {
    dispatch(onHideAnalysisSheet(!isHide))
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
        portfolio_change_percentage_24h={portfolioStats?.portfolio_change_percentage_24h}
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
            tabKey="allocation"
            title="Allocation"
            icon={
              <MaterialCommunityIcons
                name="chart-arc" 
                size={20} 
                color={
                  activeTab === 'allocation'
                    ? theme.base.text[100]
                    : theme.base.text[200]
                } 
              />
            }
            isActive={activeTab === 'allocation'}
            onPress={handleTabButtonPress}
          />
          <Tab 
            tabKey="statistics"
            title="Statistics"
            icon={
              <Ionicons
                name="analytics" 
                size={18} 
                color={
                  activeTab === 'statistics'
                    ? theme.base.text[100]
                    : theme.base.text[200]
                } 
              />
            }
            isActive={activeTab === 'statistics'}
            onPress={handleTabButtonPress}
          />
        </TabContainer>
        { !isHide && (
          <ContentWrap
            as={Animated.View}
          >
            { portfolioStats && !isLoading
              ? Object.entries(portfolioStats.coins).length === 0
                ? <EmptyView isLoading={false} />
                : activeTab === 'allocation'
                  ? <AllocationView 
                      coins={portfolioStats.coins}
                      tatalCosts={portfolioStats?.total_costs}
                    />
                  : <StatisticsView 
                      coins={portfolioStats.coins}
                      portfolio_all_time_pl={portfolioStats?.portfolio_all_time_pl}
                      portfolio_all_time_pl_percentage={portfolioStats?.portfolio_all_time_pl_percentage}
                    />
              : <EmptyView isLoading={true} />
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

type ButtonProps = {
  isActive: boolean
}

const TabContainer = styled.View`
  flex-direction: row;
  height: 45px;
  padding: 0 ${({ theme }) => theme.content.spacing};
  align-items: center;
  justify-content: space-evenly;
`

const TabButton = styled.TouchableOpacity<ButtonProps>`
  flex-direction: row;
  width: 45%;
  height: 90%;
  border-radius: ${({ theme }) => theme.border.ml};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isActive }) => isActive
    ? theme.base.background[300]
    : theme.base.background[200]
  };
  ${({ theme, isActive}) => isActive && (
    `border: 1px solid ${theme.base.primaryColor}`
  )};
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

const CustomText = styled(Text)<ButtonProps>`
  color: ${({ theme, isActive }) => isActive 
    ? theme.base.text[100]
    : theme.base.text[200]
  };
`

const EmptyViewContainer = styled.View`
  height: 150px;
  justify-content: center;
  align-items: center;
`