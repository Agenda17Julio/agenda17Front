import { Provider } from 'react-redux';
import Store from './store';
import Routes from './router/index';
import './styles/index.scss';

const App = () => <Provider store={ Store }>
    <Routes/>
</Provider>


export default App;