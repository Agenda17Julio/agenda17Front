import M, { ChipsOptions, ModalOptions } from "materialize-css";
import { createPortal } from 'react-dom'
import { useEffect, useRef,useState } from "react";
import { startAddAnnoucement,clearListConv, setListConv } from "../../actions/convocatoria";
import { clearActiveFab, clearCalendarDate, closeModal } from "../../actions/ui";
import { i_redux } from "../../interfaces/redux";
import { useDispatch, useSelector } from 'react-redux';
import { i_event_resp } from '../../interfaces/helper/events';
import moment from '../../helpers/momentjs';
import { Editor } from '@tinymce/tinymce-react';
import { config } from '../../helpers/htmlEditor';
import TimeKeeper from 'react-timekeeper';
import UseForm from "../../hooks/useForm";
import MaterializeHelper from '../../helpers/materialize';


const portal = document.getElementById('portal-modal') as HTMLElement;

const Modal = () => {

    const ref = useRef<any>(null);
    const ref_chip = useRef<any>(null);
   
    const dispatch = useDispatch();
    const { ui:{fab}, conv: { active } } = useSelector((info:i_redux) => info);


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

    useEffect(() => {
        init = {
            ...init,
            fecha: calendarDate || new Date
        }

        if( active ) {
            init = {
                asunto: active.asunto,
                fecha: active.fecha,
                detalle: active.detalle,
                usuario: active.usuario,
                adjunto: active.adjunto
            }
        }
        setValues(init)
        return () => reset();
    },[ calendarDate, active ])


    const [ valueEditor, setValueEditor ] = useState('');
    const [ time, setTime ] = useState('12:00');
    const [ showTime, setShowTime ] = useState(false);


    const handleEditor = (evt:any, editor:any) => {
        setValueEditor(editor.getContent({format: 'html'}));
    }

    const handleUploadFiles= () => {
        (document as any).querySelector('#fileSelector').click();
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


        dispatch( startAddAnnoucement(value) );
        dispatch( clearActiveFab() );
        dispatch( clearListConv() );
        dispatch( closeModal() )
        setValueEditor('');
        reset();
    }


    MaterializeHelper(ref, ref_chip);

    return createPortal( <div id="modal1" className="modal" ref={ ref }> 
        <div className="modal-content">
            <h4>{
                fab?.plus ? 'Crear Convocatoria' : 'Editar Convocatoria'
            }</h4>

            <form onSubmit={ handleSubmit as any } className='modalForm'>
                <br /><br />

                <div className="input-field col s6">
                    <i className="material-icons prefix">subject</i>
                    <label htmlFor="asuntoid">Asunto</label>
                    <input 
                        type="text"
                        id="asuntoid"
                        name='asunto'
                        value={ asunto }
                        onChange={ handleInputOnChange }
                        minLength={0}
                        maxLength={30} 
                        autoComplete='off'
                    />
                </div>
            
                <div className="input-field col s6 modalDate">
                    <i className="material-icons prefix">date_range</i>
                    <input 
                        type="date"
                        id="dateid"
                        name='fecha'
                        min={ moment(new Date()).format('YYYY-MM-DD') }
                        value={ moment(fecha).format('YYYY-MM-DD') }
                        onChange={ handleInputOnChange }
                    />
                    <div id='timeid'>
                        <i 
                            className="material-icons prefix"
                            id='icontime'
                            onClick={() => setShowTime(!showTime)}
                            >access_time
                        </i>
                        <input 
                            type="text"
                            name='hora'
                            value={ time }
                            readOnly={ true }  
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
                </div>


                <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <div className="chips chips-autocomplete" ref={ ref_chip }></div>
                </div>

                <div className=' modalattachment'>
                    <div className='input-field col s6'>
                        <i className="material-icons prefix">edit</i>
                        <label htmlFor="">Detalle</label>
                    </div>
                    <div  className='input-field col s6 attachment'>
                        <i 
                            className="material-icons prefix "
                            onClick={ handleUploadFiles }
                            >attach_file
                        </i>

                        <input 
                            type="file" 
                            id='fileSelector'
                            name="adjunto" 
                            onChange={ handleInputOnChange }
                            multiple={ true }
                            style={{display:'none'}}
                        />
                    </div>
                </div>

                <div className="input-field col s6 modaleditor">       
                    <Editor
                        id='detalleid'
                        value={ valueEditor }
                        onEditorChange={ handleEditor }
                        outputFormat='html'
                        init={ config }
                    />
                </div>
                
                <div>
                    <button 
                        type="submit"
                        className='btn waves-effect waves-light primary'
                        >Agendar
                    </button> 

                    <button 
                        type="button"
                        onClick={ () => dispatch(closeModal()) }
                        className='btn waves-effect waves-light red lighten-2 primary'
                        >Cancelar
                    </button> 
                </div>
            </form> 
        </div>
        
    </div>, portal)
}

export default Modal;