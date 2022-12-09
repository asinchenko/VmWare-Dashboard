import React, {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import axios from 'axios'

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();


    const signup = async(email, password) => {
        setIsLoading(true);
        setError(null);

        await axios.post('http://localhost:4000/api/user/signup', {
            email, password
        }).then(res => {
            let result = JSON.stringify(res.data);
            localStorage.setItem('user', result)
            dispatch({type:'LOGIN', payload: result})
            setIsLoading(false)
        }).catch(e => {
            console.log(e.response.data.error)
            setIsLoading(false);
            setError(e.response.data.error)
    });
    } 
    return {signup, isLoading, error}
}