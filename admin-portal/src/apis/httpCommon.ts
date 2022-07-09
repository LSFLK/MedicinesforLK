import {AsgardeoSPAClient, HttpRequestConfig } from "@asgardeo/auth-spa";
import { AxiosResponse } from "axios";

const auth = AsgardeoSPAClient.getInstance();

export default class Http {
    httpRequest: (config: HttpRequestConfig) => Promise<any>;
    baseUrl: string; // https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/0.1.0

    constructor(httpRequest: (config: HttpRequestConfig) => Promise<any>, baseUrl: string) {
        this.httpRequest = httpRequest;
        this.baseUrl = baseUrl;
    }

    /**
     * get method.
     */
    public async get<Type>(path:string, requestConfig?: HttpRequestConfig): Promise<AxiosResponse<Type, HttpRequestConfig>> {
        const config: HttpRequestConfig = {
            headers: {
                "accept": "application/json"
            },
            method: "GET",
            url: `${this.baseUrl}/${path}`,
            ...requestConfig
        };

        const response: AxiosResponse<Type, HttpRequestConfig> = await this.httpRequest(config);
        return response;
    }

    /**
     * patch method
     */
    public async patch<Type>(path:string, payload?: Type,requestConfig?: HttpRequestConfig): Promise<AxiosResponse<Type, HttpRequestConfig>> {
        const config: HttpRequestConfig = {
            headers: {
                "accept": "application/json"
            },
            method: "PATCH",
            url: `${this.baseUrl}/${path}`,
            data: payload,
            ...requestConfig
        };

        const response: AxiosResponse<Type, HttpRequestConfig> = await this.httpRequest(config);
        return response;
    }

    /**
     * put method
     */
    public async put<Type>(path:string, payload: Type,requestConfig?: HttpRequestConfig): Promise<AxiosResponse<Type, HttpRequestConfig>> {
        const config: HttpRequestConfig = {
            headers: {
                "accept": "application/json"
            },
            method: "PUT",
            url: `${this.baseUrl}/${path}`,
            data: payload,
            ...requestConfig
        };

        const response: AxiosResponse<Type, HttpRequestConfig> = await this.httpRequest(config);
        return response;
    }

    /**
     * delete
     */
    public async delete<Type>(path:string, requestConfig?: HttpRequestConfig): Promise<AxiosResponse<Type, HttpRequestConfig>> {
        const config: HttpRequestConfig = {
            headers: {
                "accept": "application/json"
            },
            method: "DELETE",
            url: `${this.baseUrl}/${path}`,
            ...requestConfig
        };

        const response: AxiosResponse<Type, HttpRequestConfig> = await this.httpRequest(config);
        return response;
    }

    /**
     * post method
     */
    public async post<Type>(path:string, payload: Type,requestConfig?: HttpRequestConfig): Promise<AxiosResponse<Type, HttpRequestConfig>> {
        const config: HttpRequestConfig = {
            headers: {
                "accept": "application/json"
            },
            method: "POST",
            url: `${this.baseUrl}/${path}`,
            data: payload,
            ...requestConfig
        };

        const response: AxiosResponse<Type, HttpRequestConfig> = await this.httpRequest(config);
        return response;
    }
}
