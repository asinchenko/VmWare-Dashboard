import {Fragment, useRef, useState, useEffect} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import './collocation.css';
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
import axios from 'axios'
import moment from 'moment'
export default function CollocationModal(props) {
    const {user} = useAuthContext();
    const {openModalReserv, setOpenModalReserv, setSavePushed, setSaveText, setSaveSuccess, spreadsheetRef, collcationaNewFIle, racksModal, racksPositionModal, rackAction} = props;
    const cancelButtonRef = useRef(null)
    const navigate = useNavigate();
    const {
        uploadCollocation,
        error,
        isLoading,
        setError,
    } = useUploadCustomers()
    const title = 'Collocation_DC_Astana.xlsx';
    const {currentColor} = useStateContext();
    const [client, setClient] = useState('');
    const [date, setDate] = useState('');
    const [modifiedBy, setModifiedBy] = useState({email:(user.email).split('@')[0], description: user.description})
    const [statusActiveButton, setStatusActiveButton] = useState("Резерв")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const collocation = collcationaNewFIle;
        const title = 'Collocation_DC_Astana.xlsx';
        const modifiedBy = user.description;
        for (let y = 0; y < racksPositionModal.length; y++) {
            collocation.Workbook.sheets[0].rows[racksPositionModal[y][0]+2].cells[racksPositionModal[y][1]].value = client;
            collocation.Workbook.sheets[0].rows[racksPositionModal[y][0]+1].cells[racksPositionModal[y][1]].value = moment.utc(date).format('HH:mm, MM.D.YY');
        }
        const updateDatabase = await axios.post(`http://${process.env.REACT_APP_BACKEND_API}:4000/api/collocation/`, {
            collocation, title, modifiedBy, rackAction, racksPositionModal, client, date
            }).then(res => {
                closeModal()
                setSavePushed(false)
                setSaveText("Save")
                setSaveSuccess(true)
                navigate(0);
            }).catch(e => {
                console.log(e.response.data.error)
                closeModal()
                setSavePushed(false)
                setSaveText("Save")
                setSaveSuccess(false)
            })

    }
    const closeModal = () => {
        setOpenModalReserv(false)
        setSavePushed(false)
        setSaveText("Save")
    }
    return (
        <Transition.Root show={openModalReserv}
            as={Fragment}>
            <Dialog as="div" className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={closeModal}>
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
                                    <div className="">
                                        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                                        </div> */}
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left divide-y-2">
                                            <Dialog.Title as="h3" className="text-base font-semibold text-gray-900 flex gap-1">
                                                <p>Reserv Racks </p>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={currentColor} className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                </svg>
                                            </Dialog.Title>
                                            <div className="mt-2">
                                              <div className="mb-4 overscroll-auto">
                                                    <div className="gap-4 mb-2">
                                                        <div className="mt-4 flex gap-1 items-center justify-between">
                                                            <div className="text-gray-800 text-xl flex gap-1 items-center mt-2 mb-1">
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
                                                    <div className="pt-2 gap-2">
                                                        <div className="mb-2 flex justify-between items-center mt-2">
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
                                        onClick={closeModal}
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
