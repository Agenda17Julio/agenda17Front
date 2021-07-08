import { i_fab } from '../../interfaces/components/fab';

const Fab = ({ color, tono_color,toggle,icon,click }:i_fab) => {

    return <i
        onClick={ click as any } 
        className={`btn-floating btn-large ${color} ${tono_color} pulse fab ${ toggle && 'toggle-hidden'}`}>
        <i className="material-icons">{icon}</i>
    </i>
}


export default Fab;