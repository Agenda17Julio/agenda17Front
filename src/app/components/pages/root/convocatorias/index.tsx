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
    }, [dispatch]);

    return <>
     
        <div className="row">
            <div className="col s12 m4 l3 xl4">
                <ListConvocatorias />
            </div>
            <div className="col s12 m8 l9 xl8">
                <Calendar />
            </div>
        </div>

        <Modal />
    </>
}


export default ConvocatoriaScreen;