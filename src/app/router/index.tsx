import { useEffect } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { PrivateRouter,PublicRouter } from './type';
import AuthScreen from '../components/pages/auth/signin';
import RootRoutes from './root';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { i_redux } from '../interfaces/redux';
import Loading from '../components/ui/loading';

const Routes = () => {

    const dispatch = useDispatch();
    const { uid,checking } = useSelector((info:i_redux) => info.auth);

    useEffect(() => {
        dispatch( startChecking() );
    },[dispatch]);

    const isAuth = !!uid;

    if( checking ) return <Loading />

    return <Router>
        <Switch>

            <PublicRouter
                isAuthenticate={ isAuth }
                path='/login'
                exact={ true }
                Component={ AuthScreen }
            />
            
            <PrivateRouter
                isAuthenticate={ isAuth }
                path='/'
                exact={ false }
                Component={ RootRoutes }
            />
            
        </Switch>
    </Router> 
}


export default Routes;