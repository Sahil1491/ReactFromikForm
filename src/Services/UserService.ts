import axios from "axios";
import { IUser } from "../Models/IUsers";

export class UserService {
    private static URL: string = 'https://dummyjson.com/users';

    public static getallUsers() {
        return axios.get<{ users: IUser[], total: number, skip: number, limit: number }>(this.URL);
    }
}
