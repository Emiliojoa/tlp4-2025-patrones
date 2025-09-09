import { IHttpClient } from "../interfaces/IHttpClient";


export class FetchAdapter implements IHttpClient {
    async get<T>(URL: string): Promise<T> {
        try {
            const response = await fetch(URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en FetchAdapter:', error);
            throw error;
        }
    }

    async post<T>(URL: string, data: any): Promise<T> {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error en FetchAdapter POST:', error);
            throw error;
        }
    }
}
