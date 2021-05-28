export interface i_ui_state {
    loading?: boolean;
    modal?: boolean;
    fab?: i_fab_state;
    calendarDate?: Date;
    pagina?: number;
}

export interface i_ui_action {
    type: string;
    payload?: i_ui_state;
}

export interface i_fab_state {
    plus?: boolean,
    edit?: boolean,
    del?: boolean
}
