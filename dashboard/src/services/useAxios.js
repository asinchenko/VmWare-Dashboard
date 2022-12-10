import axios from "axios";
import {useAuthContext} from './useAuthContext'

const useAxios = () => {
    const {user} = useAuthContext();
    if (user === null){
      return axios.create({
        baseURL: "http://localhost:4000/api/",
        headers: {
          "Content-type": "application/json",
        },
      });
    }else {
      return axios.create({
        baseURL: "http://localhost:4000/api/",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });
      
    }
  };

export default useAxios;