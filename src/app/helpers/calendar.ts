import { FormatterInput,ButtonTextCompoundInput,PluginDef,DateRangeInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; 
import listView from '@fullcalendar/list';
import moment from './momentjs';

export const titleFormat:FormatterInput ={
    year: 'numeric',
    month: 'short'
}

export const buttonText:ButtonTextCompoundInput = {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día'
}

export const dayHeaderFormat:FormatterInput = {
    weekday: 'short'
}

export const weekNumberFormat:FormatterInput = {
    week: 'numeric'
}

export const eventTimeFormat:FormatterInput ={
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short'
}

export const headerToolbar = {
    start: 'dayGridMonth,listWeek', 
    center: 'title',
    end: 'today prev,next'
}


export const plugins:Array<PluginDef> =  [ 
    dayGridPlugin,
    interactionPlugin,
    listView
]

export const currentDate = moment(Date.now());

export const validRange:DateRangeInput = {
    start: currentDate.format('YYYY-MM')
}
