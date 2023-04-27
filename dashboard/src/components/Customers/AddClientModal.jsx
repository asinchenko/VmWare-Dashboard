import React, {useEffect, useState} from 'react'
import {DialogComponent} from '@syncfusion/ej2-react-popups';
import './addclient.css';
import {useStateContext} from '../../contexts/ContextProvider';
import {useUploadCustomers} from '../../services/useUploadCustomers'
import {useNavigate} from "react-router-dom";


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

    const animationSettings = {
        effect: 'None'
    };
    buttons = [{
            click: dlgButtonClick,
            buttonModel: {
                content: 'Learn More',
                isPrimary: true
            }
        },];
    function dlgButtonClick() {
        window.open('https://www.syncfusion.com/company/about-us');
    }
    const closeModal = () => {
      setDeviceForm(false);
    };
    return (
        <DialogComponent id="modalDialog"
            isModal={true}
            showCloseIcon={true}
            animationSettings={animationSettings}
            width="500px"
            header="About SYNCFUSION Succinctly Series"
            visible={deviceForm}
            buttons={buttons}
            close={closeModal}>
            <div className="flex justify-between mb-4 overscroll-auto">
                <div className="">
                    <a className="text-gray-500">Customer</a>
                    <input type="text"
                        className={
                            error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
                        }
                        placeholder="ex. Business Algorithms"
                        onChange={
                            (e) => setClient(e.target.value)
                        }
                        value={client}/>
                </div>
                <div className="">
                    <a className="text-gray-500">Project Number</a>
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
                <div className="">
                    <a className="text-gray-500">Type</a>
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
                <div className="">
                    <a className="text-gray-500">End Date</a>
                    <input type="text"
                        className={
                            error ? "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" : '"form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"'
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
