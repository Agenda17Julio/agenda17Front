import { Link } from 'react-router-dom';

const NavBar = () => {
    return <nav>
        <ul>
            <li>
                <Link to="/">Convocatoria</Link>
            </li>
            <li>
                <Link to="/actas">Actas</Link>
            </li>
        </ul>
        {/* <img src="" alt="logo" className="logo" />
        <div>
            <ul>
                <li><Link to='/convocatoria'/>Convocatorias</li>
                <li><Link to='/actas'/>Actas</li>
            </ul>
        </div>
        <div className="user">
            <img src="" alt="imagen_de_usuario" className="userimg" />
            <ul>
                <li>Perfil</li>
                <li>Logout</li>
            </ul>
        </div> */}
    </nav>
}


export default NavBar;