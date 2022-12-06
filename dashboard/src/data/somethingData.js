export const somethingChartData = [
  [
    { x: 'Jan', y: 120 },
    { x: 'Feb', y: 140 },
    { x: 'Mar', y: 173 },
    { x: 'Apr', y: 180 },
    { x: 'May', y: 140 },
    { x: 'Jun', y: 160 },
    { x: 'July', y: 140 },
    
  ],
  [
    { x: 'Jan', y: 130 },
    { x: 'Feb', y: 100 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 170 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
];

export const somethingCustomSeries = [

  { dataSource: somethingChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Budget',
    type: 'StackingColumn',
    background: 'blue',
    fill: "#e27c7c"
    

  },

  { dataSource: somethingChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Expense',
    type: 'StackingColumn',
    background: 'red',
    fill: "#6d4b4b"

  },

];