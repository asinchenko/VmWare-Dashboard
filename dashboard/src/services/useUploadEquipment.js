import React, {useState} from 'react';
import axios from 'axios'

export const useUploadEquipment = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);


    const upload = async(vendor, type, status, cpu, ram, description) => {
        setIsLoading(true);
        setError(null);

        await axios.post(`http://${process.env.REACT_APP_BACKEND_API}:4000/api/hw/add`, {
            vendor, type, status, cpu, ram, description
        }).then(res => {
            setIsLoading(false)
        }).catch(e => {
            console.log(e.response.data.error)
            setIsLoading(false);
            setError(e.response.data.error)
    });
    } 
    return {upload, isLoading, error}
}