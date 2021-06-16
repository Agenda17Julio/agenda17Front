import { Switch, Route, Redirect } from 'react-router-dom';
import ConvocatoriaScreen from '../../components/pages/root/convocatorias';
import AllConv from '../../components/pages/root/convocatorias/all_convocatorias';

const ConvocatoriaRoutes = () => {
    return <>
        <Switch>
            <Route
                path='/'
                exact={ true }
                component={ ConvocatoriaScreen }
            />
            <Route 
                path='/allconv'
                exact={ true }
                component={ AllConv }
            />
            <Redirect to='/notfound'/>
        </Switch>
    </>
}

export default ConvocatoriaRoutes;