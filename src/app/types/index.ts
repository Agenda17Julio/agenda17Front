import { i_types } from '../interfaces/types';

const types:i_types =  {
    login: '[AUTH] login',
    logout: '[AUTH] logout',
    checking: '[Auth] checking auth',
    startLoading: '[UI] start loading',
    stopLoading:  '[UI] stop loading',
    loadConv: '[CONV] load announcements',
    loadActiveConv: '[CONV] load active announcement',
    activeConv: '[CONV] set active announcement',
    clearActiveConv: '[CONV] clear active annoucement',
    addConv: '[CONV] add annoucement',
    activePlusFab: '[FAB] active plus fab',
    activeEditFab: '[FAB] active edit fab',
    clearActiveFab: '[FAB] clear active fab',
    openModal: '[MODAL] open modal',
    closeModal: '[MODAL] close modal',
    setCalendarDate: '[UI] set Calendar Date',
    clearCalendarDate: '[UI] clear Calendar Date',
    listToConv: '[CONV] set list users to annoucement',
    clearListToConv: '[CONV] clear list users'
}



export default types;