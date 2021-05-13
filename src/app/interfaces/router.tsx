export interface i_router {
    isAuthenticate: boolean;
    exact?:boolean;
    path:string;
    Component: Function;
}