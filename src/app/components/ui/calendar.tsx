import FullCalendar,{ EventSourceInput } from '@fullcalendar/react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { clearActiveAnnoucement, loadActiveAnnoucement } from '../../actions/convocatoria';
import { activePlusFab, clearActiveFab, activeEditDeleteFab, setCalendarDate,clearCalendarDate, setActiveView } from '../../actions/ui';
import { i_event_calendar } from '../../interfaces/helper/calendar';
import { 
    titleFormat,
    buttonText,
    dayHeaderFormat,
    eventTimeFormat,
    headerToolbar,
    plugins,
    weekNumberFormat,
    validRange,
    currentDate
} from '../../helpers/calendar';
import { i_argsStr } from '../../interfaces/helper/calendar';
import { i_redux } from '../../interfaces/redux';

const Calendar = ( {listEvents}:{ listEvents:EventSourceInput }) => {
   
    const dispatch = useDispatch();
    const { ui:{fab},conv:{active},auth: {rol} } = useSelector((info:i_redux) => info);
  
    const handleOnClickDate = ({ dateStr,date }:i_argsStr) => {

        if( active ) dispatch(clearActiveAnnoucement());
            
        if ( moment(dateStr).format('yyyy-MM-DD') < currentDate.format('yyyy-MM-DD')) {
            if( fab?.plus || fab?.edit || fab?.del || fab?.view ){
                dispatch(clearCalendarDate());
                return dispatch(clearActiveFab());
            }else {
                return;
            }
        }else{
            dispatch(setCalendarDate(date));
            if(!fab?.plus && Number(rol) === 1 ) dispatch(activePlusFab());
        }
       
    }

    const handleEventClick = ({ event }:i_event_calendar) => {
        const { id,start,title,extendedProps } = event;

        
        if( Number(rol) === 1 ){
            dispatch(activeEditDeleteFab());
        }else {
            dispatch(setActiveView());        
        }
       
        const active:any = {
            ...extendedProps,
            id,
            title,
            date: start
        }

        return dispatch(loadActiveAnnoucement(active));
    }

    

    return <div className='card-panel'>
        <FullCalendar
            plugins={ plugins }
            locale='es'
            initialView="dayGridMonth"
            headerToolbar={ headerToolbar }
            titleFormat={ titleFormat }
            buttonText={ buttonText }
            dayHeaderFormat={ dayHeaderFormat }
            firstDay={ 1 }
            eventTimeFormat={ eventTimeFormat}
            longPressDelay={ 1000 }
            eventLongPressDelay={ 800 }
            selectLongPressDelay={ 800 }
            footerToolbar={ false }
            weekends={ true }
            weekNumbers={ true }
            weekNumberFormat={ weekNumberFormat }
            dateClick={ handleOnClickDate as any }
            eventClick={ handleEventClick as any }
            dayMaxEvents={ 2 }
            themeSystem='standard'
            validRange={ validRange }
            events={ listEvents }
        />
    </div> 
}


export default Calendar;