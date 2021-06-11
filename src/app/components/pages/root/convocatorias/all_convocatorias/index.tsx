import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearActiveAnnoucement } from "../../../../../actions/convocatoria";
import Listado from './listado';
import Search from './search';

const Convocatorias  = () => {
    const dispatch = useDispatch();

    const handleBackCal = () => {
        dispatch(clearActiveAnnoucement());
    }

    return <div>
        <Link to='/' onClick={ handleBackCal }>Regresar a Calendario</Link>
        <Search/>
        <Listado/>
    </div>
}

export default Convocatorias;