import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';


const NavBar = () => {
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(startLogout());

    return <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link className="navbar-item" to="#">
                <img alt="aqui hay un logo" src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28" />
            </Link>

            <div role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">

            <div className="navbar-end">

                <Link className="navbar-item" to="/">Convocatoria</Link>
                <Link className="navbar-item" to="/actas">Actas</Link>
                <div className="navbar-item has-dropdown is-hoverable">
                    <div className="navbar-link">
                        <i className="large material-icons">account_circle</i>
                    </div>

                    <div className="navbar-dropdown">
                        <li className="navbar-item">Perfil</li>
                        <hr className="navbar-divider" />
                        <li className="navbar-item" onClick={handleLogout}>Logout</li>


                    </div>
                </div>



            </div>

        </div>
    </nav>
}


export default NavBar;