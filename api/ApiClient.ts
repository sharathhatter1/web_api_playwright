import  { APIRequestContext } from '@playwright/test';

export class ApiClient {
  private baseURL: string;

  constructor(private request: APIRequestContext) {
    this.baseURL = process.env.API_BASE_URL || 'https://fakestoreapi.com';
  }

  async get(endpoint: string) {
    const response = await this.request.get(`${this.baseURL}${endpoint}`);
    return {
      status: response.status(),
      data: await response.json(),
      headers: response.headers()
    };
  }

  async post(endpoint: string, data: any) {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    return {
      status: response.status(),
      data: await response.json(),
      headers: response.headers()
    };
  }

  async put(endpoint: string, data: any) {
    const response = await this.request.put(`${this.baseURL}${endpoint}`, {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    return {
      status: response.status(),
      data: await response.json(),
      headers: response.headers()
    };
  }

  async delete(endpoint: string) {
    const response = await this.request.delete(`${this.baseURL}${endpoint}`);
    return {
      status: response.status(),
      data: response.status() === 204 ? null : await response.json(),
      headers: response.headers()
    };
  }
}
 