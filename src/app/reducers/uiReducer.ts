import { i_ui_action as i_action, i_ui_state as i_state } from '../interfaces/reducers/ui';
import types from '../types';

const init:i_state = {
    loading: false
}

const uiReducer = ( state = init, action: i_action ):i_state => {
    const { startLoading, stopLoading } = types;

    switch( action.type ){
        case startLoading:
            state = {
                ...state,
                loading: true
            }
            break;
        case stopLoading:
            state = init;
            break;
    }


    return state;
}

export default uiReducer;