import React, {useEffect, useState} from 'react'
import {DialogComponent} from '@syncfusion/ej2-react-popups';
import './addclient.css';
import {useStateContext} from '../../contexts/ContextProvider';
import {useUploadCustomers} from '../../services/useUploadCustomers'
import {useNavigate} from "react-router-dom";
import {HiOutlineCpuChip} from 'react-icons/hi2'
import {CgSmartphoneRam} from 'react-icons/cg'
import {CiHardDrive} from 'react-icons/ci'
import {FiHardDrive} from 'react-icons/fi'
import {TfiHarddrive} from 'react-icons/tfi'
import {GrVirtualMachine} from 'react-icons/gr'
import {IoDocumentText} from 'react-icons/io5'


function ClientModal(props) {
  const { deviceForm, setDeviceForm } = props;
    const navigate = useNavigate();
    const {
        uploadClient,
        error,
        isLoading,
        setError,
        deleteClient,
        updateClient
    } = useUploadCustomers()
    const {resourcesToCustomers, currentColor, clientList} = useStateContext();
    const [client, setClient] = useState('');
    const [contract, setContract] = useState('');
    const [type, setType] = useState('');
    const [document, setDocument] = useState('');
    const [used, setUsed] = useState('');
    const [date, setDate] = useState('');

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (client) {
            try {
                await uploadClient(capitalize(client), document, capitalize(type), date)
                setClient('');
                setType('');
                setContract('');
                setUsed('');
                setDate('');
                navigate(0);
            } catch (e) {
                setError(true)
            }
        } else {
            setError(true)
        }
    }
    let buttons;
    const [display, setDisplay] = useState('none');

    const closeModal = () => {
      setDeviceForm(false);
    };
    return (
        <DialogComponent id="modalDialog"
            isModal={true}
            showCloseIcon={true}
            width="500px"
            header="Add new client to database"
            visible={deviceForm}
            close={closeModal}>
            <div className="mb-4 overscroll-auto">
                <div className="gap-4">
                    <div className="text-gray-800 text-xl"><a>Customer Name</a></div>
                    <div className="text-gray-400 hover:text-gray-800 mb-2"><a className="flex gap-x-2">Введите наименование заказчика на латинице. Например: <p className="hover:text-blue-500 underline">ClientVehi</p></a></div>
                    <input type="text"
                        className={
                            error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                        }
                        placeholder="ClientVehi..."
                        onChange={
                            (e) => setClient(e.target.value)
                        }
                        value={client}/>
                </div>
                <div className="pt-4 pb-4 gap-2 ">
                    <div className="mb-2"><a className="text-gray-800 text-xl">Project Number</a></div>
                    <input type="text"
                        className={
                            error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                        }
                        placeholder="12345"
                        onChange={
                            (e) => setDocument(e.target.value)
                        }
                        value={document}/>
                </div>
                <div className="pb-4 gap-2">
                <div className="mb-2"><a className="text-gray-800 text-xl">Status</a></div>
                    <input type="text"
                        className={
                            error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                        }
                        placeholder="ex. Active / Inactive"
                        onChange={
                            (e) => setType(e.target.value)
                        }
                        value={type}/>
                </div>
                <div className="pb-4 gap-2 divide-y-1">
                <div className=""><a className="text-gray-800 text-xl">Contract Resources</a></div>
                    <div className = "text-gray-400 hover:text-gray-800 mb-2 grid grid-cols-4 grid-rows-1" > 
                        <div className="gap-x-2 col-span-3 ">Введите количество ресурсов заключеных в договоре. RAM, SSD, FC, HDD учитываются в гигабайте Например:</div> 
                            <div className = "auto-rows-min pl-8" > 
                                <p className="hover:text-blue-500 underline">CPU: 64</p>
                                <p className="hover:text-blue-500 underline">RAM: 1024</p>
                                <p className="hover:text-blue-500 underline">SSD: 512</p>
                                <p className="hover:text-blue-500 underline">FC: 0</p>
                                <p className="hover:text-blue-500 underline">NL: 300</p>
                            </div>
                    </div>

                    <div className="flex gap-2 justify-between pt-2">
                        <div>
                            <div className="flex place-content-center gap-x-1">
                                <HiOutlineCpuChip/>
                                <p className="">CPU</p>
                            </div>
                           
                            <input type="text"
                                className={
                                    error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                }
                                placeholder="16"
                                onChange={
                                    (e) => setDate(e.target.value)
                                }
                                value={date}/>
                        </div>
                        <div>
                        <div className="flex place-content-center gap-x-1">
                                <CgSmartphoneRam/>
                                <p className="">RAM</p>
                            </div>
                            <input type="text"
                                className={
                                    error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                }
                                placeholder="32"
                                onChange={
                                    (e) => setDate(e.target.value)
                                }
                                value={date}/>
                        </div>
                        <div>
                        <div className="flex place-content-center gap-x-1">
                                <TfiHarddrive/>
                                <p className="">SSD</p>
                            </div>
                            <input type="text"
                                className={
                                    error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                }
                                placeholder="64"
                                onChange={
                                    (e) => setDate(e.target.value)
                                }
                                value={date}/>
                        </div>
                        <div>
                            <div className="flex place-content-center gap-x-1">
                                <FiHardDrive/>
                                <p className="">FC</p>
                            </div>
                            <input type="text"
                                className={
                                    error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                }
                                placeholder="128"
                                onChange={
                                    (e) => setDate(e.target.value)
                                }
                                value={date}/>
                        </div>
                        <div>
                            <div className="flex place-content-center gap-x-1">
                                <CiHardDrive/>
                                <p className="">NL</p>
                            </div>
                            <input type="text"
                                className={
                                    error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                }
                                placeholder="256"
                                onChange={
                                    (e) => setDate(e.target.value)
                                }
                                value={date}/>
                        </div>
                    </div>
                </div>
                <div className="pb-4 gap-2">
                <div className="mb-2"><a className="text-gray-800 text-xl">End Date</a></div>
                    <input type="text"
                        className={
                            error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                        }
                        placeholder="ex. 01.02.2024"
                        onChange={
                            (e) => setDate(e.target.value)
                        }
                        value={date}/>
                </div>
            </div>
            <div className={
                error ? "flex justify-between" : "flex justify-end"
            }>
                {
                error ? <p className="text-red-400 text-semibold">Не удалось загрузить данные на сервер. Убедитесь что все поля заполнены либо обратитесь к администратору</p> : ""
            }
                <button type="submit"
                    disabled={isLoading}
                    className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    style={
                        {backgroundColor: currentColor}
                    }
                    onClick={handleSubmit}>
                    Upload
                </button>
            </div>
        </DialogComponent>
    );
}
export default ClientModal;
