import http from "../http-axios";

class VMsDataService {
    getAll(page=0){
        return http.get(`vms/?page=${page}`);
    }

    get(id){
        return http.get(`vms/id/${id}`)
    }

    find(query, by="name", page=0){
        return http.get(`vms/?${by}=${query}&page=${page}`)
    }
    
    getLatest(){
        return http.get(`vms/latest`);
    }
}

export default new VMsDataService();