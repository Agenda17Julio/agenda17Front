import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from '../reducers/authReducer';

const reducers = combineReducers({
    auth: AuthReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);

export default Store;