import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../../actions/auth';
import { startLoading } from '../../../actions/ui';
import useForm from '../../../hooks/useForm';
import { i_signin } from '../../../interfaces/components/auth';
import { i_redux } from '../../../interfaces/redux';
import Loading from '../../ui/loading';


const SigninScreen = () => {

    const init = {
        username: 'jbpaig@gmail.com',
        password: 'gt37285'
    }

    const dispatch = useDispatch();
    const { loading } = useSelector((info:i_redux) => info.ui);

    const [ value, handleInputOnChange ] = useForm(init);
    const { username, password } = value as i_signin;


    const handleSubmit = (e:Event) => {
        e.preventDefault();
        dispatch( startLoading() );
        dispatch( startLogin(value) );
    }

    if( loading ) return <Loading/>

    return <>
        
        <section className='signin_main'>

            <form onSubmit={ handleSubmit as any }>

                <div>
                    <label htmlFor="usernameid">
                        <span>Username</span>
                        <input 
                            type="text"
                            id="usernameid"
                            name='username'
                            value={ username }
                            onChange={ handleInputOnChange }
                            minLength={0}
                            maxLength={30}
                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="passwordid">
                        <span>Password</span>
                        <input 
                            type="password"
                            id="passwordid"
                            name='password'
                            value={ password }
                            onChange={ handleInputOnChange }
                            minLength={0}
                        />
                    </label>
                </div>

                <button type="submit">Signin</button>

            </form>

        </section>
    </>     
}

export default SigninScreen;