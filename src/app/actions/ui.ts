import types from '../types';
import { i_ui_action as i_action,i_showfile } from '../interfaces/reducers/ui';

export const startLoading = ():i_action => {
    const { startLoading:type } = types;
    return {
        type
    }
}

export const stopLoading = () => {
    const { stopLoading:type } = types;
    return {
        type
    }
}

export const openModal = ():i_action => {
    const { openModal:type } = types;
    return {
        type
    }
}

export const closeModal = () => {
    const { closeModal:type } = types;
    return {
        type
    }
}


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


export const setCalendarDate = ( date:Date ):i_action => {
    const { setCalendarDate:type } = types;
    return {
        type,
        payload: {
            calendarDate: date
        }
    }
}


export const clearCalendarDate = ():i_action => {
    const { clearCalendarDate:type } = types;
    return {
        type
    }
}


export const setPagina = (pagina: number):i_action => {
    const { setPag:type } = types;
    return {
        type,
        payload: {
            pagina
        }
    }
}

export const clearPagina = ():i_action => {
    const { clearPag:type } = types;
    return {
        type
    }
}