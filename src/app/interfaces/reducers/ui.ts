export interface i_ui_state {
    loading?: boolean;
    modal?: boolean;
    fab?: i_fab_state;
    calendarDate?: Date;
    pagina?: number;
    showfile?: i_showfile;
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


export interface i_showfile  {
    show: boolean,
    id: string;
    filename: string;
}
