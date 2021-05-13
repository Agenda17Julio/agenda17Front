import { i_auth_state } from './reducers/auth';
import { i_ui_state } from './reducers/ui';

export interface i_redux {
    auth: i_auth_state;
    ui: i_ui_state;
}