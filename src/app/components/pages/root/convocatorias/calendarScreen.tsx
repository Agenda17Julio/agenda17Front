import Calendar from '../../../ui/calendar';
import { useSelector } from 'react-redux';
import { i_redux } from '../../../../interfaces/redux';
import { i_events_convocatoria } from '../../../../interfaces/helper/events';

const ConvocatoriaScreen = () => {

 
    let { conv:{actives},fab } = useSelector((info:i_redux) => info);

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
            <a 
                className={`btn-floating btn-large cyan pulse fab ${ !fab?.plus && 'toggle-hidden'}`}>
                <i className="material-icons">add</i>
            </a>
            <a className={`btn-floating btn-large cyan pulse fab ${ !fab?.editDelete && 'toggle-hidden'}`}>
                <i className="material-icons">edit</i>
            </a>
            <a className={`btn-floating btn-large red lighten-1 pulse fab ${ !fab?.editDelete && 'toggle-hidden'}`}>
                <i className="material-icons">delete</i>
            </a>


        </div>
    </div>
}


export default ConvocatoriaScreen;