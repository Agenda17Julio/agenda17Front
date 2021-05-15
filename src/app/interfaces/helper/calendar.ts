import { i_event_resp } from '../resp_serv/convocatorias';

export interface i_argsStr {
    date: Date,
    dateStr: string;
    dayEl: Object;
    view: i_view_str;
}

export interface i_view_str {
    getCurrentData: Function;
    type: string;
    activeEnd: string;
    activeStart: string;
    calendar: Object;
    currentEnd: Date;
    currentStart: Date;
    title: string;
}

export interface i_event_calendar {
    el: Object;
    event: i_event;
    jsEvent: Object;
    view: i_view_str;
}


export interface i_event {
    allDay: boolean;
    display: string;
    end: Date;
    endStr: string;
    id: string;
    start: Date;
    startStr: string;
    title: string;
    extendedProps: i_event_resp;
}