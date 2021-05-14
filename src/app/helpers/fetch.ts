import { i_fetch } from '../interfaces/helper/fetch';

const baseURL = process.env.REACT_APP_API_URL;


export const fetchWithoutToken = async (info:i_fetch):Promise<Response> => {
    try {
        const { method, data } = info;
        const url = `${baseURL}${info.url}`;
        if ( !method ) {
            return fetch( url )
        }else {
            return fetch( url, {
                method,
                body: JSON.stringify( data ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch ( err ) {
        throw new Error( err )
    }
}


export const fetchWithToken = async (info:i_fetch):Promise<Response> => {
    try {

        const { method, data } = info;
        const url = `${baseURL}${info.url}`;

        const token = localStorage.getItem('x-token') || '' ;

        const headers:any = {
            'Content-Type': 'application/json',
            'X-Token': token
        }

        if( !method ){
            return fetch( url, { headers } );
        }else {
            return fetch(url,{
                headers,
                method,
                body: JSON.stringify(data)
            })
        }


    } catch ( err ) {
        throw new Error( err )
    }
}