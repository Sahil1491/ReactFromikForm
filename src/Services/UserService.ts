//  API call method is use here to fetch data.


import axios from "axios";
import { IUser } from "../Models/IUsers";

export class UserService {
    private static URL: string = 'https://dummyjson.com/users';

    public static getallUsers() {
        return axios.get<{ users: IUser[], total: number, skip: number, limit: number }>(this.URL);
    }

    public static getUserById(id:number){
        return axios.get<IUser>(`${this.URL}/${id}`);
    }
}
