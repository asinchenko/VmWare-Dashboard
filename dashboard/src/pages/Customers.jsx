import React, {useEffect, useState} from 'react'
import {GridComponent, ColumnsDirective, ColumnDirective, Selection, Sort,
  Filter, Page, Edit, Inject, Toolbar, Search} from '@syncfusion/ej2-react-grids';
import {customerGrid} from '../data/customerData';
import {Header} from '../components';
import {useStateContext} from '../contexts/ContextProvider';
import {useUploadCustomers} from '../services/useUploadCustomers'
import { useNavigate } from "react-router-dom";
import useAxios from '../services/useAxios'

const Customers = () => {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const {uploadClient, error, isLoading, setError, deleteClient, updateClient} = useUploadCustomers()
  const {resourcesToCustomers, currentColor, clientList} = useStateContext();
  const [deviceForm, setDeviceForm] = useState(false);
  const [deleteDeviceForm, setDeleteDeviceForm] = useState(false);
  const [clientLoaded, setClientLoaded] = useState(false)
  const [client, setClient] = useState('');
  const [contract, setContract] = useState('');
  const [type, setType] = useState('');
  const [document, setDocument] = useState('');
  const [used, setUsed] = useState('');
  const [date, setDate] = useState('');
  const [rate, setRate] = useState('');
  const [deleteError, setDeleteError] = useState(false)
  const [_id, setID] = useState(false);
  const [finalClientList, setFinalClientList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteClientDetails, setDeleteClientDetails] = useState('')

  const calculateFinalList = () => {
    resourcesToCustomers.map(resCustomer => {
      clientList.map(dbCustomer => {
        if (Object.keys(resCustomer)[0].toLowerCase() === dbCustomer.client.toLowerCase()){
          dbCustomer.contract = resCustomer[Object.keys(resCustomer)[0]].storage_contract;
          dbCustomer.contract.cpu = resCustomer[Object.keys(resCustomer)[0]].cpu_contract;
          dbCustomer.contract.ram = resCustomer[Object.keys(resCustomer)[0]].ram_contract;
          dbCustomer.used = resCustomer[Object.keys(resCustomer)[0]].storage;
          dbCustomer.used.cpu = resCustomer[Object.keys(resCustomer)[0]].cpu;
          dbCustomer.used.ram = resCustomer[Object.keys(resCustomer)[0]].ram;
          dbCustomer.used.vm = resCustomer[Object.keys(resCustomer)[0]].vm_amount;
          setFinalClientList((oldArray => [...oldArray, dbCustomer]))
          setClientLoaded(true);
        }
      })
    });
  };
  useEffect(() => {
    if (!clientLoaded){
      calculateFinalList();
    }
  });

  const handleClick = () => {
    setDeviceForm(!deviceForm)
  }
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
   }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (client) {
      try {
        await uploadClient(capitalize(client), document, capitalize(type), date)
        setClient(''); setType(''); setContract(''); setUsed(''); setDate(''); setRate('');
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
  };

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
  };
const rowSelected = (grid) => {
    if (grid){
      setDeleteDeviceForm(true)
      setID(grid.data._id)
      setDeleteClientDetails(grid.data)
    }else {
      setDeleteDeviceForm(false)
    }
  };
  const rowDeselected = (grid) => {
    if(grid){
      setDeleteDeviceForm(false)
      setID(false)
      setDeleteClientDetails("")
    }
  };
  if (clientList === []){
    return (
      <div>
        Loading...
      </div>
    )
  }else {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between mb-6">
          <Header category="Page" title="Clients"></Header>
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
      <div>
        {deviceForm ?
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <div className="">
                <a className="text-gray-500">Customer</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. Business Algorithms"
                  onChange={(e) => setClient(e.target.value)}
                  value={client} 
                />
              </div>
              <div className="">
                <a className="text-gray-500">Project Number</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="12345"
                  onChange={(e) => setDocument(e.target.value)}
                  value={document} 
                />
              </div>
              <div className="">
                <a className="text-gray-500">Type</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. Active / Inactive"
                  onChange={(e) => setType(e.target.value)}
                  value={type} 
                />
              </div>
              <div className="">
                <a className="text-gray-500">End Date</a>
                <input
                  type="text"
                  className={error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : 
                  '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'}
                  placeholder="ex. 01.02.2024"
                  onChange={(e) => setDate(e.target.value)}
                  value={date} 
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
      <GridComponent
      allowPaging
      allowSorting
      rowSelected={rowSelected}
      rowDeselected={rowDeselected}
      toolbar={['Search']}
      editSettings={{allowDeleting: true, allowEditing: true}}
      width="auto"
      dataSource={finalClientList}>
        <ColumnsDirective >
        {customerGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Edit, Toolbar, Sort, Filter, Search]}/>
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
                  Запись о Клиенте: {deleteClientDetails.client} будет удалена
                  </p>:""}
                  {showModal==="update"?<div className="my-4 text-slate-500 text-lg leading-relaxed">
                  <p>Client: {deleteClientDetails.client}</p>
                  <p>Document Number: {deleteClientDetails.document}</p>
                  <p>Status: {deleteClientDetails.type}</p>
                  <p>Date: {deleteClientDetails.date}</p>
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
                      deleteClient(_id);  
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
                      updateClient(deleteClientDetails._id, deleteClientDetails.client, deleteClientDetails.document, deleteClientDetails.type, deleteClientDetails.date);  
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
    </div>
  )}
}
export default Customers