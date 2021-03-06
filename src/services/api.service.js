import { apiTransport } from "../transport/api.transport";
import {BehaviorSubject} from "rxjs"

class ApiService {
    _allGames$ = new BehaviorSubject([]);

    async writeComment(data) {
        return await apiTransport.writeComment(data);
    }
}


export const apiService = new ApiService();