import http from "../http-axios";

class HWDataService {
    
    getAll(page=0){
        return http.get(`hw/?page=${page}`);
    }

    getById(id){
        return http.get(`hw/id/${id}`)
    }

    find(query, by="name", page=0){
        return http.get(`hw/?${by}=${query}&page=${page}`)
    }
    
    getLatest(){
        return http.get(`hw/latest`);
    }
}

export default new HWDataService();