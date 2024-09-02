export class ApiConfiguration {
    accessToken?: string | object | number | null | boolean;
}

export type HttpHeaders = {
    [key: string]: string;
};

export type RequestConfig = {
    headers: HttpHeaders;
};