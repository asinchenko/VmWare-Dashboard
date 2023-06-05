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
export default function CollocationFreeModal(props) {
    const {user} = useAuthContext();
    const {openModalFree, setOpenModalFree, setSavePushed, setSaveText, setSaveSuccess, spreadsheetRef, collcationaNewFIle, racksModal, racksPositionModal, rackAction} = props;
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
    const [statusActiveButton, setStatusActiveButton] = useState("Встреча")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const collocation = collcationaNewFIle;
        const title = 'Collocation_DC_Astana.xlsx';
        const modifiedBy = user.description;
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
        setOpenModalFree(false)
        setSavePushed(false)
        setSaveText("Save")
    }
    return (
        <Transition.Root show={openModalFree}
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
                                    <div className="sm:flex sm:items-start">
                                        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                                        </div> */}
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left divide-y-2">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 flex gap-1">
                                                <p>Освободить Стойки</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-400" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                </svg>
                                            </Dialog.Title>
                                            <div>
                                                Вы действительно желаете освободить указанные стойки? 
                                                <p className="font-bold">{racksModal}</p>
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
