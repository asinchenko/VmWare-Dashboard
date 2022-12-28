import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import {MainChart, ResourcePool} from '../components';
import {hardwareEquipmentData} from '../data/hardwareGroup';
import {useStateContext} from '../contexts/ContextProvider';

import { GiCoinsPile } from 'react-icons/gi';

const Dashboard = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `newPath`; 
    navigate(path);
  };
  function formatBytes(kbytes, decimals = 2, value=0) {
    if (!+kbytes) return '0 B'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(kbytes*1024*1024) / Math.log(k))
    if (value > 0){
      return `${value - parseFloat((kbytes*1024*1024 / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }else{
      return `${parseFloat((kbytes*1024*1024 / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }};

  const {resourcesToCustomers,
    cpuTotalAmount,
    ramTotalAmount, 
    storageTotalSSDAmount, 
    storageTotalFCAmount,
    storageTotalNLAmount,
  } = useStateContext();
  var cpuPieChart, cpuChartDataNew, ramPieChart, ramChartDataNew, ramPieChart, storagePieChart, storageChartDataNew;
  cpuPieChart=[]; cpuChartDataNew=[]; ramPieChart=[]; ramChartDataNew=[]; ramPieChart=[]; storagePieChart=[]; storageChartDataNew=[];

  var cpuConsumedAmount = 0;
  var ramConsumedAmount = 0;
  var storageConsumedSSDAmount = 0;
  var storageConsumedFCAmount = 0;
  var storageConsumedNLAmount = 0;

  calculateCPURAM("cpu");
  calculateCPURAM("ram");
  calculateStorage();
  correctChartData(ramPieChart, "pie")
  correctChartData(ramChartDataNew, "ramStacked")
  //from GB into Formated GB/TB
  var ramTotalAmountFormated = formatBytes(ramTotalAmount*1024);
  var ramConsumedAmountFormated = formatBytes(ramConsumedAmount)
  var ramEmptyAmountFormated = formatBytes(ramTotalAmount*1024 - ramConsumedAmount)
  //from GB into Formated GB/TB
  var storageTotalSSDAmountFormated = formatBytes(storageTotalSSDAmount*1024);  
  var storageTotalFCAmountFormated = formatBytes(storageTotalFCAmount*1024);
  var storageTotalNLAmountFormated = formatBytes(storageTotalNLAmount*1024);
  var storageFreeSSDAmountFormated = formatBytes(storageTotalSSDAmount*1024 - storageConsumedSSDAmount*1024);
  var storageFreeFCAmountFormated = formatBytes(storageTotalFCAmount*1024 - storageConsumedFCAmount*1024);
  var storageFreeNLAmountFormated = formatBytes(storageTotalNLAmount*1024 - storageConsumedNLAmount*1024);
  var storageUsedSSDAmountFormated = formatBytes(storageConsumedSSDAmount*1024);
  var storageUsedFCAmountFormated = formatBytes(storageConsumedFCAmount*1024);
  var storageUsedNLAmountFormated = formatBytes(storageConsumedNLAmount*1024);

  let totalContractValues = {cpu:0, ram:0, ssd:0, fc:0, nl:0};
  if (resourcesToCustomers.length != undefined) {
    let clientName;
    resourcesToCustomers.map((client, index) => {
      clientName = Object.keys(client)[0];
      totalContractValues.cpu += client[clientName].contract.cpu;
      totalContractValues.ram += client[clientName].contract.ram;
      totalContractValues.ssd += client[clientName].contract.ssd;
      totalContractValues.nl += client[clientName].contract.nl;
      totalContractValues.fc += client[clientName].contract.fc;
    });
    totalContractValues.ssdFormated = formatBytes(totalContractValues.ssd*1024);
    totalContractValues.fcFormated = formatBytes(totalContractValues.fc*1024);
    totalContractValues.nlFormated = formatBytes(totalContractValues.nl*1024);
    totalContractValues.ramFormated = formatBytes(totalContractValues.ram*1024);
  };
  console.log(totalContractValues)
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
  
  const cpuPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };
  
  const cpuPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 400,
    interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };
  const cpuCustomSeries = [
    { 
      dataSource: cpuChartDataNew[0],
      xName: 'x',
      yName: 'y',
      name: 'Выделено',
      type: 'StackingColumn',
      background: 'blue',
      fill: "#1984c5"
    },
    // { dataSource: cpuChartDataNew[1],
    //   xName: 'x',
    //   yName: 'y',
    //   name: 'Прописано',
    //   type: 'StackingColumn',
    //   background: 'red',
    //   fill: "#a7d5ed"
    // }
  ];

  const ramPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };
  
  const ramPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 2000,
    interval: 500,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };

  const ramCustomSeries = [
    { 
      dataSource: ramChartDataNew[0],
      xName: 'x',
      yName: 'y',
      name: 'Выделено',
      type: 'StackingColumn',
      background: 'blue',
      fill: "#4C9A2A"
    },
    // { dataSource: ramChartDataNew[1],
    //   xName: 'x',
    //   yName: 'y',
    //   name: 'Прописано',
    //   type: 'StackingColumn',
    //   background: 'red',
    //   fill: "#ACDF87"
    // }
  ];
  const storageCustomSeries = [
    { dataSource: storageChartDataNew[0],
      xName: 'x',
      yName: 'y',
      name: 'SSD Занято',
      type: 'StackingColumn',
      background: 'blue',
      fill: '#0184c7'
    },
    // { dataSource: storageChartDataNew[3],
    //   xName: 'x',
    //   yName: 'y',
    //   name: 'SSD Договор',
    //   type: 'StackingColumn',
    //   background: 'red',
    //   fill: "#38bdf8"
  
    // },
    { dataSource: storageChartDataNew[2],
      xName: 'x',
      yName: 'y',
      name: 'NL Занято',
      type: 'StackingColumn',
      background: 'red',
      fill: "#0d9488"
    },
    // { dataSource: storageChartDataNew[5],
    //   xName: 'x',
    //   yName: 'y',
    //   name: 'Nl Договор',
    //   type: 'StackingColumn',
    //   background: 'red',
    //   fill: "#2ed4c0"
    // },
    { dataSource: storageChartDataNew[1],
      xName: 'x',
      yName: 'y',
      name: 'FC Занято',
      type: 'StackingColumn',
      background: 'red',
      fill: "#ca8a04"
    },
    // { dataSource: storageChartDataNew[4],
    //   xName: 'x',
    //   yName: 'y',
    //   name: 'FC Договор',
    //   type: 'StackingColumn',
    //   background: 'red',
    //   fill: "#facc15"
    // },
  ];
  const storagePrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };
  
  const storagePrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 10000,
    interval: 1000,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '{value}',
  };

  return (
    <div className="mt-6">
      <div>
              <p className="font-bold text-gray-600 pl-12">Data-Center</p>
              <p className="font-bold text-gray-600 text-2xl pl-12">Astana</p>
      </div>
      <div className="">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg
          h-44 rounded-xl p-8 m-3 mb-20">
          {/* bg-hero-pattern */}
          <div className="justify-center">
            <div>
              <MainChart width="100%" height="200px"/> 
            </div>
          </div>
          {/* <div>
            <MainChart width="320px" height="360px"/> 
          </div> */}
          </div>
        </div>
      <div className="flex m-3 flex-wrap 
      justify-center gap-1 items-center">
        {hardwareEquipmentData.map((item)=> (
          <div
            key={item.title} className="bg-white 
            dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56
            p-4 pt-9 rounded 2xl flex flex-col items-center">
            <Link to={'../equipment/'+item.filter}><button type="button" 
            style={{color:item.iconColor, backgroundColor:item.iconBg}}
            className="text-3xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl hover:text-2xl">
            {item.icon}
            </button>
            </Link>
            <p className="mt-3">
              <span className="text-lg font-semibold ">{item.amount}</span>
              <span className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {item.title}
            </p>
            </div>  
        ))}
      </div>
    <div className="flex gap-10 flex-wrap justify-center">
      <div>
          <ResourcePool
          idpie="cpuPie"
          widthpie="140px"
          heightpie="140px"
          datapie={cpuPieChart}
          typepie="pie"
          idstacked="cpuStacked"
          widthstacked="260px"
          heightstacked="360px"
          maintitle="vCPU"
          totalContractValues={totalContractValues}
          totalamount={cpuTotalAmount}
          freeamount={cpuTotalAmount - cpuConsumedAmount}
          usedamount={cpuConsumedAmount}
          datasource={cpuCustomSeries}
          stackedPrimaryXAxis={cpuPrimaryXAxis}
          stackedPrimaryYAxis={cpuPrimaryYAxis}
          />
      </div>
      <div >
          <ResourcePool
          idpie="ramPie"
          widthpie="140px"
          heightpie="140px"
          datapie={ramPieChart}
          typepie="pie"
          idstacked="ramStacked"
          widthstacked="260px"
          heightstacked="360px"
          maintitle="Оперативная Память"
          totalContractValues={totalContractValues}
          totalamount={ramTotalAmountFormated}
          freeamount={ramEmptyAmountFormated}
          usedamount={ramConsumedAmountFormated}
          datasource={ramCustomSeries}
          stackedPrimaryXAxis={ramPrimaryXAxis}
          stackedPrimaryYAxis={ramPrimaryYAxis}
          />
      </div>
    </div>
    <div className="flex justify-center">
          <ResourcePool
          idpie="storagePie"
          widthpie="300px"
          heightpie="300px"
          datapie={storagePieChart}
          typepie="pie"
          idstacked="storageStacked"
          widthstacked="300px"
          heightstacked="360px"
          maintitle="Системы Хранения Данных"
          totalContractValues={totalContractValues}
          totalSSD={storageTotalSSDAmountFormated}
          totalFC={storageTotalFCAmountFormated}
          totalNL={storageTotalNLAmountFormated}
          freeSSD={storageFreeSSDAmountFormated}
          freeFC={storageFreeFCAmountFormated}
          freeNL={storageFreeNLAmountFormated}
          usedSSD={storageUsedSSDAmountFormated}
          usedFC={storageUsedFCAmountFormated}
          usedNL={storageUsedNLAmountFormated}
          datasource={storageCustomSeries}
          stackedPrimaryXAxis={storagePrimaryXAxis}
          stackedPrimaryYAxis={storagePrimaryYAxis}
          />
      </div>
  </div>
  )
  
  function calculateCPURAM(props) {
      let temp_list = [];
    if (resourcesToCustomers.length > 0){
      resourcesToCustomers.map(customer => {
      let cusomterName = Object.keys(customer)[0];
      props === "cpu" ? cpuConsumedAmount += customer[cusomterName].cpu: ramConsumedAmount += customer[cusomterName].ram;
      temp_list.push({x: Object.keys(customer)[0], y: props==="cpu" ? customer[cusomterName].cpu:customer[cusomterName].ram});
      props === "cpu" ? cpuPieChart.push({x: Object.keys(customer)[0], y: customer[cusomterName].cpu}) : ramPieChart.push({x: Object.keys(customer)[0], y: customer[cusomterName].ram});
      
    });
  };
    props==="cpu" ? cpuChartDataNew.push(temp_list) : ramChartDataNew.push(temp_list);
  };

  function calculateStorage() {
    let temp_list_ssd = [];
    let temp_list_fc = [];
    let temp_list_nl = [];
  if (resourcesToCustomers.length > 0){
    resourcesToCustomers.map(customer => {
    let cusomterName = Object.keys(customer)[0];

    storageConsumedSSDAmount += customer[cusomterName].storage.ssd;
    storageConsumedFCAmount += customer[cusomterName].storage.fc;
    storageConsumedNLAmount += customer[cusomterName].storage.nl;

    temp_list_ssd.push({
      x: Object.keys(customer)[0], y: customer[cusomterName].storage.ssd
    });
    temp_list_fc.push({
      x: Object.keys(customer)[0], y: customer[cusomterName].storage.fc
    });
    temp_list_nl.push({
      x: Object.keys(customer)[0], y: customer[cusomterName].storage.nl
    })

    storagePieChart.push({
      x: Object.keys(customer)[0] + " SSD", y: customer[cusomterName].storage.ssd
    });
    storagePieChart.push({
      x: Object.keys(customer)[0] + " FC", y: customer[cusomterName].storage.fc
    });
    storagePieChart.push({
      x: Object.keys(customer)[0] + " NL", y: customer[cusomterName].storage.nl
    });

  });
};
  storageChartDataNew.push(temp_list_ssd);
  storageChartDataNew.push(temp_list_fc);
  storageChartDataNew.push(temp_list_nl);
};

function correctChartData(anyChart, props) {
  if (props === "pie"){
    anyChart.map(x => {
      x.y = formatBytes(x.y).split(/(\s+)/)[0];
    });
  }else if (props === "ramStacked"){
    anyChart[0].map(x => {
      x.y = formatBytes(x.y).split(/(\s+)/)[0];
    });
  }
  
};
};



export default Dashboard