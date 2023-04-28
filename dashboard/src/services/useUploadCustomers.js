import React, {useState} from 'react';
import useAxios from "./useAxios";

export const useUploadCustomers = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const http = useAxios();

    const uploadClient = async(client,document,type,date) => {
        setIsLoading(true);
        setError(null);
        await http.post(`/client/client`, {
            client,document,type,date
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
    const deleteClient = async(_id) => {
        setIsLoading(true);
        setError(null);
        await http.delete(`/client/${_id}`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }}).then(res => {
            setIsLoading(false)
        }).catch(e => {
            setIsLoading(false);
            setError(e.response.data.error)
            throw Error(e.response.data.error)
    });
    }
    const updateClient = async(_id, client,document,type,tags,date) => {
        setIsLoading(true);
        setError(null);
        await http.put(`/client/client`, {
            _id, client,document,type,tags,date
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
    return {uploadClient, isLoading, error, setError, deleteClient, updateClient}
}