import React from 'react'
import {GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Edit, Inject, Toolbar} from '@syncfusion/ej2-react-grids'
import {vmData, vmGrid} from '../data/vmData';
import {Header} from '../components';
import {VirtualMachinesHeader} from '../components/'
import {useStateContext} from '../contexts/ContextProvider';

const Employees = () => {
  const {searchLatestVM} = useStateContext();
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between">
      <Header category="Page" title="Virtual Machines"></Header>
      <Header category="Latest Update:" lastUpdate={true}></Header>
      </div>
      <GridComponent
      allowPaging
      allowSorting
      toolbar={['Search']}
      width="auto"
      dataSource={searchLatestVM}>
        <ColumnsDirective >
        {vmGrid.map((item, index) => (
          <ColumnDirective key={index}{...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Employees