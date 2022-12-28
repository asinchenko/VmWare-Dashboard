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
    let totalContractValues = 0;
    resourcesToCustomers.map((client, index) => {
      clientName = Object.keys(client)[0];
      let resultValue = CalculateMainPageResources(client[clientName].cpu, client[clientName].ram, client[clientName].storage.ssd, client[clientName].storage.fc, client[clientName].storage.nl, 
      cpuTotalAmount, ramTotalAmount, storageTotalSSDAmount, storageTotalFCAmount, storageTotalNLAmount);
      totalContractValues = totalContractValues + CalculateMainPageResources(client[clientName].contract.cpu, client[clientName].contract.ram, client[clientName].contract.ssd, client[clientName].contract.fc, client[clientName].contract.nl, 
          cpuTotalAmount, ramTotalAmount, storageTotalSSDAmount, storageTotalFCAmount, storageTotalNLAmount);
      console.log(totalContractValues, client[clientName].contract)
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
    stackedMainData.push([{x:'Astana DC', y: totalContractValues}]);
    stackedMainData.push([{x:'Astana DC', y: 100-(usedResources+totalContractValues)}]);
    stackedMainSeries.push({ dataSource: stackedMainData[stackedMainData.length - 2],
      xName: 'x',  
      yName: 'y',
      name: 'Резерв Клиенты',
      type: 'StackingBar',
      background: 'blue',
      opacity:'0.5',
      fill: '#FFBB00',
    });
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