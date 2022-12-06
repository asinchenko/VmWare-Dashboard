import React from 'react'
import {DataLabel, Inject, PieSeries,
AccumulationDataLabel,
AccumulationTooltip,
AccumulationAnnotation,
AccumulationChartComponent, 
AccumulationSeriesCollectionDirective, 
AccumulationSeriesDirective,} from '@syncfusion/ej2-react-charts';
import {useStateContext} from '../../contexts/ContextProvider'

const PieChart = ({id, height, width, data, type}) => {
    const {currentMode} = useStateContext();
    return (
      <AccumulationChartComponent
      id={id}
      height={height}
      width={width}
      chartArea={{border: {width:0}}}
      tooltip={{enable:true}}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      >
        <Inject services={[
          DataLabel,
          AccumulationDataLabel, AccumulationTooltip, PieSeries, AccumulationAnnotation
        ]} />
        <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective 
        dataSource={data} xName='x' yName='y' 
        type={type}
        //dataLabel={{visible:true, font:{size: "24px"},
        //position:'Outside'}}
        >
        </AccumulationSeriesDirective>
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    )
}
export default PieChart