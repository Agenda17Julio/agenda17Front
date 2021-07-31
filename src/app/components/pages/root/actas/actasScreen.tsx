
import Listado from './lists/listado';
import AddActa from './addActa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startGetActas } from '../../../../actions/actas';
import { i_redux } from '../../../../interfaces/redux';

const ActaScreen = () => {


    const dispatch = useDispatch();
    const { ui:{ pagina }, auth:{ rol } } = useSelector((i:i_redux) => i);

    useEffect(() => {
        dispatch(startGetActas());
    },[dispatch,pagina]);
   

    return <div>
        <Listado/>
        {
            Number(rol) === 1 && <AddActa/>
        }
        
    </div>
}

export default ActaScreen;


