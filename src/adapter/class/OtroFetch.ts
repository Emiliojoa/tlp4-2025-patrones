import { IHttpClient } from "../interfaces/IHttpClient";

export class Tetch implements IHttpClient {
    post<T>(URL: string, data: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async get<T>(URL: string): Promise<T> {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }
}