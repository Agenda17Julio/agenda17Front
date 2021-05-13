import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';


const NavBar = () => {
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(startLogout());

    return <nav>
       
        <img src="" alt="logo" className="logo" />
        <div>
        <ul>
            <li>
                <Link to="/">Convocatoria</Link>
            </li>
            <li>
                <Link to="/actas">Actas</Link>
            </li>
        </ul>
        </div>
        <div className="user">
            <img src="" alt="imagen_de_usuario" className="userimg" />
            <ul>
                <li>Perfil</li>
                <li onClick={ handleLogout }>Logout</li>
            </ul>
        </div>
    </nav>
}


export default NavBar;