export const storageChartData = [
  [
    { x: 'Jan', y: 132 },
    { x: 'Feb', y: 140 },
    { x: 'Mar', y: 160 },
    { x: 'Apr', y: 180 },
    { x: 'May', y: 150 },
    { x: 'Jun', y: 155 },
    { x: 'July', y: 140 },
    
  ],
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 60 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 70 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 170 },
    { x: 'July', y: 159.9 },
  ],
];

export const storageCustomSeries = [

  { dataSource: storageChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Budget',
    type: 'StackingColumn',
    background: 'blue',
    fill: '#ffb400'
    

  },

  { dataSource: storageChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Expense',
    type: 'StackingColumn',
    background: 'red',
    fill: "#a57c1b"

  },

];