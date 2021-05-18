import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../../actions/auth';
import { startLoading } from '../../../actions/ui';
import useForm from '../../../hooks/useForm';
import { i_signin } from '../../../interfaces/components/auth';
import { i_redux } from '../../../interfaces/redux';
import Loading from '../../ui/loading';


const SigninScreen = () => {

    const init = {
        username: '',
        password: ''
    }

    const dispatch = useDispatch();
    const { loading } = useSelector((info:i_redux) => info.ui);

    const [ value, handleInputOnChange ] = useForm(init);
    const { username, password } = value as i_signin<string>;


    const handleSubmit = (e:Event) => {
        e.preventDefault();
        dispatch( startLoading() );
        dispatch( startLogin(value) );
    }

    if( loading ) return <Loading/>

    return <>
        
        <section className='signin_main'>

            <form onSubmit={ handleSubmit as any }  className='form'>

                <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <label htmlFor="usernameid">Username</label>
                    <input 
                        type="text"
                        id="usernameid"
                        name='username'
                        value={ username }
                        onChange={ handleInputOnChange }
                        minLength={0}
                        maxLength={30} 
                        className="validate"
                        autoComplete='off'
                        
                    />
                </div>
                <div className="input-field col s6">
                    <i className="material-icons prefix">lock</i>
                    <label htmlFor="passwordid">Password</label>
                    <input 
                            type="password"
                            id="passwordid"
                            name='password'
                            value={ password }
                            onChange={ handleInputOnChange }
                            minLength={0}
                            autoComplete='off'
                    />
                </div>

                <button 
                    type="submit"
                    className='btn waves-effect waves-light primary'
                    >Signin</button>

            </form>

        </section>
    </>     
}

export default SigninScreen;