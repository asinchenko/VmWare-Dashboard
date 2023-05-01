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

export default function Modal(props) {
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
    const [cpu, setCPU] = useState(0);
    const [ram, setRAM] = useState(0);
    const [ssd, setSSD] = useState(0);
    const [fc, setFC] = useState(0);
    const [nl, setNL] = useState(0);
    const [tags, setTags] = useState("");

    const [statusActiveButton, setStatusActiveButton] = useState("Active")

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }
    const reloadPage = () => {
        console.log(client, document, statusActiveButton, cpu, ram, ssd, fc, nl, date)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (client) {
            try {
                await uploadClient(client, document, statusActiveButton, cpu, ram, ssd, fc, nl, tags, date)
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
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Add Clients
                                            </Dialog.Title>
                                            <div className="mt-2">
                                              <div className="mb-4 overscroll-auto divide-y-1">
                                                    <div className="gap-4">
                                                        <div className="flex gap-1 items-center">
                                                            <div className="text-gray-800 text-xl">
                                                                <a>Customer Name</a>
                                                            </div>
                                                            <TooltipComponent content="Введите наименование заказчика на латинице. Например: Clientvehi"
                                                                position={"TopCenter"}
                                                                tabIndex={0}>
                                                                <BiHelpCircle size={20}
                                                                    tabIndex={-1}>Show Tooltip</BiHelpCircle>
                                                            </TooltipComponent>
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
                                                    <div className="pt-4 pb-4 gap-2 ">
                                                        <div className="flex gap-1 items-center">
                                                            <div className="text-gray-800 text-xl">
                                                                <a>Porject Number</a>
                                                            </div>
                                                            <TooltipComponent content="Введите номер договора. Например: 123456"
                                                                position={"TopCenter"}
                                                                tabIndex={0}>
                                                                <BiHelpCircle size={20}
                                                                    tabIndex={-1}>Show Tooltip</BiHelpCircle>
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
                                                    <div className="pb-4 gap-2">
                                                        <div className="flex gap-1 items-center">
                                                            <div className="text-gray-800 text-xl">
                                                                <a>Status</a>
                                                            </div>
                                                            <TooltipComponent content="Выберите статус проекта. Inactive не учитывается при просчете ресурсов DC. После указанной конечной даты проекты переходят в режим Inactive автоматически"
                                                                position={"TopCenter"}
                                                                tabIndex={0}>
                                                                <BiHelpCircle size={20}
                                                                    tabIndex={-1}>Show Tooltip</BiHelpCircle>
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
                                                    <div className="pb-4 gap-2 divide-y-1">
                                                        <div className="grid grid-cols-8 grid-rows-2">
                                                            <div className="flex gap-1 items-center col-start-1 col-end-6">
                                                                <div className="text-gray-800 text-xl">
                                                                    <a>Contract Resources</a>
                                                                </div>
                                                                <TooltipComponent content="Введите количество ресурсов заключеных в договоре. RAM, SSD, FC, HDD учитываются в гигабайтах. Пример справа."
                                                                    position={"TopCenter"}
                                                                    tabIndex={0}>
                                                                    <BiHelpCircle size={20}
                                                                        tabIndex={-1}>Show Tooltip</BiHelpCircle>
                                                                </TooltipComponent>
                                                            </div>
                                                            <div className="text-gray-400 hover:text-gray-800 mb-2 col-start-6 col-end-8 row-span-2 text-xs ml-4">
                                                                <div className=" pl-10">
                                                                    <p className="hover:text-blue-500 underline">CPU: 64</p>
                                                                    <p className="hover:text-blue-500 underline">RAM: 1024</p>
                                                                    <p className="hover:text-blue-500 underline">SSD: 512</p>
                                                                    <p className="hover:text-blue-500 underline">FC: 0</p>
                                                                    <p className="hover:text-blue-500 underline">NL: 300</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 justify-between pt-2 ">
                                                            <div>
                                                                <div className="flex place-content-center gap-x-1 items-center ">
                                                                    <HiOutlineCpuChip/>
                                                                    <p className="">CPU</p>
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
                                                                    <CgSmartphoneRam/>
                                                                    <p className="">RAM</p>
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
                                                                    <TfiHarddrive/>
                                                                    <p className="">SSD</p>
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
                                                                    <FiHardDrive/>
                                                                    <p className="">FC</p>
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
                                                                    <CiHardDrive/>
                                                                    <p className="">NL</p>
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
                                                    <div className="pt-2 pb-4 gap-2 ">
                                                        <div className="flex gap-1 items-center">
                                                            <div className="text-gray-800 text-xl">
                                                                <a>Tags</a>
                                                            </div>
                                                            <TooltipComponent content="Введите Тэги клиента через запятую. Регистр букв влияет на результат. Например: BA,PA,BusinessAnalytics"
                                                                position={"TopCenter"}
                                                                tabIndex={0}>
                                                                <BiHelpCircle size={20}
                                                                    tabIndex={-1}>Show Tooltip</BiHelpCircle>
                                                            </TooltipComponent>
                                                        </div>
                                                        <input type="text"
                                                            className={
                                                                error ? "form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                                                            }
                                                            placeholder="Cuba,Tovma,CUBA"
                                                            onChange={
                                                                (e) => setTags(e.target.value)
                                                            }
                                                            value={tags}/>
                                                    </div>
                                                    <div className="pt-2 gap-2">
                                                        <div className="mb-2">
                                                            <a className="text-gray-800 text-xl">End Date</a>
                                                        </div>
                                                        <div className="pl-1">
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
                                <div className={
                                    error ? "flex justify-between" : "flex justify-end"
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
                                        onClick={reloadPage}>
                                        Upload
                                    </button>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={
                                            () => setDeviceForm(false)
                                    }>
                                        Deactivate
                                    </button>
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
