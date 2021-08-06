import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from '../reducers/authReducer';
import uiReducer from '../reducers/uiReducer';
import convocatoriaReducer from '../reducers/convocatoriasReducer';
import ActasReducer from '../reducers/actasReducer';

const reducers = combineReducers({
    auth: AuthReducer,
    ui: uiReducer,
    conv: convocatoriaReducer,
    actas: ActasReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);

export default Store;