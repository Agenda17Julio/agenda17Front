import ListConvocatorias from './listConvocatorias';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { startLoadActiveAnnoucements } from '../../../../actions/convocatoria';
import { i_event_resp } from '../../../../interfaces/helper/events';
import UseForm from '../../../../hooks/useForm';
import Calendar from './calendarScreen';
import Modal from '../../../ui/modal';
import TimePicker, { TimeOutput } from 'react-timekeeper';
import moment from '../../../../helpers/momentjs';

const ConvocatoriaScreen = () => {

    const init:i_event_resp = {
        asunto:'',
        fecha: moment(new Date()).toDate(),
        detalle: '',
        usuario: 1,
        adjunto: undefined
    }


    const [ value,handleInputOnChange ] = UseForm( init );
    const { asunto } = value as i_event_resp;
    const [ hora, setHora ] = useState(moment(new Date()).minutes(30).format('HH:mm'));
    const [showTime, setShowTime] = useState(false)

    const dispatch = useDispatch();
    const handleChangeHora = (e:TimeOutput) => {
        setHora(e.formatted24)
    }

    useEffect(() => {
        dispatch(startLoadActiveAnnoucements());
    },[dispatch]);

    return <>
        <div>
            <ListConvocatorias/>
        </div>
        <div>
            <Calendar/>
        </div>

        <Modal>
            <form>
                <br /><br /><br />
                <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <label htmlFor="asuntoid">Asunto</label>
                    <input 
                        type="text"
                        id="asuntoid"
                        name='asunto'
                        value={ asunto }
                        onChange={ handleInputOnChange }
                        minLength={0}
                        maxLength={30} 
                        className="validate"
                    />
                </div>
                <div className="input-field col s8">
                    <i className="material-icons prefix">access_time</i>
                    <label onClick={ () => setShowTime(true) }>{hora}</label>
                    {showTime &&
                        <TimePicker
                            time={ hora }
                            onChange={ handleChangeHora }
                            onDoneClick={() => setShowTime(false)}
                            switchToMinuteOnHourSelect
                        />
                    }
                </div>
                

            </form>
        </Modal>
    </>
}


export default ConvocatoriaScreen;