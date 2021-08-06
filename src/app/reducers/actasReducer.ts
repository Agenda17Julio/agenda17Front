
import { i_state, i_action } from '../interfaces/reducers/actas';
import types from '../types/index';

const ActasReducer = ( state:i_state = { allactas:[], registros: 1 }, { type, payload }:i_action ):i_state => {

    const { 
        deleteAnnoucementActa,
        getActa,addNewActa,
        getActaAnnoucement,
        updateActa,
        deleteActa,
        setRegActa
    } = types;

    switch( type ){
        case addNewActa: 
            if( state.allactas ) {
                state = {
                    ...state,
                    allactas: [
                        ...state.allactas,
                        payload?.aux
                    ]
                }; 
            }
        break;
        case getActaAnnoucement:
            state = {
                ...state,
                annoucement: payload?.annoucement
            }    
        break;
        case setRegActa: state={ ...state, registros:payload?.registros }; break;
        case getActa: state = { ...state, ...payload}; break;
        case deleteAnnoucementActa: 
            if(state.allactas) {

                const id = payload?.aux;
                
                state = { 
                    ...state,
                    allactas: state.allactas.map(acta => {
                        acta.adjuntos = acta.adjuntos?.filter(adj => adj.id !== id);
                        return acta;
                    })
                }
            }
        break;
        case updateActa:
            if (state.allactas) state = {
                ...state,
                allactas: state.allactas?.map(acta => {
                    if(acta.adjuntos && payload?.aux){
                        console.log(payload.aux)
                        acta.adjuntos = [
                            ...acta.adjuntos,
                            ...payload?.aux.adjuntos
                        ]
                    }

                    console.log(acta)
                    return acta;
                })
            }
        break;
        case deleteActa:
            state = {
                ...state,
                allactas: state.allactas?.filter(acta => acta.id !== payload?.aux.id)
            }
        break;
    }

    return state;
}



export default ActasReducer;