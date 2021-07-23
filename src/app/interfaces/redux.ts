import { i_auth_state } from './reducers/auth';
import { i_conv_state } from './reducers/convocatoria';
import { i_ui_state } from './reducers/ui';
import { i_state as i_acta_state } from './reducers/actas';

export interface i_redux {
    auth: i_auth_state;
    ui: i_ui_state;
    conv: i_conv_state;
    actas: i_acta_state;
}