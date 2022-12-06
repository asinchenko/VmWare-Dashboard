import React from 'react'
import { ChartComponent, SeriesCollectionDirective, 
    SeriesDirective, Inject, Legend, 
    Category, StackingColumnSeries, 
    Tooltip } from '@syncfusion/ej2-react-charts';
import {useStateContext} from '../../contexts/ContextProvider'

const Stacked = ({id, width, height, datasource, stackedPrimaryXAxis, stackedPrimaryYAxis}) => {
  const {currentMode} = useStateContext();
  const newColor = currentMode === 'Dark' ? 'rgb(51,55,62)' : 'white'
  return (
    <ChartComponent 
    background={newColor}
    width={width} height={height} id={id}
    chartArea={{border:{width:0}, background : newColor}}
    primaryYAxis={stackedPrimaryYAxis}
    primaryXAxis={stackedPrimaryXAxis}
    tooltip={{enable:true}}
    legendSettings={{background : 'white'}}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      <SeriesCollectionDirective> 
        {datasource.map((item, index) => <SeriesDirective key={index}
        {...item}
        />)}
      </SeriesCollectionDirective>

    </ChartComponent>
  )
}

export default Stacked