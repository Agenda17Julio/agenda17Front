import { Switch, Route, Redirect } from 'react-router-dom';
import ConvocatoriaScreen from '../../components/pages/root/convocatorias';

const ConvocatoriaRoutes = () => {
    return <>
        <Switch>
            <Route
                path='/'
                exact={ true }
                component={ ConvocatoriaScreen }
            />
            <Redirect to='/notfound'/>
        </Switch>
    </>
}

export default ConvocatoriaRoutes;