import { i_fetch } from '../interfaces/helper/fetch';

const baseURL = process.env.REACT_APP_API_URL;


export const fetchWithoutToken = async (info:i_fetch):Promise<Response> => {
    return new Promise ((resolve, reject) => {
        try {
            const { method, data } = info;
            const url = `${baseURL}${info.url}`;
            if ( !method ) {
                resolve (fetch( url ));
            }else {
                resolve (fetch( url, {
                    method,
                    body: JSON.stringify( data ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }));
            }
        } catch ( err ) {
            reject(err);
        }
    })
}


export const fetchWithToken = async (info:i_fetch):Promise<Response> => {
    return new Promise((resolve, reject) => {
        try {

            let { method, data, isjson } = info;
            const url = `${baseURL}${info.url}`;

            const token = localStorage.getItem('x-token') || '' ;

            const headers:any = {
                'X-Token': token
            }
            
            if( !method ){
                resolve (fetch( url, { headers } ));
            }else {

                let config = {
                    method,
                    body: data,
                    headers
                }
    
                if( isjson ) config = {
                    headers: {
                        ...headers,
                        'Content-type' : 'application/json'
                    },
                    method,
                    body: JSON.stringify(data)
                }

                resolve (fetch(url,config ));
            }


        } catch ( err ) {
           reject(err)
        }
    })
}