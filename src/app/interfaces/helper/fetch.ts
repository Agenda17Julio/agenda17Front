export interface i_fetch {
    url: string;
    method?: string;
    data?: any;
    headers?: HeadersInit,
    isjson?: boolean
}