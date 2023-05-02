import React from 'react'
import {Stacked, PieChart} from '..'
import ToolTipHelper from './ToolTipHelper'

const ResourcePool = ({
  idpie,widthpie,heightpie,datapie,typepie,
  idstacked, widthstacked, heightstacked,
  maintitle, totalamount, freeamount, usedamount,
  datasource, stackedPrimaryXAxis, stackedPrimaryYAxis,
  totalSSD, totalFC, totalNL,
  freeSSD,  freeFC,  freeNL,
  usedSSD,  usedFC,  usedNL, totalContractValues
  }) => {
  return (
    <div>
      <div className="bg-white dark:text-gray-200
        dark:bg-secondary-dark-bg m-3 p-4 
        rounded-2xl ">
        <div className="">
          <div className="flex flex-nowrap justify-between">
            <p className="font-semibold text-xl">{maintitle}</p>
            <div className="flex items-center gap-4">
              {/* <p className="flex items-center gap-1 text-gray-600 hover:drop-shadow-xl">
                <span><GoPrimitiveDot/></span>
                <span>Занято</span>
              </p>
              <p className="flex items-center gap-1 text-green-600 hover:drop-shadow-xl">
                <span><GoPrimitiveDot/></span>
                <span>Свободно</span>
              </p>
              <p className="flex items-center gap-1 text-blue-600 hover:drop-shadow-xl">
                <span><GoPrimitiveDot/></span>
                <span>Необходимо</span>
              </p> */}
            </div>
          </div>
          <div className=" gap-10 flex flex-wrap justify-center items-center">
            <div className="border-r-1 border-color m-4 pr-4">
            {totalSSD != undefined ? 
            <div className="">
              <p className={totalSSD != undefined ? "flex justify-around":""}>
              {totalSSD != undefined ?<span className="text-xs text-gray-400">SSD</span>: ""}
              {totalSSD != undefined ?<span className="text-xs text-gray-400">FC</span>: ""}
              {totalSSD != undefined ?<span className="text-xs text-gray-400">NL</span>: ""}
              </p>
            </div>:""}
              <div>
              <p className={totalSSD != undefined ? "flex justify-between":""}>
                  {totalamount != undefined ?<span className="text-3xl font-semibold">{totalamount}</span>:""}
                  {totalSSD != undefined ?<span className="text-xl p-2 font-semibold">{totalSSD}</span>: <span></span>}
                  {totalFC != undefined ?<span className="text-xl p-2 font-semibold">{totalFC}</span>:<span></span>}
                  {totalNL != undefined ? <span className="text-xl font-semibold p-2">{totalNL}</span>: <span></span>}
                </p>
                <div className="mt-1 text-gray-500 flex gap-2 items-center">
                  <p>Общее количество</p>
                  {/* <div className="transition duration-500 hover:scale-125 bg-green-300 hover:bg-green-400 text-white font-semibold px-2 rounded-full"> */}
                  {/* <ToolTipHelper color="green"> </ToolTipHelper>  */}
                </div>
              </div>
              <div className="flex-col">
              <div>
                <div className="mt-6">
                {totalContractValues != undefined ? 
                  <div className="">
                    {maintitle != "vCPU" && maintitle != "Оперативная Память" ? 
                    <p className="flex justify-around">
                    {totalContractValues.ssdFormated != undefined ?<span className="text-xs text-gray-400">SSD</span>: ""}
                    {totalContractValues.fcFormated != undefined ?<span className="text-xs text-gray-400">FC</span>: ""}
                    {totalContractValues.nlFormated != undefined ?<span className="text-xs text-gray-400">NL</span>: ""}
                    </p>:""}
                  </div>:""}
                  <div>
                  <p className={totalContractValues != undefined ? "flex justify-between":""}>
                    {maintitle == "vCPU" ? <span className="text-3xl font-semibold">{totalContractValues.cpu}</span>: ""}
                    {maintitle === "Оперативная Память" ? <span className="text-3xl font-semibold">{totalContractValues.ramFormated}</span>: ""}
                    {maintitle === "Системы Хранения Данных" ? <span className="text-2xl p-2 font-semibold">{totalContractValues.ssdFormated}</span>: <span></span>}
                    {maintitle === "Системы Хранения Данных" ? <span className="text-2xl p-2 font-semibold">{totalContractValues.fcFormated}</span>:<span></span>}
                    {maintitle === "Системы Хранения Данных" ? <span className="text-2xl p-2 font-semibold">{totalContractValues.nlFormated}</span>: <span></span>}
                  </p>
                  </div>
                  <div className="flex">
                    <p className="text-gray-500 mt-1">
                      Зарезервировано
                    </p>
                    {/* <p className={totalContractValues != undefined ? "flex justify-between":""}>
                      {maintitle == "vCPU" ? <span className="text-3xl font-semibold">{totalamount - totalContractValues.cpu}</span>: ""}
                      {maintitle === "Оперативная Память" ? <span className="text-3xl font-semibold">{totalamount - totalContractValues.ramFormated}</span>: ""}
                      {maintitle === "Системы Хранения Данных" ? <span className="text-2xl p-2 font-semibold">{totalContractValues.ssdFormated}</span>: <span></span>}
                      {maintitle === "Системы Хранения Данных" ? <span className="text-2xl p-2 font-semibold">{totalContractValues.fcFormated}</span>:<span></span>}
                      {maintitle === "Системы Хранения Данных" ? <span className="text-2xl p-2 font-semibold">{totalContractValues.nlFormated}</span>: <span></span>}
                    </p> */}
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-8">
                {totalSSD != undefined ? 
                  <div className="">
                    <p className={totalSSD != undefined ? "flex justify-around":""}>
                    {totalSSD != undefined ?<span className="text-xs text-gray-400">SSD</span>: ""}
                    {totalSSD != undefined ?<span className="text-xs text-gray-400">FC</span>: ""}
                    {totalSSD != undefined ?<span className="text-xs text-gray-400">NL</span>: ""}
                    </p>
                  </div>:""}
                <p className={freeSSD != undefined ? "flex justify-between":""}>
                    {freeamount != undefined ? <span className="text-3xl font-semibold">{freeamount}</span>: ""}
                    {freeSSD != undefined ?<span className="text-xl p-2 font-semibold">{freeSSD}</span>: <span></span>}
                    {freeFC != undefined ?<span className="text-xl p-2 font-semibold">{freeFC}</span>:<span></span>}
                    {freeNL != undefined ? <span className="text-xl p-2 font-semibold">{freeNL}</span>: <span></span>}
                  </p>
                  <p className={freeSSD != undefined ? "mt-1 text-gray-500":"text-gray-500 mt-1"}>
                    Не задействовано
                  </p>
                </div>
              </div>
              <div className={totalSSD != undefined ?"":"flex flex-wrap"}>
                <div className="mt-10 ">
                {totalSSD != undefined ? 
                  <div className="">
                    <p className={totalSSD != undefined ? "flex justify-around":""}>
                    {totalSSD != undefined ?<span className="text-xs text-gray-400">SSD</span>: ""}
                    {totalSSD != undefined ?<span className="text-xs text-gray-400">FC</span>: ""}
                    {totalSSD != undefined ?<span className="text-xs text-gray-400">NL</span>: ""}
                    </p>
                  </div>:""}
                <p className={usedSSD != undefined ? "flex justify-between":""}>
                  {usedamount != undefined ? <span className="text-3xl font-semibold">{usedamount}</span>: ""}
                  {usedSSD != undefined ?<span className="text-xl p-2 font-semibold">{usedSSD}</span>: <span></span>}
                  {usedFC != undefined ?<span className="text-xl p-2 font-semibold">{usedFC}</span>:<span></span>}
                  {usedNL != undefined ? <span className="text-xl p-2 font-semibold">{usedNL}</span>: <span></span>}
                </p>
                <p className={usedSSD != undefined ? "mt-3 text-gray-500":"text-gray-500 mt-1"}>
                  Используется
                </p>
                </div>
                {usedamount != undefined ? <div className="ml-4">
                  <PieChart
                  id={idpie}
                  height={heightpie}
                  width={widthpie}
                  data={datapie}
                  type={typepie}
                  />
                </div>:""}
                </div>
              </div>
            </div>
            {usedSSD != undefined ? <div className="border-r-1 border-color pr-12">
                  <PieChart
                  id={idpie}
                  height={heightpie}
                  width={widthpie}
                  data={datapie}
                  type={typepie}
                  />
                </div>:""}
              <div>
                <Stacked id={idstacked} width={widthstacked} 
                height={heightstacked} datasource={datasource}
                stackedPrimaryXAxis={stackedPrimaryXAxis}
                stackedPrimaryYAxis={stackedPrimaryYAxis}
                /> 
              </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default ResourcePool