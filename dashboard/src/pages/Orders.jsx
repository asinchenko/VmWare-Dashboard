import React from 'react'
import {GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, 
  ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject} from '@syncfusion/ej2-react-grids'
import HP from '../data/hp.png'
import DELL from '../data/DELL.png'
import HPE from '../data/HPE.jpeg'
import CISCO from '../data/CISCO.jpeg'
import {Header} from '../components';
import {useStateContext} from '../contexts/ContextProvider';
import axios from 'axios'
const url_get = 'http://localhost:4000/api/img/description/'

const Orders = () => {
  const {hardWareDevices} = useStateContext();
  const getImage = async (description) => {
    try {
      let response = await axios.get(url_get+description);
      return response
    }catch(e){
      console.log(e)
    }
  }
  const gridOrderImage = (props) => {
      if (props.vendor.toLowerCase() === "hp"){
        return <div><img src={HP} alt=""/></div>
      }else if (props.vendor.toLowerCase() === "hpe"){
        return <div><img src={HPE} alt="" className="object-scale-down"/></div>
      } else if (props.vendor.toLowerCase() === "dell"){
        return <div><img src={DELL} alt=""/></div>
      } else if (props.vendor.toLowerCase() === "cisco"){
        return <div><img src={CISCO} alt=""/></div>
      } else if (props.vendor.toLowerCase() === "hp"){
        return <div><img src={HP} alt=""/></div>
      }
  };
  const gridOrderStatus = (props) => (
    <button
      type="button"
      className={props.status === "active"?"text-white py-1 px-2 capitalize rounded-2xl text-md bg-green-400" :"text-white py-1 px-2 capitalize rounded-2xl text-md bg-red-400"}
    >
      {props.status}
    </button>
  );
  const ordersGrid = [
    { field: 'vendor',
      headerText: 'Image',
      template: gridOrderImage,
      width: '60',
    },
    {
      field: 'vendor',
      headerText: 'Vendor',
      width: '60',
      editType: 'dropdownedit',
    },
    { field: 'hwName',
      headerText: 'Device Name',
      width: '150',
    },
    {
      headerText: 'Status',
      template: gridOrderStatus,
      field: 'status',
      width: '120',
    },
    {
      field: 'cpu',
      headerText: 'CPU',
      width: '120',
    },
    {
      field: 'ram',
      headerText: 'RAM',
      width: '120',
    },
    {
      field: 'description',
      headerText: 'Description',
      width: '150',
    },
  ];

  if (hardWareDevices.length == 0){
    return (
      <div>
      </div>
    )
  }else {
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
  
}

export default Orders