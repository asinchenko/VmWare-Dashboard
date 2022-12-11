import React from 'react'
import {GridComponent, ColumnsDirective, ColumnDirective, Selection, Sort,
  Filter, Page, Edit, Inject, Toolbar} from '@syncfusion/ej2-react-grids';
import {customersData, contextMenuItems, customersGrid} from '../data/dummy';
import {Header} from '../components';

const Customers = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      {/* <Header category="Page" title="Customers"></Header>
      <GridComponent
      allowPaging
      allowSorting
      toolbar={['Delete']}
      editSettings={{allowDeleting: true, allowEditing: true}}
      width="auto"
      dataSource={customersData}>
        <ColumnsDirective >
        {customersGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Edit, Toolbar, Sort, Filter]}/>
      </GridComponent> */}
    </div>
  )
}
export default Customers