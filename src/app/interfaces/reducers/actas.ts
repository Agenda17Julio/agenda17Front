export interface i_state {
    allactas?:Array<i_acta>;
    annoucement?:Array<i_annoucement>
    aux?:any;
    registros?:number;
}

export interface i_annoucement {
    id: number;
    asunto: string;
}

export interface i_action {
    type: string;
    payload?: i_state;
}

export interface i_attachment_acta {
    id: number;
    filename: string;
}

export interface i_acta {
    id?: number;
    id_conv?: number;
    asunto?: string;
    adjuntos?:Array<i_attachment_acta>
}