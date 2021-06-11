import { i_search } from '../components/convocatoria';
import { i_event_resp as i_event } from '../resp_serv/convocatorias';

export interface i_conv_state {
    actives?: Array<i_event>;
    convocatorias?: i_convocatoria;
    active?: i_event ;
    aux?: i_event;
    listConv?: Array<string>;
    users?: Array<string>;
    valuesSearch?: i_search;
    typeList?: tipo_recurso;
}


export interface i_convocatoria {
    registros?: number;
    data: Array<i_event>;
}

export type tipo_recurso = 'all' | 'search';

export interface i_conv_action {
    type: string;
    payload?: i_conv_state;
}