import { i_auth_state } from './reducers/auth';
import { i_conv_state } from './reducers/convocatoria';
import { i_ui_state } from './reducers/ui';
import { i_fab_state } from './reducers/fab';

export interface i_redux {
    auth: i_auth_state;
    ui: i_ui_state;
    conv: i_conv_state;
    fab: i_fab_state;
}