import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { i_acta, i_action, i_annoucement } from '../interfaces/reducers/actas';
import { i_redux } from '../interfaces/redux';
import types from '../types';
import { setPagina } from './ui';

export const getActas = ( allactas:i_acta[], registros:number  ):i_action => {
    const { getActa:type } = types;

    return {
        type,
        payload: { allactas, registros }
    }
}

export const setRegistros = ( registros:number ):i_action => {
    const { setRegActa:type } = types;
    return {
        type,
        payload:{
            registros
        }
    }
}

export const addNewActa = (acta:i_acta):i_action => {
    const { addNewActa:type } = types;

    return {
        type,
        payload: { 
            aux: acta 
        }
    }
}

export const AddAnnoucement = (data:i_annoucement[]):i_action => {
    const { getActaAnnoucement:type } = types;

    return {
        type,
        payload: {
            annoucement: data
        }
    }
}

export const updateActa = (acta:i_acta):i_action => {
    const { updateActa:type } = types;

    return {
        type,
        payload: {
            aux: acta
        }
    }
}

export const deleteActa = (acta:i_acta):i_action => {
    const { deleteActa:type } = types;
    
    return { type, payload: { aux:acta }}
}

export const deleteFile = (id:number):i_action => {
    const { deleteAnnoucementActa:type } = types;
    return {
        type,
        payload: { aux: id }
    }
}

export const startDeleteActa = (acta:i_acta) => (callback:Function,redux: () => i_redux) => {
    Swal.fire({
        title: 'Estas Seguro?',
        text: "Esta acción no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then( async (result) => {
        if (result.isConfirmed) {

            const resp = await fetchWithToken({url:`/actas/delete/${acta.id}`, method:'DELETE'});
            const { ok,msg } = await resp.json();
            
            if(ok){
                const { actas:{allactas},ui:{pagina} } = redux();

                if( allactas && allactas?.length <= 1 && Number(pagina) > 0){
                    callback(setPagina(Number(pagina)-1));
                }

                callback(deleteActa(acta));
                callback( startGetActas() );
                return Swal.fire({
                    icon: 'success',
                    title: msg,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    })
}

export const startGetActas = () => async ( callback:Function, redux: () => i_redux ) => {

    const { pagina } = redux().ui;

    const resp = await fetchWithToken({url:`/actas/conv/${pagina}`});
    const { ok, actas,registros } = await resp.json();

    if( ok ){
        callback(getActas(actas, registros));
    }
}

export const startAddNewActa = (values:any, asunto:string) => async ( callback:Function, redux: () => i_redux ) => {

    const { files, convocatoria } = values;
    const { actas:{allactas},ui:{pagina} } = redux();

    const formData = new FormData();
    const filesstringnames:string[] = [];

    if( files ){
        for (let i = 0; i < files.length; i++) {
            const filename = files[i].name;
            const ext = filename.substring(filename.lastIndexOf('.'), filename.length);
            formData.append('actasadj', files[i], `${i}${new Date().getTime()}-${new Date().getMilliseconds()}${ext}`);
            filesstringnames.push(`${i}${new Date().getTime()}-${new Date().getMilliseconds()}${ext}`);
        }
    }

    const resp = await fetchWithToken({url:`/actas/add?conv_id=${convocatoria}`,method:'POST',data:formData});
    const { ok, id_acta, adjuntos_res } = await resp.json();
    
    if( ok ){

        if( allactas && allactas?.length < 10 ) {

            if( pagina === 1 ){
                callback( setRegistros(1) );
            }

            callback(addNewActa({
                id:id_acta,
                id_conv: Number(convocatoria),
                asunto,
                adjuntos:adjuntos_res
            }));
        }else {
            callback( startGetActas() );
        }
    }
}

export const startUpdateActa = ( values:any, asunto:string, id_acta:number ) => async ( callback:Function ) => {
    const { files, convocatoria}  = values;

    const formData = new FormData();
    const filesstringnames:string[] = [];

    if( files ){
        for (let i = 0; i < files.length; i++) {
            const filename = files[i].name;
            const ext = filename.substring(filename.lastIndexOf('.'), filename.length);
            formData.append('actasadj', files[i], `${i}${new Date().getTime()}-${new Date().getMilliseconds()}${ext}`);
            filesstringnames.push(`${i}${new Date().getTime()}-${new Date().getMilliseconds()}${ext}`);
        }
    }


    const resp = await fetchWithToken({url:`/actas/adjuntos/${id_acta}`,method:'PUT',data:formData});
    const { ok, adjuntos_res } = await resp.json();

    if( ok ){
        console.log(adjuntos_res)
        callback(updateActa({
            id: id_acta,
            asunto,
            id_conv: Number(convocatoria),
            adjuntos: adjuntos_res
        }));
    }
}

export const startGetAnnoucement = () => async ( callback:Function ) => {
   
    const resp = await fetchWithToken({url: '/actas/annoucement'});
    const { ok, data } = await resp.json();

    if( ok ){
        callback(AddAnnoucement(data));
    }
}

export const startDownloadFile = (id_acta:number, filename: string) =>  async (callback:Function) =>{
    const resp = await fetchWithToken({url:`/actas/adjuntos/${id_acta}/${filename}`});
    const file = await resp.blob();

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
}

export const startDeleteFile = (id_acta:number, filename: string, id:number) => (callback:Function) => {
    
    Swal.fire({
        title: 'Estas Seguro?',
        text: "Esta acción no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then( async (result) => {
        if (result.isConfirmed) {

            callback( deleteFile(id) );

            const resp = await fetchWithToken({url:`/actas/adjuntos/${id_acta}/${filename}`, method:'DELETE'});
            const { ok, msg } = await resp.json();

            if(ok){
                return Swal.fire({
                    icon: 'success',
                    title: msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }else {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oh no!',
                    text: msg,
                    showCancelButton: true,
                    timer: 1500
                })
            }

        }
    })
}