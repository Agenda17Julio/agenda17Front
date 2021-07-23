
import Listado from './lists/listado';
import AddActa from './addActa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startGetActas } from '../../../../actions/actas';
import { i_redux } from '../../../../interfaces/redux';

const ActaScreen = () => {


    const dispatch = useDispatch();
    const { pagina } = useSelector((i:i_redux) => i.ui);

    useEffect(() => {
        dispatch(startGetActas());
    },[dispatch,pagina]);
   

    return <div>
        <Listado/>
        <AddActa/>
    </div>
}

export default ActaScreen;


