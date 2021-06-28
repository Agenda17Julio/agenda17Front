import ListConvocatorias from './listConvocatorias';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { startGetUsers, startLoadActiveAnnoucements } from '../../../../actions/convocatoria';
import Calendar from './calendarScreen';
import Modal from '../../../ui/modal';
import { startLoading } from '../../../../actions/ui';
import { startLogout } from '../../../../actions/auth';

const ConvocatoriaScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading());
        dispatch(startGetUsers());
        dispatch(startLoadActiveAnnoucements());
    },[dispatch]);

    return <>

        <button onClick={ () => dispatch(startLogout()) }>cerrar sesion</button>
        <div>
            <ListConvocatorias/>
        </div>
        <div>
            <Calendar/>
        </div>

        <Modal/>
    </>
}


export default ConvocatoriaScreen;