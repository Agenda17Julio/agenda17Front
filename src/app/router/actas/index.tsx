import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ActaScreen from '../../components/pages/root/actas/actasScreen';

const ActasRoutes = () => {

    const { url } = useRouteMatch();

    return <Switch>
        <Route
            path={`${url}/`}
            exact={ true }
            component={ ActaScreen }
        />
        <Redirect to='/notfound'/>
    </Switch>
}

export default ActasRoutes;