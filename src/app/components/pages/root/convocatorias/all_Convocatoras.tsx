import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearActiveAnnoucement, loadActiveAnnoucement, startDelAnnoucement, startLoadAnnoucements } from "../../../../actions/convocatoria";
import { i_redux } from "../../../../interfaces/redux";
import moment from '../../../../helpers/momentjs';
import Paginacion from "../../../ui/paginación";
import Modal from '../../../ui/modal';
import { openModal } from '../../../../actions/ui';
import { i_events_convocatoria } from "../../../../interfaces/helper/events";
import { i_event_resp } from "../../../../interfaces/resp_serv/convocatorias";


const AllConvocatorias = () => {

    const dispatch = useDispatch();
    const { pagina } = useSelector((info:i_redux) => info.ui);

    const { convocatorias } = useSelector((info:i_redux) => info.conv);

    useEffect(() => {
        pagina && dispatch(startLoadAnnoucements(pagina))
    },[ dispatch, pagina ]);

   
    const handleDel = (conv:i_event_resp) => dispatch(startDelAnnoucement(conv));

    const handlEdit = ( event:i_events_convocatoria) => {
        dispatch( openModal() );
        return dispatch(loadActiveAnnoucement(event));
    }

    const handleBackCal = () => {
        dispatch(clearActiveAnnoucement());
    }

    return <div>
        <Link to='/' onClick={ handleBackCal }>Regresar a Calendario</Link>
        
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Asunto</th>
                    <th>Fecha</th>
                    <th>Autor</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>{ 
                convocatorias && convocatorias.data.map((conv:any) => {
                    const { id,asunto,fecha,usuario } = conv;
                    return <tr key={ id }>
                        <td>{id}</td>
                        <td>{asunto}</td>
                        <td>{moment(fecha).format('DD/MM/yyyy')}</td>
                        <td>{usuario}</td>
                        <td>
                            <i 
                                className="material-icons" 
                                style={{cursor:'pointer'}}
                                onClick={ () => handlEdit(conv)} >create
                            </i>
                            <i 
                                className="material-icons" 
                                style={{cursor:'pointer'}}
                                onClick={ () => handleDel(conv) } >delete_sweep
                            </i>
                        </td>
                    </tr>
                })
            }</tbody>
        </table>

        <div>
            {
                convocatorias
                && <Paginacion maxElem={Number(convocatorias.registros)}/>
            }
        </div>

        
        <Modal/>
    </div>
}





export default AllConvocatorias;