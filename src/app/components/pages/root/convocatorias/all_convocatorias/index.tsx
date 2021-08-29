import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearActiveAnnoucement } from "../../../../../actions/convocatoria";
import { setPagina } from "../../../../../actions/ui";
import Listado from './listado';
import Search from './search';

const Convocatorias = () => {
    const dispatch = useDispatch();

    const handleBackCal = () => {
        dispatch(clearActiveAnnoucement());
        dispatch(setPagina(1));
    }

    return <div>
        <Link to='/' onClick={handleBackCal}>Regresar a Calendario</Link>
        <div className="row">
            <Search />
            <Listado />
        </div>
    </div>
}

export default Convocatorias;