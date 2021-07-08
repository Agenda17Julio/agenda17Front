import { createPortal } from 'react-dom'
import { useEffect, useRef,useState } from "react";
import { ChipsOptions, ModalOptions } from "materialize-css";
import { startAddAnnoucement,clearListConv, startUpdateAnnoucement,startDownload, setListConv, deleteFileServer, startDelFileServer } from "../../actions/convocatoria";
import { clearActiveFab, clearActiveFile, clearAllFiles, clearCalendarDate, clearDelActiveFile, closeModal, delActiveFile, delFile, setActiveFile, setFileAll, startLoading } from "../../actions/ui";
import { i_redux } from "../../interfaces/redux";
import { useDispatch, useSelector } from 'react-redux';
import { i_event_resp } from '../../interfaces/helper/events';
import moment from '../../helpers/momentjs';
import { Editor } from '@tinymce/tinymce-react';
import { config } from '../../helpers/htmlEditor';
import TimeKeeper from 'react-timekeeper';
import UseForm from "../../hooks/useForm";
import Fab from './fab';
import Swal from 'sweetalert2';

const portal = document.getElementById('portal-modal') as HTMLElement;

const Modal = () => {

    const ref = useRef<any>(null);
    const ref_chip = useRef<any>(null);
    const refadjunto_chip = useRef<any>(null);
    const dispatch = useDispatch();
    const { ui:{ fab,files,activefile,modal,delactivefile }, conv: { active,users }, auth:{rol} } = useSelector((info:i_redux) => info);


    const { 
        ui:{calendarDate},
        conv:{listConv},
        auth:{uid,username,email} 
    } = useSelector((info:i_redux) => info );


    let init:i_event_resp = {
        asunto:'',
        fecha: calendarDate || new Date(),
        detalle: '',
        usuario: Number(uid),
        adjunto: undefined
    }  

    
    const [ value,handleInputOnChange,setValues,reset ] = UseForm( init );
    let { asunto,fecha } = value as i_event_resp;

    const [ valueEditor, setValueEditor ] = useState('');
    const [ time, setTime ] = useState(moment(new Date()).minutes(30).format('HH:mm'));
    const [ showTime, setShowTime ] = useState(false);
    const input = (document as any).querySelector('#fileSelector') as HTMLInputElement;



    const mapData = (data:Array<any>) => data.map((elem:any) => elem.tag);
    const usuarios = users as string[];
    let data_usr:any = {}

    for (const i in usuarios) {
        data_usr = { ...data_usr, [usuarios[i]]: null }
    }

       
    const opciones:ModalOptions = {
        opacity: 0.5,
        inDuration: 250,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%',
        endingTop: '10%',
        dismissible: true,
        onCloseEnd: () => {},
        onOpenEnd: () => {},
        onOpenStart: () => {},
        onCloseStart: () => {
            dispatch(closeModal());
            dispatch( clearActiveFile() );
            dispatch( clearDelActiveFile() );
            dispatch(clearCalendarDate());
            dispatch(clearActiveFab());
        }
    }


    const opcionesChips:ChipsOptions = {
        data:                   [],
        placeholder:	        'Destinatarios',
        secondaryPlaceholder:	'Add+',
        autocompleteOptions:	{
            data: {},
            limit: Infinity,
            minLength: 1
        },
        limit:	                Infinity,
        onChipAdd: () => { 

            instanceChips.chipsData.forEach(({tag}:{tag:string}, index:number) => {
                if(!validateEmail(tag)){
                    instanceChips.deleteChip( index );
                }
            })
            dispatch(setListConv(mapData(instanceChips.chipsData)))
        },
        onChipSelect: () => {},
        onChipDelete: () => dispatch(setListConv(mapData(instanceChips.chipsData)))   
    }

    const deleteWarning = (msg:string, callback:Function, fileserver:boolean) => Swal.fire({
        title: 'Estas seguro?',
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
            callback();

            if( fileserver ) {
                return Swal.fire({
                    title: 'Espere un momento!',
                    text:  'La acción solicitada se esta procesando',
                    icon:  'warning',
                    timer: 2000
            })} else {
                return Swal.fire({
                    title: 'Todo salio bien!',
                    text:  'La acción se completo correctamente!',
                    icon:  'success',
                    timer: 2000
                })
            }
        }else {
            return;
        }
      })


    const opcionesAdjuntoChips:ChipsOptions = {
        ...opcionesChips,
        placeholder: 'Adjuntos',
        onChipAdd: () => {},
        onChipSelect: (e,f) => dispatch(setActiveFile(String(f.textContent))),
        onChipDelete: () => null
    } 

  
    let modalInstance:M.Modal;
    let instanceChips:M.Chips;
    let instanceAdjuntoChips:M.Chips;


    useEffect(() => {
        init = {
            ...init,
            fecha: calendarDate || new Date()
        }

        if( active ) {
            init = {
                asunto: String(active.asunto),
                fecha: active.fecha as any,
                detalle: String(active.detalle),
                usuario: Number(active.usuario),
                adjunto: active.adjunto as any
            }
            setTime(moment(active.fecha).format('HH:mm'));
            setValueEditor(String(active?.detalle))

        }
        setValues(init)

        return () => reset();
    },[ active,calendarDate ]);


    useEffect(() => {
        instanceAdjuntoChips = M.Chips.init(refadjunto_chip.current, opcionesAdjuntoChips);

        const inputAdChip = window.document.querySelectorAll('.chips')[1] as any;
        inputAdChip.firstElementChild.readOnly=true;

        setTimeout(() => {
            const children = inputAdChip.children;
            for (const i in children) {
                if(children[i].className === 'chip'){
                    const node = children[i].children[0];
                    if( node ){
                        children[i].removeChild(node);
                    }
                }
            }
        },10);


        let isfileserver = false;

        const deleteFileAction = ( ) => {

            const data = instanceAdjuntoChips.chipsData;
    
            for (const i in data) {
                if( data[i].tag === activefile ){
                    instanceAdjuntoChips.deleteChip(Number(i));
                }
            }

            for (const j in active?.files) {
                if( active?.files[Number(j)] === activefile) {
                    isfileserver = true;
                    dispatch( deleteFileServer(String(activefile)) );
                    dispatch( startLoading() );
                    dispatch( startDelFileServer(String(active?.id), String(activefile)) );
                }
            }

            for (const i in files) {
                if( files[Number(i)].name === activefile ){
                    dispatch(delFile(String(activefile)))
                }
            }

            dispatch(clearDelActiveFile());
            dispatch( clearActiveFile() );
        }


        if( delactivefile ){
             deleteWarning('Esta acción es irreversible, ten en cuenta que el archivo puede estar alojado en el servidor', deleteFileAction, isfileserver);
             
        }


        if( active?.files && files ){
            
            let data:any = [];
            
            for (const i in active?.files) {
                data.push(active?.files[i])
            }
            
            for (const i in files) {
                data.push(files[i].name)
            }
            
            for (const i in data) {
                instanceAdjuntoChips.addChip({tag: data[i]})
            }
            
        }else if( active?.files ){
            for (const i in active?.files) {
                instanceAdjuntoChips.addChip({tag: active?.files[i]})
            }
        }else if( files ){
            for (const i in files) {
                instanceAdjuntoChips.addChip({tag: files[i].name})
            }
        }

        return () => instanceAdjuntoChips.destroy();

    },[ modal,delactivefile,files ])


    useEffect(() => {

        modalInstance = M.Modal.init(ref.current, opciones);    
        instanceChips = M.Chips.init(ref_chip.current, opcionesChips);
       

        instanceChips.autocomplete.options.data = data_usr;
       

        if( active?.to ){
            for (const i in active.to) {
                instanceChips.addChip({tag:active.to[i]})
            }
        }
        
        if( modal ) modalInstance.open();

        // modalInstance.el.addEventListener('click', handleClickEvent)
        
        return () => {
            modalInstance.destroy();
            instanceChips.destroy();
            // document.removeEventListener('click', handleClickEvent);
            
        };
        
    },[modal]);


    const handleEditor = (evt:any, editor:any) => {
        setValueEditor(editor.getContent({format: 'html'}));
    }

    const handleUploadFiles = () => input.click();
  
    const handleOnChangeInputFiles = ({target}:{target:HTMLInputElement}) => {
        const { files } = target;
        files?.length && dispatch( setFileAll( Array.from(files) ) );
    }

    const handleSubmit = (e:Event) => {
        e.preventDefault();
        const [ hora, minuto ] = time.split(':');
        value.detalle = valueEditor;
        value.fecha = moment(fecha).hour(Number(hora)).minute(Number(minuto)).toDate();
        value.from = {
            name: username,
            adress: email
        };

        value.to = listConv;


        if( active ){
            value.id = active.id;
            dispatch( startLoading() );
            dispatch( startUpdateAnnoucement(value,files as File[]) );
        }else {
            dispatch( startLoading() );
            dispatch( startAddAnnoucement(value,files as File[]) );
        }
        dispatch( clearActiveFab() );
        dispatch( clearListConv() );
        dispatch( closeModal() );
        dispatch( clearAllFiles() );
        setValueEditor('');

        (document as any).querySelector('#fileSelector').value='';
        reset();
    }


    const handleActivefile = () => {
        let res = true;

        for (const i in active?.files) {
           if( activefile === active?.files[Number(i)] ){
               res=false;
           }
        }

        return res;
    }

    return createPortal( <div id="modal1" className="modal" ref={ ref }> 
        <div className="modal-content">
            <h4>{
                fab?.plus ? 'Crear Convocatoria' : 'Visualizar Convocatoria'
            }</h4>

            <form onSubmit={ handleSubmit as any } className='modalForm'>
                <br /><br />

                <div className="input-field col s6">
                    <i className="material-icons prefix">subject</i>
                    <input 
                        type="text"
                        id="asuntoid"
                        name='asunto'
                        placeholder='Asunto'
                        value={ asunto }
                        onChange={ handleInputOnChange }
                        minLength={0}
                        maxLength={30} 
                        autoComplete='off'
                        disabled={Number(rol) !== 1}
                    />
                </div><br />
            
                <div className="input-field col s6 modalDate">
                    <i className="material-icons prefix">date_range</i>
                    <input 
                        type="date"
                        id="dateid"
                        name='fecha'
                        min={ active ? '' :moment(new Date()).format('YYYY-MM-DD') }
                        value={ moment(fecha).format('YYYY-MM-DD') }
                        onChange={ handleInputOnChange }
                        disabled={Number(rol) !== 1}
                    />
                    <div id='timeid'>
                        <i 
                            className="material-icons prefix"
                            id='icontime'
                            onClick={() => Number(rol) === 1 && setShowTime(!showTime)}
                            
                            >access_time
                        </i>
                        <input 
                            type="text"
                            name='hora'
                            value={ time }
                            readOnly={ true }  
                            disabled={Number(rol) !== 1}
                        />
                        {showTime &&
                            <TimeKeeper
                                time={time}
                                onChange={(newTime) => setTime(newTime.formatted24)}
                                onDoneClick={() => setShowTime(false)}
                                switchToMinuteOnHourSelect
                            />
                        }
                    </div>
                </div><br />


                <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <div className="chips chips-autocomplete" ref={ ref_chip }></div>
                </div><br />

                <div className="input-field col s6">
                    <i className="material-icons prefix" onClick={ handleUploadFiles } style={{cursor:'pointer'}}>attach_file</i>
                    <div className="chips"  ref={ refadjunto_chip }></div>
                    <input 
                        type="file" 
                        id='fileSelector'
                        onChange={ handleOnChangeInputFiles }
                        multiple={ true }
                        style={{display:'none'}}
                        disabled={Number(rol) !== 1}
                    />
                </div>

                <div className=' modalattachment'>
                    <div className='input-field col s6'>
                        <i className="material-icons prefix">edit</i>
                        <label htmlFor="">Detalle</label>
                    </div>
                </div>

                <div className="input-field col s6 modaleditor">       
                    <Editor
                        id='detalleid'
                        value={ valueEditor }
                        onEditorChange={ handleEditor }
                        outputFormat='html'
                        init={ config }
                        disabled={Number(rol) !== 1}
                    />
                </div>    
          
                <div className='container_btn_modal'>
                    {
                        Number(rol) === 1 &&  <button 
                            type="submit"
                            className='btn waves-effect waves-light primary'
                            >Agendar
                        </button> 
                    }
                   
                    <button 
                        type="button"
                        onClick={ () => dispatch(closeModal()) }
                        className='btn waves-effect waves-light red lighten-2 primary'
                        >Cancelar
                    </button>


                </div>
            </form> 
            <div className="container_fab">
                <div className="container_fab_modal">
                    <Fab color='cyan' toggle={ handleActivefile() } icon='file_download' click={ () => {
                        dispatch(startLoading());
                        dispatch(startDownload(String(active?.id), String(activefile))) }
                    }/>
                    {
                        Number(rol) === 1 && <Fab color='red' toggle={ activefile ? false : true } icon='delete' click={ () => {
                            dispatch(delActiveFile());
                        }}/>
                    }
                </div>
            </div>
        </div>
        
    </div>, portal)
}





function validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default Modal;