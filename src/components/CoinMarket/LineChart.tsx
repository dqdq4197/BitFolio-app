import React from "react";
import { StyleSheet, View } from "react-native";
import {VictoryBar,VictoryTooltip,VictoryVoronoiContainer,VictoryCursorContainer,VictoryScatter,VictoryLine, VictoryChart, VictoryTheme } from "victory-native";



const LineChart = ({data}:any) => {

  
  return (
    <View>
      <VictoryChart 
        style={{

        }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${datum[1]}`}
          />
        }
      >
        <VictoryLine 
          style={{
            data: {
              stroke: 'white',
            }
          }}
          
          animate 
          data={data.prices.slice(-8)} 
          x={0}
          y={1}
          interpolation="natural"
        />
      </VictoryChart>
    </View>
  );
}

export default LineChart;
