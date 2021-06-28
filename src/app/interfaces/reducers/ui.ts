export interface i_ui_state {
    loading?: boolean;
    modal?: boolean;
    fab?: i_fab_state;
    calendarDate?: Date;
    pagina?: number;
    files?: File[];
    filename?: string;
    activefile?: string;
    delactivefile?: boolean;
}

export interface i_ui_action {
    type: string;
    payload?: i_ui_state;
}

export interface i_fab_state {
    plus?: boolean,
    edit?: boolean,
    del?: boolean,
    delAdjunto?:boolean,
    downloadAdjunto?:boolean;
    view?: boolean;
}
