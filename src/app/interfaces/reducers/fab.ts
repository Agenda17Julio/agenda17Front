export interface i_fab_state {
    plus?: boolean,
    editDelete?: boolean
}


export interface i_fab_action {
    type: string;
    payload?: i_fab_state;
}