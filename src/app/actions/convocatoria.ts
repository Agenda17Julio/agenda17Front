import types from '../types';
import { i_conv_action as i_action, tipo_recurso } from '../interfaces/reducers/convocatoria';
import { fetchWithToken } from '../helpers/fetch';
import { i_resp_active_annoucements,i_event_resp } from '../interfaces/resp_serv/convocatorias';
import Swal from 'sweetalert2';
import { clearActiveFab, clearActiveFile, closeModal, stopLoading } from './ui';
import { i_redux } from '../interfaces/redux';
import { i_search } from '../interfaces/components/convocatoria';

export const startLoadAnnoucements = ( pagina:number ) => async ( callback:Function ) => {
    const resp = await fetchWithToken({url:`/convocatoria/annoucements/${pagina}`});
    const {ok, data, registros } = await resp.json();

    if( ok ){
        for (const i in data) {
            data[i].to = JSON.parse(data[i].to as any);
        }
        callback( loadAnnouncement(data, registros[0].registros ) );
        callback( stopLoading() );
    }

}


export const startLoadActiveAnnoucements = () => async( callback:Function ) => {
    const resp = await fetchWithToken({url:'/convocatoria/allannoucements/active'});
    const { ok, data } = await resp.json() as i_resp_active_annoucements;

    
    if( ok ){
        for (const i in data) {
            data[i].to = JSON.parse(data[i].to as any);
        }
        callback( loadActiveAnnouncement(data) );
        callback( stopLoading() );
    }
}

export const startAddAnnoucement = ( values:i_event_resp, adjunto:File[] ) => async ( callback:Function ) => {

    const { asunto,detalle,fecha,from,to,usuario } = values;

    const formData = new FormData();
    const filesstringnames:string[] = [];

    if( adjunto ){
        for (let i = 0; i < adjunto.length; i++) {
            const filename = adjunto[i].name;
            const ext = filename.substring(filename.lastIndexOf('.'), filename.length);
            formData.append('adjuntos', adjunto[i], `${i}${new Date().getTime()}-${new Date().getMilliseconds()}${ext}`);
            filesstringnames.push(`${i}${new Date().getTime()}-${new Date().getMilliseconds()}${ext}`);
        }
    }

    formData.append('data', JSON.stringify({
        asunto,
        detalle,
        fecha,
        from,
        to,
        usuario
    }));

    const resp = await fetchWithToken({url:'/convocatoria/mail',method:'POST',data:formData});
    
    const { ok, msg, id} = await resp.json();

    callback(closeModal());
    callback(stopLoading());

    if( ok ){
        callback(addAnnoucement({adjunto, asunto, detalle, fecha, usuario, to, id, files: filesstringnames }));

        callback(clearListConv());
        return Swal.fire({
            title: 'Genial! Todo salio bien',
            text: msg,
            timer: 4000,
            icon: 'success'
        })
    }else {
        callback(clearListConv());
        return Swal.fire({
            title: 'Ho no!',
            text: msg,
            timer: 4000,
            icon: 'warning'
        })
    }
}


export const startUpdateAnnoucement = ( convocatoria:i_event_resp, adjunto:File[] ) => async (callback: Function, reduxdata: () => i_redux ) => {

    const { asunto,detalle,fecha,from,to,usuario } = convocatoria;
    const formData = new FormData();
    const filesstringnames:string[] = [];

    if( adjunto ){
        for (let i = 0; i < adjunto.length; i++) {
            const filename = adjunto[i].name;
            const ext = filename.substring(filename.lastIndexOf('.'), filename.length);
            formData.append('adjuntos', adjunto[i], `${i}${new Date().getTime()}-${new Date().getMilliseconds()}${ext}`);
            filesstringnames.push(`${i}${new Date().getTime()}-${new Date().getMilliseconds()}${ext}`);
        }
    }

    formData.append('data', JSON.stringify({
        asunto,
        detalle,
        fecha,
        from,
        to,
        usuario
    }));
    
    const resp = await fetchWithToken({url:`/convocatoria/annoucements/${convocatoria.id}`, method: 'PUT', data:formData});
    const { ok, msg } = await resp.json() as i_resp_active_annoucements;

    if(ok){

        const { active } = reduxdata().conv;

        for (const i in active?.files) {
            filesstringnames.push( String(active?.files[Number(i)]) );
        }


        callback( updateActivesConv({adjunto, asunto, detalle, fecha, usuario, to, id:convocatoria.id , files: filesstringnames }) );
        callback( clearActiveAnnoucement() );
        callback( closeModal() );
        callback( stopLoading() );

        return Swal.fire({
            title: 'Proceso terminado!',
            text: msg,
            icon: 'success',
            timer: 4000
        });
    }else {
        callback( stopLoading() );
        return Swal.fire({
            title: 'Oh no!',
            text: msg,
            icon: 'error',
            timer: 4000
        });
    }
}


export const startDelAnnoucement = (convocatoria:i_event_resp) => async (callback:Function, selector: () => i_redux) => {

    Swal.fire({
        title: 'Estas seguro?',
        text: "Recuerda que no se puede revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar!'
      }).then( async (result) => {
        if (result.isConfirmed) {

            const { ui: { pagina, fab } } = selector();
            const resp = await fetchWithToken({url:`/convocatoria/annoucements/${convocatoria.id}`, method: 'DELETE'});
            const { ok, msg } = await resp.json() as i_resp_active_annoucements;

            if( fab?.del ) {
                callback( deleteActivesConv(convocatoria));
                callback( clearActiveFab() );
                callback( stopLoading() );
            }else {
                callback( startLoadAnnoucements(Number(pagina)) );
            }

            if( ok ) return Swal.fire({
                title: 'Proceso terminado!',
                text: msg,
                icon: 'success',
                timer: 4000
            });
        }
      })
}


export const startSearchConvocatoria = ( values:i_search ) => async ( callback:Function, selector: () => i_redux ) => {

    const texto_Swal = (msg:string) => Swal.fire({
        title: 'Oh no!',
        text: msg,
        timer: 4000,
        icon: 'warning'
    });

    if( !values.asunto_check && !values.autor_check && !values.fecha_check ) {
        return texto_Swal(`selecciona un criterio de busqueda`);
    }else if ( values.asunto_check && !values.asunto ){
        return texto_Swal('Ingresa un criterio para buscar por asunto')
    }else if (values.autor_check && !values.autor){
        return texto_Swal('Ingresa un criterio para buscar por autor')
    }else {
        const { ui: { pagina } } = selector();
        
        
        const resp = await fetchWithToken({url:`/convocatoria/search/${pagina}`, method:'POST', data:values, isjson: true});
        const { ok, data, registros,msg } = await resp.json();
    
      
        if( ok ){
            if( registros[0].registros <= 0 ){
                callback( stopLoading() );
                return texto_Swal('No se encontraron datos');
            }else {
                callback( loadAnnouncement(data, registros[0].registros) );
                callback( stopLoading() );
            }
        }else {
            callback( stopLoading() );
            return texto_Swal(msg)
        }
    }

}



export const loadAnnouncement = ( data:Array<any>, registros: number):i_action => {
    const { loadConv:type } = types;
    return {
        type,
        payload: {
            convocatorias: {
                data,
                registros
            }
        }
    }
}

export const loadActiveAnnouncement = ( actives:Array<i_event_resp> ):i_action => {
    const { loadActiveConv:type } = types;
    return {
        type,
        payload: {
            actives
        }
    }
}

export const loadActiveAnnoucement = (active:any):i_action => {
    const { activeConv:type } = types;
    return {
        type,
        payload: {
            active
        }
    }
}




export const clearActiveAnnoucement = ():i_action => {
    const { clearActiveConv:type } = types;
    return { type }
}


export const addAnnoucement = ( event:i_event_resp ):i_action => {
    const { addConv:type } = types;
    return {
        type,
        payload: {
            aux: event
        }
    }
}


export const setListConv = ( listConv:Array<string> ):i_action => {
    const { listToConv:type } = types;
    return  {
        type,
        payload: {
            listConv
        }
    }
}


export const clearListConv = ():i_action => {
    const { clearListToConv:type } = types;
    return {
        type
    }
}


export const deleteActivesConv = (convocatoria:i_event_resp):i_action => {
    
    const { deleteActiveConv:type } = types;

    return {
        type,
        payload:{
            aux: convocatoria
        }
    }
}


export const updateActivesConv = (convocatoria:i_event_resp):i_action => {
   
    const { updateActiveConv:type } = types;

    return {
        type,
        payload:{
            aux: convocatoria
        }
    }
}


export const startGetUsers = () => async( callback:Function ) => {
    const resp = await fetchWithToken({url:'/convocatoria/users'});
    const { ok, data } = await resp.json();

    if( ok ) {
        const users = data.map((val:any) => val.correo);
        callback( getUsers(users) );
        callback( stopLoading() );
    }
}

export const getUsers = (users:Array<string>):i_action => {
    const { getUsers:type } = types;

    return {
        type,
        payload: {
            users
        }
    }
}


export const setTypeList = (typeList:tipo_recurso):i_action => {
    const {typeListConv:type} = types;
    return {
        type,
        payload: {
            typeList
        }
    }
}


export const startDownload = (id:string, filename: string) =>  async (callback:Function) =>{
    const resp = await fetchWithToken({url:`/convocatoria/files/${id}/${filename}`});
    const file = await resp.blob();

    // const url = URL.createObjectURL(file);
    // const tabOrWindow = window.open(`${url.normalize()}${filename}`, '_blank') as Window;
    // tabOrWindow.focus();
    // console.log(url)

    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 0);

    callback(clearActiveFile());
    callback(stopLoading());
}




export const startDelFileServer = (id:string, filename:string) => async ( callback:Function ) => {
    const resp = await fetchWithToken({url:`/convocatoria/adjunto/${id}/${filename}`, method:'DELETE'});
    const { ok, msg} = await resp.json();

    if( ok ){

        callback(stopLoading());
        
        return Swal.fire({
            title: 'Todo salió bien!',
            text: msg,
            icon: 'success',
            timer: 2000
        })

    }else {
        return Swal.fire({
            title: 'Oh no!',
            text: msg,
            timer: 2000
        })
    }

}





export const deleteFileServer = (filename:string):i_action  =>{
    const { deleteFileServer:type } = types;

    return {
        type,
        payload: {
            filename
        }
    }
}