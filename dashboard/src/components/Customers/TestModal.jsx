import {Fragment, useRef, useState, useEffect} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import './addclient.css';
import {useStateContext} from '../../contexts/ContextProvider';
import {useUploadCustomers} from '../../services/useUploadCustomers'
import {useNavigate} from "react-router-dom";
import {HiOutlineCpuChip} from 'react-icons/hi2'
import {CgSmartphoneRam} from 'react-icons/cg'
import {CiHardDrive} from 'react-icons/ci'
import {FiHardDrive} from 'react-icons/fi'
import {TfiHarddrive} from 'react-icons/tfi'
import {BiHelpCircle} from 'react-icons/bi'
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import {useAuthContext} from '../../services/useAuthContext'

export default function Modal(props) {
    const {user} = useAuthContext();
    const {deviceForm, setDeviceForm} = props;

    const cancelButtonRef = useRef(null)

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
    const [cpu, setCPU] = useState();
    const [ram, setRAM] = useState();
    const [ssd, setSSD] = useState();
    const [fc, setFC] = useState();
    const [nl, setNL] = useState();
    const [tags, setTags] = useState("");
    const [manager, setManager] = useState({email:(user.email).split('@')[0], description: user.description})
    const [statusActiveButton, setStatusActiveButton] = useState("Active")

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (client) {
            try {
                await uploadClient(client, document, statusActiveButton, cpu, ram, ssd, fc, nl,statusActiveButton === "Reserv"?"Reserved":tags, date, manager)
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
    return (
        <Transition.Root show={deviceForm}
            as={Fragment}>
            <Dialog as="div" className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setDeviceForm}>
                <Transition.Child as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                                        </div> */}
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left divide-y-2">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 flex gap-1">
                                                <p>Add Client </p>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-400" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                </svg>
                                            </Dialog.Title>
                                            <div className="mt-2">
                                              <div className="mb-4 overscroll-auto divide-y-1">
                                                    <div className="gap-4">
                                                        <div className="mt-4 flex gap-1 items-center justify-between">
                                                            <div className="text-gray-800 text-xl flex gap-1 items-center">
                                                                <a>Customer Name</a>
                                                            </div>
                                                            <div>
                                                                <TooltipComponent content="Введите наименование заказчика на латинице. Например: Clientvehi"
                                                                    position={"TopCenter"}
                                                                    tabIndex={0} className="hover:scale-125 opacity-50 hover:opacity-100">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        </svg>
                                                                    {/* <BiHelpCircle size={16}
                                                                        tabIndex={-1}/> */}
                                                                </TooltipComponent>
                                                            </div>
                                                        </div>
                                                        {/* <div className="text-gray-400 hover:text-gray-800 mb-2"><a className="flex gap-x-2">Введите наименование заказчика на латинице. Например: <p className="hover:text-blue-500 underline">ClientVehi</p></a></div> */}

                                                        <input type="text"
                                                            className={
                                                                error ? "form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                            }
                                                            placeholder="Client"
                                                            onChange={
                                                                (e) => setClient(e.target.value)
                                                            }
                                                            value={client}/>
                                                    </div>
                                                    <div className="pt-4 pb-2 gap-2 ">
                                                        <div className="flex gap-1 items-center justify-between">
                                                            <div className="text-gray-800 text-xl">
                                                                <a>Porject Number</a>
                                                            </div>
                                                            <TooltipComponent content="Введите номер договора. Например: 123456"
                                                                position={"TopCenter"}
                                                                tabIndex={0} className="hover:scale-125 opacity-50 hover:opacity-100">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                                    </svg>
                                                                {/* <BiHelpCircle size={16} 
                                                                    tabIndex={-1}/> */}
                                                            </TooltipComponent>
                                                        </div>
                                                        <input type="text"
                                                            className={
                                                                error ? "form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                            }
                                                            placeholder="Project Number"
                                                            onChange={
                                                                (e) => setDocument(e.target.value)
                                                            }
                                                            value={document}/>
                                                    </div>
                                                    <div className="pb-2  gap-2">
                                                        <div className="flex gap-1 items-center mt-1 mb-1 justify-between">
                                                            <div className="text-gray-800 text-xl">
                                                                <a>Status</a>
                                                            </div>
                                                            <TooltipComponent content={
                                                                "Выберите статус проекта. Inactive не учитывается при просчете ресурсов DC. После указанной конечной даты проекты переходят в режим Inactive автоматически"
                                                            }position={"TopCenter"}
                                                                tabIndex={0} className="hover:scale-125 opacity-50 hover:opacity-100 pr-0.5">
                                                                <BiHelpCircle size={16}
                                                                    tabIndex={-1}/> 
                                                            </TooltipComponent>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="mr-1">
                                                                <button value="Active"
                                                                    onClick={
                                                                        (e) => setStatusActiveButton("Active")
                                                                    }
                                                                    className={
                                                                        `place-content-center tracking-wide text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-8 inline-flex items-center first-letter: ${
                                                                            statusActiveButton === "Active" ? `bg-green-500 text-white` : `bg-white`
                                                                        } `
                                                                }>
                                                                    <span className="mx-auto">Active</span>
                                                                </button>
                                                            </div>
                                                            <div className="mx-1">
                                                                <button value="Reserv"
                                                                    onClick={
                                                                        (e) => setStatusActiveButton("Reserv")
                                                                    }
                                                                    className={
                                                                        `place-content-center  tracking-wide text-gray-800 font-bold rounded border-b-2 border-yellow-500 hover:border-yellow-600 hover:bg-yellow-500 hover:text-white shadow-md py-2 px-8 inline-flex items-center ${
                                                                            statusActiveButton === "Reserv" ? `bg-yellow-500 text-white` : `bg-white`
                                                                        }`
                                                                }>
                                                                    <span className="mx-auto">Reserv</span>

                                                                </button>
                                                            </div>
                                                            <div className="ml-1 ">
                                                                <button value="Inactive"
                                                                    onClick={
                                                                        (e) => setStatusActiveButton("Inactive")
                                                                    }
                                                                    className={
                                                                        `place-content-center  tracking-wide text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-8 inline-flex items-center ${
                                                                            statusActiveButton === "Inactive" ? `bg-red-500 text-white` : `bg-white`
                                                                        }`
                                                                }>
                                                                    <span className="">Inactive</span>

                                                                </button>
                                                            </div>
                                                        </div>
                                                </div>
                                                    <div className="pb-2 gap-2">
                                                        <div className="grid grid-cols-5 grid-rows-1 items-center">
                                                            <div className="flex gap-1 items-center col-start-1 col-end-4">
                                                                <div className="text-gray-800 text-xl pt-1">
                                                                    <a>Contract Resources</a>
                                                                </div>
                                                            </div>
                                                            <div className="pl-4 col-start-7 row-span-1">
                                                                <TooltipComponent content={
                                                                        `Введите количество ресурсов заключеных в договоре. RAM, SSD, FC, HDD учитываются в гигабайтах. \nПример:
                                                                        CPU: 64, RAM:128, SSD: 256, FC: 512, NL:1024
                                                                        `
                                                                    }
                                                                        position={"TopCenter"}
                                                                        tabIndex={0} className="hover:scale-125 opacity-50 hover:opacity-100">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4  ">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                                            </svg>
                                                                        {/* <BiHelpCircle size={16}
                                                                            tabIndex={-1}/> */}
                                                                </TooltipComponent>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 justify-between pt-2 ">
                                                            <div>
                                                                <div className="flex place-content-center gap-x-1 items-center ">
                                                                    <HiOutlineCpuChip size={12}/>
                                                                    <p className="text-xs">CPU</p>
                                                                </div>

                                                                <input id="cpu" type="text"
                                                                    className={
                                                                        error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                                    }
                                                                    placeholder="16"
                                                                    onChange={
                                                                        (e) => setCPU(e.target.value)
                                                                    }
                                                                    value={cpu}/>
                                                            </div>
                                                            <div>
                                                                <div className="flex place-content-center gap-x-1 items-center ">
                                                                    <CgSmartphoneRam size={12}/>
                                                                    <p className="text-xs">RAM</p>
                                                                </div>
                                                                <input type="text"
                                                                    className={
                                                                        error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                                    }
                                                                    placeholder="32"
                                                                    onChange={
                                                                        (e) => setRAM(e.target.value)
                                                                    }
                                                                    value={ram}/>
                                                            </div>
                                                            <div>
                                                                <div className="flex place-content-center gap-x-1 items-center ">
                                                                    <TfiHarddrive size={12}/>
                                                                    <p className="text-xs">SSD</p>
                                                                </div>
                                                                <input type="text"
                                                                    className={
                                                                        error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                                    }
                                                                    placeholder="64"
                                                                    onChange={
                                                                        (e) => setSSD(e.target.value)
                                                                    }
                                                                    value={ssd}/>
                                                            </div>
                                                            <div>
                                                                <div className="flex place-content-center gap-x-1 items-center ">
                                                                    <FiHardDrive size={12}/>
                                                                    <p className="text-xs">FC</p>
                                                                </div>
                                                                <input type="text"
                                                                    className={
                                                                        error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                                    }
                                                                    placeholder="128"
                                                                    onChange={
                                                                        (e) => setFC(e.target.value)
                                                                    }
                                                                    value={fc}/>
                                                            </div>
                                                            <div>
                                                                <div className="flex place-content-center gap-x-1 items-center ">
                                                                    <CiHardDrive size={12}/>
                                                                    <p className="text-xs">NL</p>
                                                                </div>
                                                                <input type="text"
                                                                    className={
                                                                        error ? "form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                                    }
                                                                    placeholder="256"
                                                                    onChange={
                                                                        (e) => setNL(e.target.value)
                                                                    }
                                                                    value={nl}/>
                                                            </div>
                                                    </div>
                                                    </div>
                                                    <div className="pt-2 pb-2 gap-2 ">
                                                        <div className="flex gap-1 items-center justify-between">
                                                            <div className="text-gray-800 text-xl pb-1">
                                                                <a>Tags</a>
                                                            </div>
                                                            <TooltipComponent content="Введите Тэги клиента через запятую. Регистр букв влияет на результат. Например: BA,PA,BusinessAnalytics"
                                                                position={"TopCenter"}
                                                                tabIndex={0} className="hover:scale-125 opacity-50 hover:opacity-100">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                                                    </svg>
                                                                {/* <BiHelpCircle size={16}
                                                                    tabIndex={-1}/> */}
                                                            </TooltipComponent>
                                                        </div>
                                                        <input type="text"
                                                            className={
                                                                error ? "form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                            }
                                                            placeholder={statusActiveButton === "Reserv" ? "Reserved": "Cuba,Tovma,CUBA"}
                                                            onChange={
                                                                (e) => {statusActiveButton === "Reserv" ? setTags("Reserved") : setTags(e.target.value)}
                                                            }
                                                            value={statusActiveButton === "Reserv"? "Reserved": tags}
                                                            disabled={statusActiveButton === "Reserv"}/>
                                                    </div>
                                                    <div className="pt-2 gap-2">
                                                        <div className="mb-2 flex justify-between items-center">
                                                            <a className="text-gray-800 text-xl">End Date</a>
                                                            <TooltipComponent content={
                                                                        "Введите день окончания проекта. По мере истечения времени статус изменится на Inactive"
                                                                    }
                                                                        position={"TopCenter"}
                                                                        tabIndex={0} className="hover:scale-125 opacity-50 hover:opacity-100">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                                            </svg>
                                                                        {/* <BiHelpCircle size={16}
                                                                            tabIndex={-1}/> */}
                                                                </TooltipComponent>
                                                        </div>
                                                        
                                                        <div className="pl-1 w-[55%]">
                                                        <DatePickerComponent  id="datepicker"  format='dd-MM-yyyy'
                                                            placeholder="Выберите дату окончания проекта"
                                                            onChange={
                                                                (e) => setDate(e.target.value)
                                                            }
                                                            value={date} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 px-4 py-3 gap-2 sm:flex sm:flex-row-reverse sm:px-6">
                                <div className={
                                    error ? "flex justify-between" : "flex between"
                                }>
                                    {
                                    error ? <p className="text-red-400 text-semibold">Не удалось загрузить данные на сервер. Убедитесь что все поля заполнены либо обратитесь к администратору</p> : ""
                                }
                                    <button type="submit"
                                        data-ripple="true"
                                        disabled={isLoading}
                                        className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        style={
                                            {backgroundColor: currentColor}
                                        }
                                        onClick={handleSubmit}>
                                        Upload
                                    </button>
                                </div>
                                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={
                                            () => setDeviceForm(false)
                                        }
                                        ref={cancelButtonRef}>
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
