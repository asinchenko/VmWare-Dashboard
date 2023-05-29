import React from 'react'
import {GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Inject, Toolbar, PdfExport, ExcelExport} from '@syncfusion/ej2-react-grids'
import {vmGrid} from '../data/vmData';
import {Header} from '../components';
import {useStateContext} from '../contexts/ContextProvider';

var grid;
const Employees = () => {
  const {searchLatestVM} = useStateContext();
  const sortingOptions = {
    columns: [{ field: 'customer', direction: 'Ascending' }]
  };
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
    grid.pdfExport();
    }
    if (grid && args.item.id === 'grid_excelexport') {
      grid.excelExport();
      }
  };
  function exportQueryCellInfo(args) { //pdfExcelQueryCellInfo event
    if (args.column.headerText.includes("torage")) {
      args.value = "SSD :" + args.data.storage.ssd + "\n"  + " FC :" + args.data.storage.fc + "\n"  + " NL :" + args.data.storage.nl; //here we can set our customized value based on our requirement
    }
    if (args.column.headerText.includes("RAM")) {
      args.value =  formatBytes(args.data.ram*1024*1024)
      console.log(args.data.ram)
    }
    if (args.column.headerText.includes("etails")) {
      args.value = "OS: " + "\n" + args.data.details.value.guest_OS + "\n"
    }
  };
  
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between">
      <Header category="Page" title="Virtual Machines"></Header>
      <Header category="Latest Update:" lastUpdate={true}></Header>
      </div>
      <GridComponent
      id='grid'
      pdfQueryCellInfo={exportQueryCellInfo}
      excelQueryCellInfo={exportQueryCellInfo}
      allowPaging
      allowSorting
      allowPdfExport
      allowExcelExport
      toolbarClick={toolbarClick}
      sortSettings={sortingOptions}
      toolbar={['Search', 'PdfExport', 'ExcelExport']}
      width="auto"
      dataSource={searchLatestVM}
      ref={g => grid = g}>
        <ColumnsDirective >
        {vmGrid.map((item, index) => (
          <ColumnDirective key={index}{...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, PdfExport, ExcelExport]}/>
      </GridComponent>
    </div>
  )
}
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


export default Employees