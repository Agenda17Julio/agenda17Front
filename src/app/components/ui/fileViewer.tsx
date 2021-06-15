import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// import { startLoadFileAnnoucement } from '../../actions/convocatoria';

const portal = document.getElementById('portal-viewer') as HTMLElement;

const FileView = () => {
    const ref = useRef(null);
    const [file,setFile] = useState('');

    const id= '167'
    const filename = '16236907035552.docx'

    useEffect(() => {
        console.log(true)
        // startLoadFileAnnoucement(id,filename)
        //     .then(f => URL.createObjectURL(f))
        //     .then(d => d && setFile(d));

       
    },[]);

    const handleClick = () => {
        let elem = ref.current as any;
        elem.src = file.normalize();
        // const tabOrWindow = window.open(elem.src, '_blank') as Window;
        // tabOrWindow.focus();
    }


    return createPortal(<>
        <iframe ref={ref} ></iframe>
        <button onClick={ handleClick }>ver mas</button>
    </>,portal)
   
} 

export default FileView;