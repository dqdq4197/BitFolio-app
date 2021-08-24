import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons  } from '@expo/vector-icons';
import useGlobalTheme from '/hooks/useGlobalTheme'
import CommonAnalysis from './CommonAnalysis';
import Text from '/components/common/Text';
import { PortfolioStatsType } from '/hooks/usePortfolioStats';
import AllocationView from './AllocationView';
import AnalysisView from './AnalysisView';

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

  return (
    <Container>
      <CommonAnalysis 
        total_balance={portfolioStats?.total_balance}
        portfolio_all_time_pl_percentage={portfolioStats?.portfolio_all_time_pl_percentage}
        portfolio_change_24h={portfolioStats?.portfolio_change_24h}
      />
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
      { activeTab === 'allocation'
        ? <AllocationView 
            coins={portfolioStats?.coins}
            tatalCosts={portfolioStats?.total_costs}
          />
        : <AnalysisView />
      }
    </Container>
  )
}


export default PortfolioAnalysisSheet;

const Container = styled.View`
  width: 100%;
`

const TabContainer = styled.View`
  flex-direction: row;
  height: 45px;
  margin-top: ${({ theme }) => theme.content.blankSpacing};
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
