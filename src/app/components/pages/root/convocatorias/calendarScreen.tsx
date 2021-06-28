import Calendar from '../../../ui/calendar';
import { useDispatch, useSelector } from 'react-redux';
import { i_redux } from '../../../../interfaces/redux';
import { i_events_convocatoria } from '../../../../interfaces/helper/events';
import Fab from '../../../ui/fab';
import { openModal } from '../../../../actions/ui';
import { startDelAnnoucement } from '../../../../actions/convocatoria';
import { i_event_resp as i_event } from '../../../../interfaces/resp_serv/convocatorias';

const ConvocatoriaScreen = () => {

    
    const dispatch = useDispatch();
    let { conv:{actives, active},ui:{fab} } = useSelector((info:i_redux) => info);
    const conv_activa = active as i_event;

    let eventsActives:i_events_convocatoria[] = actives 
        ? actives?.map((active:any) => {
            active.color='#f59c42';
            active.date = active.fecha;
            active.title = active.asunto;
            active.editable = true;
            active.allDay = false;
            return active;
        }) : [];

        
    return <div className='convocatoria_container'>
        <Calendar listEvents={ eventsActives }/>

        <div className="container_father_fab">
            <Fab color='cyan' toggle={ !fab?.view  } icon='visibility' click={ () => dispatch(openModal()) }/>
            <Fab color='cyan' toggle={ !fab?.plus } icon='add' click={ () => dispatch(openModal()) }/>
            <Fab color='cyan' toggle={ !fab?.edit } icon='edit' click={ () => dispatch(openModal()) }/>
            <Fab color='red' tono_color='lighten-1' toggle={ !fab?.del } click={ () => { if(conv_activa) return dispatch(startDelAnnoucement(conv_activa)) }} icon='delete'/>
        </div>
    </div>
}


export default ConvocatoriaScreen;