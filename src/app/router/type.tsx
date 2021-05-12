import { Route,Redirect } from 'react-router-dom';
import { i_router } from '../interfaces/router';

export const PrivateRouter = ({isAuthenticate,Component,...rest}:i_router) => <Route 
    {...rest}
    component={() => isAuthenticate ? Component() : <Redirect to='/login'/>}
/>


export const PublicRouter = ({isAuthenticate,Component,...rest}:i_router) => <Route 
    {...rest}
    component={() => isAuthenticate ?  <Redirect to='/'/> : Component()}
/>