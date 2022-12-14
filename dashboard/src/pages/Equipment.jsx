import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import {GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, 
  ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject} from '@syncfusion/ej2-react-grids'
import HP from '../data/hp.png'
import DELL from '../data/DELL.png'
import HPE from '../data/HPE.png'
import CISCO from '../data/CISCO.png'
import HUAWEI from '../data/HUAWEI.png'
import UNKNOWN from '../data/UNKNOWN.png'
import {Header} from '../components';
import {useStateContext} from '../contexts/ContextProvider';
import {useUploadEquipment} from '../services/useUploadEquipment'

const Equipment = () => {
  const {upload, error, isLoading, setError} = useUploadEquipment()
  const {hardWareDevices, currentColor} = useStateContext();
  const [deviceForm, setDeviceForm] = useState(false);
  const [vendor, setVendor] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [cpu, setCPU] = useState('');
  const [ram, setRAM] = useState('');
  const [description, setDescription] = useState('');
  const params = useParams()
  const handleClick = () => {
    setDeviceForm(!deviceForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (vendor, type, status, cpu, ram, description) {
      try {
        await upload(vendor, name, type, status, cpu, ram, description)
        setVendor(''); setName(''); setType(''); setStatus(''); setCPU(''); setRAM(''); setDescription('');
      }catch(e){
        setError(true)
      }
    }else {
      setError(true)
    }
}

  let filterOptions;
  if (params.param === "all"){
    filterOptions ={};
  }else {
    filterOptions = {
      columns: [
          { field: 'type', matchCase: false,
              operator: 'startswith', predicate: 'and', value: String(params.param)
          }
      ]
    };
  }
  
  const gridOrderImage = (props) => {
      if (props.vendor.toLowerCase() === "hp"){
        return <div><img src={HP} alt="" className="rounded-full"/></div>
      }else if (props.vendor.toLowerCase() === "hpe"){
        return <div><img src={HPE} alt="" className="rounded-full"/></div>
      } else if (props.vendor.toLowerCase() === "dell"){
        return <div><img src={DELL} alt="" className="rounded-full"/></div>
      } else if (props.vendor.toLowerCase() === "cisco"){
        return <div><img src={CISCO} alt="" className="rounded-full"/></div>
      } else if (props.vendor.toLowerCase() === "huawei"){
        return <div><img src={HUAWEI} alt="" className="rounded-full"/></div>
      } else {
        return <div><img src={UNKNOWN} alt="" className="rounded-full"/></div>
      }
  };
  const gridOrderStatus = (props) => (
    <button
      type="button"
      className={props.status.toLowerCase() === "active"?"text-white py-1 px-2 capitalize rounded-2xl text-md bg-green-400" :"text-white py-1 px-2 capitalize rounded-2xl text-md bg-red-400"}
    >
      {props.status}
    </button>
  );
  const ordersGrid = [
    { field: 'vendor',
      headerText: '',
      template: gridOrderImage,
      width: '40',
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
    { field: 'type',
      headerText: 'Type',
      width: '100',
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
  
  if (hardWareDevices === []){
    return (
      <div>
      </div>
    )
  }else {
    return (
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between mb-6">
          <Header category="Page" title="Equipment"></Header>
          <div className="flex items-center">
          <button 
            className="hover:bg-gray-50 text-white py-2 px-4 rounded text-3xl"
            style={{color:currentColor}}
            onClick={handleClick}
            >
            +
            </button>
          </div>
        </div>
          {deviceForm ?
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <div className="">
                <a className="text-gray-500">Vendor</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. Dell, Cisco, HP"
                  onChange={(e) => setVendor(e.target.value)}
                  value={vendor} 
                />
              </div>
              <div className="">
                <a className="text-gray-500">Device Name</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. Proliant 360G8"
                  onChange={(e) => setName(e.target.value)}
                  value={name} 
                />
              </div>
              <div className="">
              <a className="text-gray-500">Device Type</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-400 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. Server, Router, Firewall"
                  onChange={(e) => setType(e.target.value)}
                  value={type} 
                />
              </div>
              <div className="">
              <a className="text-gray-500">Device Status</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. Active, Not Active"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status} 
                />
              </div>
              <div className="">
              <a className="text-gray-500">Device CPU</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. 4"
                  onChange={(e) => setCPU(e.target.value)}
                  value={cpu} 
                />
              </div>
              <div className="">
              <a className="text-gray-500">Device RAM in GB</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. 1024"
                  onChange={(e) => setRAM(e.target.value)}
                  value={ram} 
                />
              </div>
              <div className="">
              <a className="text-gray-500">Device Description</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. Rack: 2 Unit: 16"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description} 
                />
              </div>
            </div>
            
            <div className= {error? "flex justify-between":"flex justify-end"}>
            {error ? <p className="text-red-400 text-semibold">Не удалось загрузить данные на сервер. Убедитесь что все поля заполнены либо обратитесь к администратору</p>:""}
                <button
                type="submit"
                disabled={isLoading}
                className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{backgroundColor:currentColor}}
                onClick={handleSubmit}
                >
                Upload
                </button>
            </div>
          </div> : ''}
          <GridComponent id="equipmentgrid"
          allowPaging
          allowSorting
          allowFiltering
          filterSettings={filterOptions}
          dataSource={hardWareDevices}>
            <ColumnsDirective >
            {ordersGrid.map((item) => (
              <ColumnDirective key={item._id} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport]}/>
          </GridComponent>
      </div>
    )
  }
  
}

export default Equipment