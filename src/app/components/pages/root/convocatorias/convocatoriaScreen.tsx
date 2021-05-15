import ListConvocatorias from './listConvocatorias';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { startLoadActiveAnnoucements } from '../../../../actions/convocatoria';
import Calendar from './calendarScreen';

const ConvocatoriaScreen = () => {

    const dispatch = useDispatch();

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
    </>
}


export default ConvocatoriaScreen;