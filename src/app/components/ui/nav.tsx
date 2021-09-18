import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';

const NavBar = () => {

    const dispatch = useDispatch();
    const handleLogout = () => dispatch(startLogout());



    return <div>

        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper fixed black">
                    <a href="#" className="brand-logo hide-on-med-and-down">I17J</a>
                    <ul id="nav-mobile" className="right">
                        <li><Link className="navbar-item" to="/">Convocatoria</Link></li>
                        <li><Link className="navbar-item" to="/actas">Actas</Link></li>
                        <li className="navbar-item" onClick={handleLogout}>Logout</li>           
                    </ul>
                </div>
            </nav>
        </div>

    </div>

}


export default NavBar;