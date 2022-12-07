import http from "../http-axios";

class IMGDataService {
    
    getAll(page=0){
        return http.get(`img/?page=${page}`);
    }

    post(data){
        return http.post(`img/pic`,data)
    }

    getById(id){
        return http.get(`img/id/${id}`)
    }

    find(query, by="name", page=0){
        return http.get(`img/?${by}=${query}&page=${page}`)
    }
    
    getLatest(){
        return http.get(`img/latest`);
    }
}

export default new IMGDataService();