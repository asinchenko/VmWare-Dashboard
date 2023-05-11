import {Fragment, useRef, useState, useEffect} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useStateContext} from '../../contexts/ContextProvider';
import {useUploadCustomers} from '../../services/useUploadCustomers'
import {useNavigate} from "react-router-dom";
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {useAuthContext} from '../../services/useAuthContext'

export default function Modal(props) {
    const {showSignupModal, setShowSignupModal, email} = props;
    const {currentColor} = useStateContext();
    const cancelButtonRef = useRef(null)
    const {
        error,
        isLoading,
    } = useUploadCustomers()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        window.location.href = '../login';
    }
    const redirectOnClose = () => {
        window.location.href = '../login';
    }
    return (
        <Transition.Root show={showSignupModal}
            as={Fragment}>
            <Dialog as="div" className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={redirectOnClose}>
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
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 flex gap-1 items-center justify-between">
                                                <div className="flex gap-1 items-center">
                                                    <p>Email verification </p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={currentColor} className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                                                    </svg>
                                                </div>
                                                <div className="items-center">
                                                    <TooltipComponent content="Письмо с ссылкой на подтверждение аккаунта должно поступить на вашу почту @vehi.kz в Яндексе"
                                                                        position={"TopCenter"}
                                                                        tabIndex={0} className="hover:scale-125 opacity-50 hover:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                                    </svg>
                                                    </TooltipComponent>
                                                </div>
                                            </Dialog.Title>
                                            <div className="mt-2">
                                              <div className="mb-2 overscroll-auto divide-y-1">
                                                    <div className="gap-4">
                                                        <div className="mt-4 gap-2">
                                                            <a className="text-gray-800">Email was sent to your </a>
                                                            <a className="font-bold">{email}</a> 
                                                            <a> email address</a>
                                                            <p>Please check and verify your account via provided link</p>
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
                                    error ? <p className="text-red-400 text-semibold">Не удалось получить данные. Убедитесь что все поля заполнены либо обратитесь к администратору</p> : ""
                                }
                                    <button type="submit"
                                        data-ripple="true"
                                        disabled={isLoading}
                                        className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        style={
                                            {backgroundColor: currentColor}
                                        }
                                        onClick={handleSubmit}>
                                        OK!
                                    </button>
                                </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
