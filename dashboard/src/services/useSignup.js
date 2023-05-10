import React, {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import axios from 'axios'

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    
    const signup = async (email, password) => {
        let requestSignupResult = false;
        setIsLoading(true);
        setError(null);
        const signupRequest = await axios.post(`http://${process.env.REACT_APP_BACKEND_API}:4000/api/user/signup`, {
            email, password
        }).then(res => {
            let result = JSON.stringify(res.data);
            localStorage.setItem('user', result)
            dispatch({type:'LOGIN', payload: result})
            setIsLoading(false)
            requestSignupResult = true;
        }).catch(e => {
            console.log(e.response.data)
            console.log(e.response.data.error)
            setIsLoading(false);
            setError(e.response.data.error)
    });
    return requestSignupResult
    } 
    return {signup, isLoading, error}
}