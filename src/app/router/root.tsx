import { Switch,Route } from 'react-router-dom';
import ConvocatoriaRoutes from './convocatorias';
import ActasRoutes from './actas';
import Navbar from '../components/ui/nav';
import NotFound from '../components/pages/err/notFound';


const MainRouter = () => <div>
    <Navbar/> 
    <Switch>               
        <Route
            path='/actas'
            exact={ false }
            strict={ false } 
            component={ ActasRoutes }
        />
        <Route
            path='/'
            exact={ false }
            strict={ false } 
            component={ ConvocatoriaRoutes }
        />
        
    </Switch>
</div>


const RootRouter = () => {

    return <Switch>

        <Route 
            path='/notfound'
            exact={ true }
            component={ NotFound }
        />

        <Route
            path='/'
            exact={ false }
            component={ MainRouter }
        />

       
    </Switch>
}


export default RootRouter;