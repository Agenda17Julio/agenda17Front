import log from '../../../img/log.svg'
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../../actions/auth';
import { startLoading } from '../../../actions/ui';
import useForm from '../../../hooks/useForm';
import { i_signin } from '../../../interfaces/components/auth';
import { i_redux } from '../../../interfaces/redux';
import Loading from '../../ui/loading';
import '../../../styles/components/auth/_signin.scss'

const SigninScreen = () => {

    const init = {
        username: '',
        password: ''
    }


    const dispatch = useDispatch();
    const { loading } = useSelector((info: i_redux) => info.ui);

    const [value, handleInputOnChange] = useForm(init);
    const { username, password } = value as i_signin<string>;


    const handleSubmit = (e: Event) => {
        e.preventDefault();
        dispatch(startLoading());
        dispatch(startLogin(value));
    }

    if (loading) return <Loading />


    return <section className='signin_section_main_contenedor'>

        <div className="signin_section_container">
            <div className="signin_section_container_forms-container">
                <div className="signin_section_container_forms-container_signin-signup">
                    <form className="section_signin_form row" onSubmit={handleSubmit as any} >
                        <h2 className="section_signin_form_title">Logearse</h2>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <label htmlFor="usernameid">Username</label>
                            <input
                                type="text"
                                id="usernameid"
                                name='username'
                                value={username}
                                onChange={handleInputOnChange}
                                minLength={0}
                                maxLength={30}
                                className="validate"
                                autoComplete='off'

                            />
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <label htmlFor="passwordid">Password</label>
                            <input
                                type="password"
                                id="passwordid"
                                name='password'
                                value={password}
                                onChange={handleInputOnChange}
                                minLength={0}
                                autoComplete='off'
                            />
                        </div>
                        <input type="submit" value="Iniciar Sesion" className="section_signin_form btn solid" />
                    </form>
                </div>
            </div>
        </div>

        <div className="signin_section_2_panels-container">
            <div className="section_panelAuth section_left-panelAuth">
                <div className="section_panelAuth_contenido">
                    <h3>Hey cómo estas?</h3>
                    <p>Recuerda en caso de perdida de contraseñas el departamento de informática sera de mucha ayuda!</p>
                </div>
                <img src={log} className="signin_section_2_panels-container_image" alt="" />
            </div>
        </div>

    </section>
}

export default SigninScreen;