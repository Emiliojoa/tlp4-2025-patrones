export interface IHttpClient {

    get<T>(URL: string): Promise<T>;
    post<T>(URL: string, data: any): Promise<T>;
}