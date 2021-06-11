import ListConvocatorias from './listConvocatorias';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { startGetUsers, startLoadActiveAnnoucements } from '../../../../actions/convocatoria';
import Calendar from './calendarScreen';
import Modal from '../../../ui/modal';

const ConvocatoriaScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetUsers());
        dispatch(startLoadActiveAnnoucements());
    },[]);


    return <>
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