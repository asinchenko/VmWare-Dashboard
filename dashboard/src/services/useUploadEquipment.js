import React, {useState} from 'react';
import useAxios from "./useAxios";

export const useUploadEquipment = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const http = useAxios();

    const upload = async(vendor, name, type, status, cpu, ram, description) => {
        setIsLoading(true);
        setError(null);

        await http.post(`/hw/device`, {
            vendor, name, type, status, cpu, ram, description
        }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }}).then(res => {
            setIsLoading(false)
        }).catch(e => {
            console.log(e.response.data.error)
            setIsLoading(false);
            setError(e.response.data.error)
    });
    } 
    return {upload, isLoading, error, setError}
}