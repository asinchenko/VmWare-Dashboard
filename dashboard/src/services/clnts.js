import React from "react";
import useAxios from "./useAxios";

const ClientDataService = () => {
  const http = useAxios();

  const getClientById = (id) => {
    return http.get(`client/id/${id}`)
  };
  const getClientAll = (page = 0) => {
    return http.get(`client/`);
  };

  return {getClientById, getClientAll};
};

export default ClientDataService;