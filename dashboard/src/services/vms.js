import React from "react";
import useAxios from "./useAxios";

const VMsDataService = () => {
  const http = useAxios();

  const getLatest = (page = 0) => {
    return http.get(`vms/latest`);
  };

  return {getLatest};
};

export default VMsDataService;