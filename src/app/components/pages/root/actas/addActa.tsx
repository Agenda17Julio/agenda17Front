import { useEffect, useState } from 'react';
import UseForm from '../../../../hooks/useForm';
import Fab from '../../../ui/fab';
import ModalActas from '../../../ui/modal_actas';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { i_redux } from '../../../../interfaces/redux';
import { startAddNewActa, startGetAnnoucement, startUpdateActa } from '../../../../actions/actas';
import { useRef } from 'react';

const AddActa = () => {

    const dispatch = useDispatch();
    const ref_files_input = useRef<any>(null);

    const { annoucement, allactas } = useSelector((i:i_redux) => i.actas);
    
    const [ openModal, setOpenModal ] = useState(false);
    const [ values, inputOnChange, ,reset ] = UseForm({
        files: [],
        convocatoria: ''
    });


    const handleAddActa = () => setOpenModal(true);

    const handleShowInput =() => {
        ref_files_input.current.click();
    }

    const handleSubmit =(e:Event) => {
        e.preventDefault();
        
        if( Array.from(values.files).length <= 0 ){
            return Swal.fire({title: 'Oh no!', text: 'selecciona un archivo', timer: 3000, icon: 'warning'})
        }else if( !values.convocatoria ){
            return Swal.fire({title: 'Oh no!', text: 'selecciona una convocatoria', timer: 3000, icon: 'warning'})
        }

        
        let hasUpdate = false;
        let id_acta:any = 0;
        let asunto = '';
        
        if(allactas) 
            for (const i in allactas) {
                if( allactas[i].id_conv === Number(values.convocatoria) ){
                    hasUpdate = true;
                    id_acta = allactas[i].id;
                }
            }
        

        if( annoucement  )
            for (const i in annoucement) {
                if( annoucement[i].id === Number(values.convocatoria) ){
                    asunto = annoucement[i].asunto;
                }
            }


        if( hasUpdate ) {
            // actualizar
            dispatch(startUpdateActa(values,asunto, id_acta));
        
        }else {
            dispatch(startAddNewActa(values, asunto));
        }

        setOpenModal(false);
        reset();
        
    }


    useEffect(() => {
        if( !annoucement ){
            dispatch(startGetAnnoucement());
        } 
    },[dispatch,annoucement]);
    
    return <>
        <Fab color='cyan' toggle={ true  } icon='add' click={ handleAddActa }/>
        <ModalActas  isOpen={ openModal } setOpenModal={ setOpenModal }>
            <span>Seleccione los archivos adjuntos y la convocatoria correspondiente</span>
            <form onSubmit={ handleSubmit as any}>
                <input 
                    type="file"
                    multiple={ true } 
                    name="files" 
                    onChange={ inputOnChange }
                    ref={ ref_files_input }
                    style={{display: 'none'}}
                />

                <i 
                    className="material-icons" 
                    style={{cursor:'pointer',margin: '.2em'}}
                    onClick={ handleShowInput }
                    >attach_file
                </i>

                <select 
                    name="convocatoria"
                    style={{display: 'block'}}
                    onChange={ inputOnChange }
                    value={ values.convocatoria } 
                > 
                    <option value="" disabled hidden >Selecciona una convocatoria</option>
                    {
                        annoucement?.map(conv => <option value={conv.id} key={conv.id}>{conv.asunto}</option>)
                    }
                </select>
               
                <button type='submit'> Submit</button>
            </form>
        </ModalActas>
    </>
}


export default AddActa;