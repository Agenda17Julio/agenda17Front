import { Switch, Route, Redirect } from 'react-router-dom';
import CalendarScreen from '../../components/pages/root/convocatorias/calendarScreen';

const ConvocatoriaRoutes = () => {
    return <>
        <Switch>
            <Route
                path='/'
                exact={ true }
                component={ CalendarScreen }
            />
            <Redirect to='/notfound'/>
        </Switch>
    </>
}

export default ConvocatoriaRoutes;