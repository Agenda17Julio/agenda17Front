import moment from 'moment';
moment.locale('es',{
    relativeTime: {
        future: 'expira en %s',
        past: 'hace %s',
        mm: "%d minutos",
        h:  "una hora",
        hh: "%d horas",
        d:  "un día",
        dd: "%d dias",
        M:  "un mes",
        MM: "%d meses",
        y:  "un año",
        yy: "%d años",
        s:  "segundos"
    }
});


export default moment;