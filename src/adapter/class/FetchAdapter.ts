import { IHttpClient } from "../interfaces/IHttpClient";


export class FetchAdapter implements IHttpClient {
    async get<T>(URL: string): Promise<T> {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }
    async post<T>(URL: string, data: any): Promise<T> {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    }
}
