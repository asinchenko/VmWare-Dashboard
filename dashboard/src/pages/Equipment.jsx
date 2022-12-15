import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, 
  ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Selection} from '@syncfusion/ej2-react-grids'
import HP from '../data/hp.png'
import DELL from '../data/DELL.png'
import HPE from '../data/HPE.png'
import CISCO from '../data/CISCO.png'
import HUAWEI from '../data/HUAWEI.png'
import UNKNOWN from '../data/UNKNOWN.png'
import {Header} from '../components';
import {useStateContext} from '../contexts/ContextProvider';
import {useUploadEquipment} from '../services/useUploadEquipment'
import { useNavigate } from "react-router-dom";

const Equipment = () => {
  const navigate = useNavigate();
  const {upload, error, isLoading, setError, deleteHW, update} = useUploadEquipment()
  const {hardWareDevices, currentColor} = useStateContext();
  const [deviceForm, setDeviceForm] = useState(false);
  const [deleteDeviceForm, setDeleteDeviceForm] = useState(false);
  const [vendor, setVendor] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [cpu, setCPU] = useState('');
  const [ram, setRAM] = useState('');
  const [description, setDescription] = useState('');
  const [deleteError, setDeleteError] = useState(false)
  const [_id, setID] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteHardwareDetails, setDeleteHardwareDetails] = useState('')
  const params = useParams()
  const handleClick = () => {
    setDeviceForm(!deviceForm)
  }
  const capitalize = (word) => {
   return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (vendor, type, status, cpu, ram, description) {
      try {
        await upload(capitalize(vendor), capitalize(name), capitalize(type), capitalize(status), cpu, ram, capitalize(description))
        setVendor(''); setName(''); setType(''); setStatus(''); setCPU(''); setRAM(''); setDescription('');
        navigate(0);
      }catch(e){
        setError(true)
      }
    }else {
      setError(true)
    }
  }
  const handleDelete = async (e) => {
    if (_id) {
      try {
        setShowModal("delete")
      }catch(e){
        setDeleteError(false)
      }
    }else {
      setDeleteError("delete")
    }
  }

  const handleUpdate = async (e) => {
    if (_id) {
      try {
        setShowModal("update")
      }catch(e){
        setDeleteError("update")
      }
    }else {
      setDeleteError(true)
    }
  }
  
  const rowSelected = (grid) => {
    if (grid){
      setDeleteDeviceForm(true)
      setID(grid.data._id)
      setDeleteHardwareDetails(grid.data)
    }else {
      setDeleteDeviceForm(false)
    }
  };
  const rowDeselected = (grid) => {
    if(grid){
      setDeleteDeviceForm(false)
      setID(false)
      setDeleteHardwareDetails("")
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
  const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true }
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
          rowSelected={rowSelected}
          rowDeselected={rowDeselected}
          allowPaging
          allowSorting
          allowFiltering
          editSettings={editOptions}
          filterSettings={filterOptions}
          dataSource={hardWareDevices}>
            <ColumnsDirective >
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Selection, Edit, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, ]}/>
          </GridComponent>
          <div className="flex justify-between mt-4">
            <div>
              {deleteError?<p>Can not delete item</p> : <p></p>}
            </div>
            <div className="flex gap-4">
              {deleteDeviceForm?<button
                    type="button"
                    disabled={isLoading}
                    className="hover:bg-yellow-700 bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleUpdate}
                    >
                    Update
              </button>:""}
              {deleteDeviceForm?<button
                    type="button"
                    disabled={isLoading}
                    className="hover:bg-red-700 bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDelete}
                    >
                    Delete
              </button>:""}
            </div>
            {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {showModal==="delete" ? <h3 className="text-3xl font-semibold">
                    Вы уверены, что хотите удалить запись?
                  </h3> :""}
                  {showModal==="update" ? <h3 className="text-3xl font-semibold">
                    Вы уверены, что хотите обновить запись?
                  </h3> :""}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {showModal==="delete"?<p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Запись об оборудовании: {deleteHardwareDetails.hwName} будет удалена
                  </p>:""}
                  {showModal==="update"?<div className="my-4 text-slate-500 text-lg leading-relaxed">
                  <p>Vendor: {deleteHardwareDetails.vendor}</p>
                  <p>Name: {deleteHardwareDetails.hwName}</p>
                  <p>Type: {deleteHardwareDetails.type}</p>
                  <p>Status: {deleteHardwareDetails.status}</p>
                  <p>RAM: {deleteHardwareDetails.ram}</p>
                  <p>CPU: {deleteHardwareDetails.cpu}</p>
                  <p>Description: {deleteHardwareDetails.description}</p>
                  </div>:""}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-gray-500 hover:text-gray-300 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Закрыть
                  </button>
                  {showModal==="delete" ? <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      deleteHW(_id);  
                      navigate(0);
                    }}
                  >
                    Удалить
                  </button>:""}
                  {showModal==="update" ? <button
                    className="bg-yellow-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      update(deleteHardwareDetails._id, deleteHardwareDetails.vendor, deleteHardwareDetails.hwName, deleteHardwareDetails.type, deleteHardwareDetails.status, deleteHardwareDetails.ram, deleteHardwareDetails.cpu, deleteHardwareDetails.description);  
                      navigate(0);
                    }}
                  >
                    Обновить
                  </button>:""}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
          </div>
      </div>
    )
  }
  
}

export default Equipment