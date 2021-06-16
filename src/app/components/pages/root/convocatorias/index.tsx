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
        <div className="row">
            <div className="col s12 m4 l3 xl4">
                <ListConvocatorias />
            </div>
            <div className="col s12 m8 l9 xl8">
                <Calendar />
            </div>
        </div>

        <Modal/>
    </>
}


export default ConvocatoriaScreen;