export interface i_token {
    exp: number;
    iat: number;
    payload: i_payload_token;
}

export interface i_payload_token {
    uid: string;
    username: string;
}