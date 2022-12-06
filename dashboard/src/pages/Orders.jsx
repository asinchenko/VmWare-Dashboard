import React from 'react'
import {GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, 
  ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject} from '@syncfusion/ej2-react-grids'
import HP from '../data/hp.png'
import DELL from '../data/DELL.png'
import VEHI from '../data/DELL.png'
import {Header} from '../components';
import {useStateContext} from '../contexts/ContextProvider';


const Orders = () => {
  const {hardWareDevices} = useStateContext();
  console.log(hardWareDevices)
  const gridOrderImage = (props) => (
    <div>
      {(() => {if (props.length > 0) {
        if (props.vendor.toLowerCase() === "hp") {
          return (
            <img
            className="rounded-xl h-20 md:ml-3"
            src={HP}
            />
          )
        } else if (props.vendor.toLowerCase() === "dell") {
          return (
            <img
            className="rounded-xl h-20 md:ml-3"
            src={DELL}
            alt="order-item"
            />
          )
        } else {
          return (
            <img
            className="rounded-xl h-20 md:ml-3"
            src={VEHI}
            alt="order-item"
            />
          )
        }
      }
      })()}
    </div>
  );
  const gridOrderStatus = (props) => (
    <button
      type="button"
      style={{ background: props.StatusBg }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
      {props.Status}
    </button>
  );
  const ordersGrid = [
    {
      headerText: 'Image',
      template: gridOrderImage,
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'vendor',
      headerText: 'Vendor',
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    { field: 'hwName',
      headerText: 'Device Name',
      width: '150',
      textAlign: 'Center',
    },
    {
      headerText: 'Status',
      template: gridOrderStatus,
      field: 'OrderItems',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'cpu',
      headerText: 'CPU',
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'ram',
      headerText: 'RAM',
      width: '120',
      textAlign: 'Center',
    },
  
    {
      field: 'description',
      headerText: 'Description',
      width: '150',
      textAlign: 'Center',
    },
  ];

  
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders"></Header>
        <GridComponent id="gridcomp"
        allowPaging
        allowSorting
        dataSource={hardWareDevices}>
          <ColumnsDirective >
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport]}/>
        </GridComponent>
    </div>
  )
}

export default Orders