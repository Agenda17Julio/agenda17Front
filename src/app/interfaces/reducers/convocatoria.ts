import { i_events_convocatoria, i_event_resp } from '../helper/events';

export interface i_conv_state {
    actives?: Array<i_event_resp> | Array<i_events_convocatoria>;
    events?: Array<i_event_resp> | Array<i_events_convocatoria>;
    active?: i_event_resp | i_events_convocatoria;
    aux?: i_event_resp
}


export interface i_conv_action {
    type: string;
    payload?: i_conv_state;
}