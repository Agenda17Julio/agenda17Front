import { i_signin } from "../components/auth";

export interface i_resp_serv {
    ok: boolean;
    msg: string;
    token: string;
    err?: i_signin<i_resp_err>;
}

interface i_resp_err {
    msg: string;
    param: string;
    location: string;
}