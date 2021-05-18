import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import M,{Dropdown} from 'materialize-css'


const NavBar = () => {
    
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(startLogout());

    M.AutoInit()
    
    return <div>
        <ul id="dropdown1" className="dropdown-content">
            <li className="navbar-item">Perfil</li>
            <li className="divider"></li>
            <li className="navbar-item" onClick={handleLogout}>Logout</li>
        </ul>

        <nav>
            <div className="nav-wrapper black">
                <a href="#" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link className="navbar-item" to="/">Convocatoria</Link></li>
                    <li><Link className="navbar-item" to="/actas">Actas</Link></li>
                    <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i className="material-icons right">arrow_drop_down</i></a></li>
                </ul>
            </div>
        </nav>

    </div>

}


export default NavBar;