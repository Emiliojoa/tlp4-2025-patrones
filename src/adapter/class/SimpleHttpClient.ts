import { IHttpClient } from "../interfaces/IHttpClient";

export class SimpleHttpClient implements IHttpClient {
  constructor(private adapter: IHttpClient) {}

  setAdapter(adapter: IHttpClient) {
    this.adapter = adapter;
  }

  async get<T>(URL: string): Promise<T> {
    return this.adapter.get<T>(URL);
  }

  async post<T>(URL: string, data: any): Promise<T> {
    return this.adapter.post<T>(URL, data);
  }
}
