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
            let result = res.data;
            console.log(1)
            localStorage.setItem('user', result)
            console.log(2)
            dispatch({type:'LOGIN', payload: result})
            console.log(3)
            setIsLoading(false)
            console.log(4)
        }).catch(e => {
            console.log(e.response.data.error)
            setIsLoading(false);
            setError(e.response.data.error)
    });
    } 
    return {signup, isLoading, error}
}