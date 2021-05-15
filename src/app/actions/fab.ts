import types from '../types';
import { i_fab_action as i_action } from '../interfaces/reducers/fab';

export const activePlusFab = ():i_action => {
    const { activePlusFab:type } = types;
    return { type }
}


export const activeEditDeleteFab = ():i_action => {
    const { activeEditFab:type } = types;

    return { type }
}


export const clearActiveFab = ():i_action => {
    const { clearActiveFab:type } = types;
    return { type }
}