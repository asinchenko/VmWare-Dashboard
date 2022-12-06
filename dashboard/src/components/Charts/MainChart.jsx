import React from 'react'
import { ChartComponent, SeriesCollectionDirective, 
    SeriesDirective, Inject, Legend, 
    Category, StackingBarSeries, 
    Tooltip } from '@syncfusion/ej2-react-charts';
import {useStateContext} from '../../contexts/ContextProvider'
import {CalculateMainPageResources} from '../ResourcePool/calculateMainPageResources'

const MainChart = ({width, height}) => {
  //Initialize chart, has to have default values to render as a StackingBar, not as a Stacking column
  var stackedMainData = [[{x:'Astana DC', y: 0}]];
  var stackedMainSeries = [{ dataSource: stackedMainData[0],
    xName: 'x',  
    yName: 'y',
    name: '',
    type: 'StackingBar',
    background: 'blue',
  }];
  const {currentMode,
    resourcesToCustomers,
    cpuTotalAmount, ramTotalAmount, storageTotalSSDAmount, storageTotalFCAmount, storageTotalNLAmount,
  } = useStateContext();
  const newColor = currentMode === 'Dark' ? 'rgb(51,55,62)' : 'white';
  if (resourcesToCustomers.length != undefined) {
    let clientName;
    resourcesToCustomers.map((client, index) => {
      clientName = Object.keys(client)[0];
      let resultValue = Math.round(CalculateMainPageResources(client[clientName].cpu, client[clientName].ram, client[clientName].storage.ssd, client[clientName].storage.fc, client[clientName].storage.nl, 
      cpuTotalAmount, ramTotalAmount, storageTotalSSDAmount, storageTotalFCAmount, storageTotalNLAmount));
      stackedMainData.push([{x:'Astana DC', y: resultValue}]);
      stackedMainSeries.push({ dataSource: stackedMainData[index+1],
        xName: 'x',  
        yName: 'y',
        name: clientName,
        type: 'StackingBar',
        background: 'blue',
      });
    });
    var usedResources = 0;
    stackedMainData.map(value => {
      if (value[0].y != NaN){
        usedResources += value[0].y
      }});
    stackedMainData.push([{x:'Astana DC', y: 100-usedResources}]);
    stackedMainSeries.push({ dataSource: stackedMainData[stackedMainData.length - 1],
      xName: 'x',  
      yName: 'y',
      name: 'Свободно',
      type: 'StackingBar',
      background: 'blue',
      opacity:'0.5',
      fill: '#D0D0D0',
    });
  }
  
  const [y1, y2, y3, y4, y5] = [30, 10, 20, 15, 20]
  const stackedMainData1 = [
    [
      { x: 'Astana DC', y: y1 },
    ],
    [
      { x: 'Astana DC', y: y2 },
    ],
    [
      { x: 'Astana DC', y: y3 },
    ],
    [
      { x: 'Astana DC', y: y4 },
    ],
    [
      { x: 'Astana DC', y: y5 },
    ],
    [
      { x: 'Astana DC', 
      y: 100-[y1,y2,y3,y4,y5].reduce((a, b) => a + b, 0),
      fill: '#4990C6'}, 
    ],
    ];
    
    const stackedMainSeries1 = [
    
      { dataSource: stackedMainData[0],
        xName: 'x',  
        yName: 'y',
        name: 'KazAvtoZhol',
        type: 'StackingBar',
        background: 'blue',
      },
      { dataSource: stackedMainData[1],
        xName: 'x',  
        yName: 'y',
        name: 'Business Analytics',
        type: 'StackingBar',
        background: 'blue',
      },
      { dataSource: stackedMainData[2],
        xName: 'x',  
        yName: 'y',
        name: 'Customer 1',
        type: 'StackingBar',
        background: 'blue',
      },
      { dataSource: stackedMainData[3],
        xName: 'x',  
        yName: 'y',
        name: 'Customer 2',
        type: 'StackingBar',
        background: 'blue',
      },
      { dataSource: stackedMainData[4],
        xName: 'x',  
        yName: 'y',
        name: 'Customer 3',
        type: 'StackingBar',
        background: 'blue',
      },
      { dataSource: stackedMainData[5],
        xName: 'x',  
        yName: 'y',
        name: 'Свободно',
        type: 'StackingBar',
        background: 'blue',
        opacity:'0.5',
        fill: '#D0D0D0',
      },
    ];
    
    const stackedPrimaryXAxis = {
      majorGridLines: { width: 0 },
      minorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
      interval: 1,
      lineStyle: { width: 0 },
      labelIntersectAction: 'Rotate45',
      valueType: 'Category',
    };
    
    const stackedPrimaryYAxis = {
      lineStyle: { width: 0 },
      minimum: 0,
      maximum: 100,
      interval: 20,
      majorTickLines: { width: 0 },
      majorGridLines: { width: 1 },
      minorGridLines: { width: 1 },
      minorTickLines: { width: 0 },
      labelFormat: '{value}',
    };
  return (
    <ChartComponent 
    title="Использование ресурсов"
    background={newColor}
    width={width} height={height} id="mainCharts"
    chartArea={{border:{width:0}, background : newColor}}
    primaryYAxis={stackedPrimaryYAxis}
    primaryXAxis={stackedPrimaryXAxis}
    tooltip={{enable:true}}
    legendSettings={{background : 'white'}}
    
    >
      <Inject services={[Legend, Category, StackingBarSeries, Tooltip]} />
      <SeriesCollectionDirective> 
        {stackedMainSeries.map((item, index) => <SeriesDirective key={index}
        {...item}
        />)}
      </SeriesCollectionDirective>

    </ChartComponent>
  )
}

export default MainChart