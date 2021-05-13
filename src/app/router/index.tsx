import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRouter,PublicRouter } from './type';
import AuthScreen from '../components/pages/auth/signin';
import RootRoutes from './root';

const Routes = () => {

    const isAuth = true

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