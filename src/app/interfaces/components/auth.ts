export interface i_signin {
    username: string;
    password: string;
}

export interface i_resp_serv {
    ok: boolean;
    msg: string;
    token: string;
}