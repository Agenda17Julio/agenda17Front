export interface i_auth_state {
    uid: string;
    username: string;
    email: string;
    checking?: boolean;
}


export interface i_auth_action {
    type: string;
    payload?: i_auth_state;
}