import React from "react";
import useAxios from "./useAxios";

const HWDataService = () => {
  const http = useAxios();

  const getById = (id) => {
    return http.get(`hw/id/${id}`)
  };
  const getAll = (page = 0) => {
    return http.get(`hw/`);
  };

  return {getById, getAll};
};

export default HWDataService;