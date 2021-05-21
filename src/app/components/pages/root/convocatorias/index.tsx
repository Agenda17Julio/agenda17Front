import ListConvocatorias from './listConvocatorias';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearListConv, startAddAnnoucement, startLoadActiveAnnoucements } from '../../../../actions/convocatoria';
import { i_event_resp } from '../../../../interfaces/helper/events';
import UseForm from '../../../../hooks/useForm';
import Calendar from './calendarScreen';
import Modal from '../../../ui/modal';
import moment from '../../../../helpers/momentjs';
import { Editor } from '@tinymce/tinymce-react';
import { config } from '../../../../helpers/htmlEditor';
import { i_redux } from '../../../../interfaces/redux';
import TimeKeeper from 'react-timekeeper';
import ChipsSelector from '../../../ui/chips';


const ConvocatoriaScreen = () => {

    const {
        ui: { calendarDate },
        conv: { listConv },
        auth: { uid, username, email }
    } = useSelector((info: i_redux) => info);

    let init: i_event_resp = {
        asunto: '',
        fecha: calendarDate,
        detalle: '',
        usuario: Number(uid),
        adjunto: undefined
    }


    const [value, handleInputOnChange, setValues, reset] = UseForm(init);
    let { asunto, fecha } = value as i_event_resp;

    useEffect(() => {
        init = {
            ...init,
            fecha: calendarDate
        }
        setValues(init)
        return () => reset();
    }, [calendarDate])


    const [valueEditor, setValueEditor] = useState('');
    const [time, setTime] = useState('12:00');
    const [showTime, setShowTime] = useState(false);


    const handleEditor = (evt: any, editor: any) => {
        setValueEditor(editor.getContent({ format: 'html' }));
    }

    const dispatch = useDispatch();

    const handleUploadFiles = () => {
        (document as any).querySelector('#fileSelector').click();
    }

    useEffect(() => {
        dispatch(startLoadActiveAnnoucements());
    }, [dispatch]);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const [hora, minuto] = time.split(':');
        value.detalle = valueEditor;
        value.fecha = moment(fecha).hour(Number(hora)).minute(Number(minuto)).toDate();
        value.from = {
            name: username,
            adress: email
        };
        value.to = listConv;


        dispatch(startAddAnnoucement(value))

    }



    return <>
        <div className="row">
            <div className="col s12 m4 l3 xl4">
                <ListConvocatorias />
            </div>
            <div className="col s12 m8 l9 xl8">
                <Calendar />
            </div>
        </div>

        <Modal><div className="row">
            <form onSubmit={handleSubmit as any} className='col s12'>
                <br />   <br />
                <div className="row col s12">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">subject</i>
                        <label htmlFor="asuntoid">Asunto</label>
                        <input
                            type="text"
                            id="asuntoid"
                            name='asunto'
                            value={asunto}
                            onChange={handleInputOnChange}
                            minLength={0}
                            maxLength={30}
                            autoComplete='off'
                        />
                    </div>
                </div>

                
           
                <div className="input-field row col s12 modalDate">
                    <div className="inputFecha col s6">
                        <i className="material-icons prefix">date_range</i>
                        <input
                            type="date"
                            id="dateid"
                            name='fecha'
                            min={moment(new Date()).format('YYYY-MM-DD')}
                            value={moment(fecha).format('YYYY-MM-DD')}
                            onChange={handleInputOnChange}
                        />
                    </div>
                    <div id='timeid' className="col s6">
                        <i
                            className="material-icons prefix"
                            id='icontime'
                            onClick={() => setShowTime(!showTime)}
                        >access_time
                        </i>
                        <input
                            type="text"
                            name='hora'
                            value={time}
                            readOnly={true}
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

               

                <div className="input-field row col s12">
                    <div className="col s12">
                    <i className="material-icons prefix conl s12">account_circle</i>
                    <ChipsSelector />
                    </div>
                </div>

                <div className=' modalattachment'>
                    <div className='input-field col s6'>
                        <i className="material-icons prefix">edit</i>
                        <label htmlFor="">Detalle</label>
                    </div>
                    <div className='input-field col s6 attachment'>
                        <i
                            className="material-icons prefix "
                            onClick={handleUploadFiles}
                        >attach_file
                        </i>

                        <input
                            type="file"
                            id='fileSelector'
                            name="adjunto"
                            onChange={handleInputOnChange}
                            multiple={true}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <div className="input-field col s12 modaleditor">
                    <Editor
                        id='detalleid'
                        value={valueEditor}
                        onEditorChange={handleEditor}
                        outputFormat='html'
                        init={config}
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
                        className='btn waves-effect waves-light red lighten-2 primary'
                    >Cancelar
                    </button>
                </div>

            </form>
        </div>
        </Modal>
    </>
}


export default ConvocatoriaScreen;