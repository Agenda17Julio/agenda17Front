import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i_redux } from '../../../../../interfaces/redux';
import ActasReducer from '../../../../../reducers/actasReducer';
import AdjuntosList from './adjuntos';
import Swal from 'sweetalert2';
import { startDeleteActa } from '../../../../../actions/actas';
import Paginacion from '../../../../ui/paginación';

const Listado = () => {

    const dispatch = useDispatch();

    const [ adjuntosActa, setAdjuntosActa ] = useState<Array<any>>([]);
    const [ openModalAdj, setOpenModalAdj ] = useState(false);

    const {  actas: {allactas: actas, registros}, auth: { rol }  } = useSelector((i:i_redux) => i);

    const handleOnclickAdj = (adjuntos?:Array<any>) => {
        if( adjuntos && adjuntos.length > 0 ) {
            setAdjuntosActa(adjuntos);
            setOpenModalAdj(true);
        }else {
            return Swal.fire({
                title: 'Oh no!',
                text: 'La convocatoria seleccionada no tiene actas ancladas',
                icon: 'warning',
                timer: 3000
            })
        }
    }


    const handleDeleteAdj = (acta:any) => dispatch(startDeleteActa(acta));



    return <div>
        {
            Number(registros) <= 0 
                ?   <div>No existen actas ancladas a convocatorias</div>
                :   <div>
                     <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Convocatoria</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                actas?.map(acta => <tr key={acta.id}>
                                    <td>{acta.id}</td>
                                    <td>{acta.asunto}</td>
                                    <td>
                                        <i 
                                            className="material-icons" 
                                            style={{cursor:'pointer',margin: '.2em'}}
                                            onClick={ () => handleOnclickAdj(acta.adjuntos) }
                                            >insert_drive_file
                                        </i>
                                        {
                                            Number(rol) === 1 &&  <i 
                                                className="material-icons" 
                                                style={{cursor:'pointer',margin: '.2em'}}
                                                onClick={ () => handleDeleteAdj(acta) }
                                                >delete
                                            </i>
                                        }
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>


                    <Paginacion maxElem={Number(registros)}/>
                            
                    <AdjuntosList 
                        adjuntos={adjuntosActa} 
                        isOpen={ openModalAdj }
                        setOpenModal={ setOpenModalAdj }
                    />
                </div>
        }
    </div>
}

export default Listado;