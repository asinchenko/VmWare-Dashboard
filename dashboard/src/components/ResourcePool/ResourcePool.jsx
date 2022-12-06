import React from 'react'
import {Stacked, PieChart} from '..'
import {GoPrimitiveDot} from 'react-icons/go';

const ResourcePool = ({
  idpie,widthpie,heightpie,datapie,typepie,
  idstacked, widthstacked, heightstacked,
  maintitle, totalamount, freeamount, usedamount,
  datasource, stackedPrimaryXAxis, stackedPrimaryYAxis,
  totalSSD, totalFC, totalNL,
  freeSSD,  freeFC,  freeNL,
  usedSSD,  usedFC,  usedNL
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
          <div className=" gap-10 flex flex-wrap justify-center">
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
                  {totalSSD != undefined ?<span className="text-2xl p-2 font-semibold">{totalSSD}</span>: <span></span>}
                  {totalFC != undefined ?<span className="text-2xl p-2 font-semibold">{totalFC}</span>:<span></span>}
                  {totalNL != undefined ? <span className="text-2xl font-semibold p-2">{totalNL}</span>: <span></span>}
                </p>
                <p className={totalSSD != undefined ? "mt-1 text-gray-500":"text-gray-500 mt-1"}>
                  Общее количество
                </p>
              </div>
              <div className="flex-col">
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
                    {freeSSD != undefined ?<span className="text-2xl p-2 font-semibold">{freeSSD}</span>: <span></span>}
                    {freeFC != undefined ?<span className="text-2xl p-2 font-semibold">{freeFC}</span>:<span></span>}
                    {freeNL != undefined ? <span className="text-2xl p-2 font-semibold">{freeNL}</span>: <span></span>}
                  </p>
                  <p className={freeSSD != undefined ? "mt-1 text-gray-500":"text-gray-500 mt-1"}>
                    Свободно
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
                  {usedSSD != undefined ?<span className="text-2xl p-2 font-semibold">{usedSSD}</span>: <span></span>}
                  {usedFC != undefined ?<span className="text-2xl p-2 font-semibold">{usedFC}</span>:<span></span>}
                  {usedNL != undefined ? <span className="text-2xl p-2 font-semibold">{usedNL}</span>: <span></span>}
                </p>
                <p className={usedSSD != undefined ? "mt-3 text-gray-500":"text-gray-500 mt-1"}>
                  Занято
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
            {usedSSD != undefined ? <div className="border-r-1 border-color pr-4">
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