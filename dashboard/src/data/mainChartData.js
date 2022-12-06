const [y1, y2, y3, y4, y5] = [30, 10, 20, 15, 20]
export const stackedMainData = [
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
  
  export const stackedMainSeries = [
  
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
  
  export const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };
  
  export const stackedPrimaryYAxis = {
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
