import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, LayoutChangeEvent, Dimensions } from "react-native";
import { Line ,VictoryArea, Selection, VictoryBar,VictoryTooltip, VictoryAxis,VictoryVoronoiContainer,VictoryCursorContainer,VictoryScatter,VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { VictoryContainerProps, CoordinatesPropType, CallbackArgs } from "victory-core";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import * as array from 'd3-array'
import * as d3 from 'd3';
import * as shape from 'd3-shape';
import { active } from "d3";
const path = require('svg-path-properties');

type ChartProps = {
  data: [number[]],
  // onCursorChange?: (value:any, props:any) => any,
}

const { width } = Dimensions.get('window');
const LineChart = ({data}: ChartProps) => {
  const [cursorValue, setCursorValue] = useState({
    value: 1000,
    time: 1000
  });
  const [yMin, setYMin ] = useState(0);
  const [yMax, setYMax ] = useState(0);
  const [height, setHeight] = useState(0);
  const [activePoint, setActivePoint] = useState<any>(null);
  const [timestamp, setTimestamp] = useState<any>(null);

  useEffect(() => {
    let yMin = 10000000000000
    let yMax = -10000000000000
    data.map((data)=>{
      if(data[1] < yMin) yMin = data[1]
      if(data[1] > yMax) yMax = data[1]
    })
    setYMin(yMin);
    setYMax(yMax);
  }, [])

  useEffect(() => {
    if(activePoint) {
      const date = new Date(activePoint.x );
      const days = date.getDay();
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      setTimestamp(days + '일' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
    }
  }, [activePoint])

  const handleCursorChange = (value:any, props:any) => {
    const mappedData = data.filter((dt)=> (dt[0] >= props.domain.x[0] && dt[0] <= props.domain.x[1])).map((item, index) => ({
            y: item[1],
            x: item[0],
        }))
    //invert range to support svg coordinate system
    const yScale = d3.scaleLinear
    const xScale = d3.scaleTime

    const yValues = mappedData.map(item => item.y)
    const xValues = mappedData.map(item => item.x)

    const yExtent = array.extent([ ...yValues, yMin, yMax ])
    const xExtent = array.extent([ ...xValues ])
    // axis 그리기
    const y = yScale()
        .domain(yExtent as [number, number])
        .range([ height - 0, 0 ])
    const y2 = yScale()
        .domain([ height - 0, 0 ])
        .range(yExtent as any)
    const x = xScale()
        .domain(xExtent as any)
        .range([ props.children[0].props.padding.left, props.width - props.children[0].props.padding.right ])

    const x2 = xScale()
        .domain([ props.children[0].props.padding.left, props.width - props.children[0].props.padding.right ])
        .range(xExtent as any)
    // 선 그리기
    const paths = createPaths({
        data: mappedData,
        x,
        y,
    })
    const obj = {
      x: value ? props.scale.x(value) : 0,
      y: 0
    }
    var pos:any = pressOut(paths, obj, x2, y2, true)
    if(pos.y !== null)
      setActivePoint({x: pos.x, y: parseFloat(pos.y)})
    if(value === null) 
      setActivePoint(null);
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { nativeEvent: { layout: { height, width } } } = event
    setHeight(height)
  }

  const pressOut = (paths:any, chartLine:any, x2:any, y2:any, func:boolean) => {
    var pos:any = 0
    if(chartLine){
        let properties = path.svgPathProperties(paths.path);
        let length = properties.getTotalLength();
        let start = 0
        let end = length
        let target = (start + end) / 2
        
        let count = 0
        // Walk along the path using binary search 
        // to locate the point with the supplied x value

        while ((target >= start && target <= length) && count < 300) {
          pos = properties.getPointAtLength(target)
          // use a threshold instead of strict equality 
          // to handle javascript floating point precision
          if (Math.abs(pos.x - chartLine.x) < 1) {
          // console.log('DEBUG 10', count++)
            pos.y = y2(pos.y).toFixed(2).toString()
            pos.x = x2(pos.x)
            return pos
          } else if (pos.x > chartLine.x) {
            end = target
          } else {
            // start = target
          }
          target = (start + end) / 2
          count++
        }
        pos.y = pos.y ? parseFloat(y2(pos.y)) : null
        pos.x = x2(pos.x)

        return pos
    }
    if(func) return 0
  }
  
  const createPaths = ({ data, x, y }:any) => {
    const line = shape.line()
        .x((d:any) => x(d.x))
        .y((d:any) => y(d.y))
        .defined((item:any) => typeof item.y === 'number')
        .curve(d3.curveBasis)(data)

    const ppt = path.svgPathProperties(line);
    const length = ppt.getTotalLength();
    const coordinate = ppt.getPointAtLength(length);
    console.log(coordinate);

    return {
        path: line,
        line,
    }
}

  return (
    <View 
      style={{paddingTop: 50}}
      onLayout={onLayout}
    >
      {activePoint ? 
      <View style={{marginLeft: 20}}>
        <Text style={{color:'white'}}>
          {timestamp}
        </Text>
        <Text style={{color: 'white'}}>
          {activePoint.y}
        </Text>
        </View>
        : null
      }
      <VictoryChart 
        width={width}
        height={400}
        scale={{x: "time", y: 'linear'}}
        containerComponent={
          <VictoryCursorContainer
            events={{
              onTouchMove: (evt) => {
                const { x, y } = Selection.getSVGEventCoordinates(evt);
                console.log(x,y)
              }
            }}
            cursorComponent={
              <Line 
                style={{ stroke:'white'}}
                events={{
                  ontouchmove: (evt:any) => {
                    console.log(evt)
                  }
                }}
              />
            }
            onCursorChange={handleCursorChange}
            cursorDimension="x"
          />
        }
      >
        <VictoryLine 
          style={{
            data: {
              stroke: 'purple',
            }
          }}
          animate 
          data={data.slice(-7)} 
          x={0}
          y={1}
          interpolation="basis"
        />
        <VictoryAxis 
        standalone={false}
          style={{ 
            axis: {
              stroke: "transparent",
              color: 'white'
            },
            ticks: {
              stroke: "transparent",
              color: 'white'
            },
          }} 
        />
        <VictoryAxis 
          dependentAxis
          style={{ 
            ticks: {
              color:'white',
              stroke:'white',
              fill: 'white'
            },
            tickLabels: {
              position: 'absolute',
              color:'white',
              fill: 'white',
            },
            axis: {
              stroke: 'transparent'
            },
            grid: {stroke: 'rgba(255,255,255,.1)'},
            axisLabel: {stroke: 'white'}
          }} 
        />
        
        {activePoint 
        ? <VictoryScatter 
            style={{
              data: {fill: 'rgba(255,255,255,0.2)'}
            }}
            size={7}
            data={[activePoint]} 
          />
        : null}
      </VictoryChart>
    </View>
  );
}

export default LineChart;
