import axios from "axios";
import { IHttpClient } from "../interfaces/IHttpClient";

export class AxiosAdapter implements IHttpClient {
    async get<T>(URL: string): Promise<T> {
        const response = await axios.get<T>(URL);
        return response.data;
    }

    async post<T>(URL: string, data: any): Promise<T> {
        const response = await axios.post<T>(URL, data);
        return response.data;
    }
}
