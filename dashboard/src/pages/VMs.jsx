import React from 'react'
import {GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Edit, Inject, Toolbar, PdfExport} from '@syncfusion/ej2-react-grids'
import {vmData, vmGrid} from '../data/vmData';
import {Header} from '../components';
import {VirtualMachinesHeader} from '../components/'
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
  };
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between">
      <Header category="Page" title="Virtual Machines"></Header>
      <Header category="Latest Update:" lastUpdate={true}></Header>
      </div>
      <GridComponent
      id='grid'
      allowPaging
      allowSorting
      allowPdfExport
      toolbarClick={toolbarClick}
      sortSettings={sortingOptions}
      toolbar={['Search', 'PdfExport']}
      width="auto"
      dataSource={searchLatestVM}
      ref={g => grid = g}>
        <ColumnsDirective >
        {vmGrid.map((item, index) => (
          <ColumnDirective key={index}{...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, PdfExport]}/>
      </GridComponent>
    </div>
  )
}

export default Employees