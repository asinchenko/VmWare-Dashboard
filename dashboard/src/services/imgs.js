import React from "react";
import useAxios from "./useAxios";

const IMGDataService = () => {
  const http = useAxios();

  const getAll = (page = 0) => {
    return http.get(`img/?page=${page}`);
  };

  return {getAll};
};

export default IMGDataService;