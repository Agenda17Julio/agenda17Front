import types from '../types';
import { i_ui_action as i_action } from '../interfaces/reducers/ui';

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


export const setFileAll = (files:Array<File>) => {
    const { setFiles:type } = types;

    return {
        type,
        payload: {
            files
        }
    }
}

export const clearAllFiles = ():i_action => {
    const { clearAllFiles:type } = types;
    return { type }
}


export const delFile = (filename:string) => {
    const { deleteFileLocal:type } = types;

    return {
        type,
        payload: {
            filename
        }
    }
}

export const setActiveFile = (filename:string):i_action => {
    const { setActiveFile:type } = types;

    return {
        type,
        payload: {
            activefile: filename
        }
    }
}

export const clearActiveFile = ():i_action => {
    const { clearActiveFile:type } = types;

    return {
        type
    }
}


export const delActiveFile = ():i_action => {
    const { delActiveFile:type } = types;
    return { type }
}

export const clearDelActiveFile = ():i_action => {
    const { clearDelActiveFile:type } = types;
    return { type }
}



export const setActiveView = ():i_action => {
    const { activeView:type } = types;
    return {
        type
    }
}


export const clearAllUI = ():i_action => {
    const { clearAllUI:type } = types;
    return { type }
}