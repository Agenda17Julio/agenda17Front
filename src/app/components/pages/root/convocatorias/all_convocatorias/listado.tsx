import { useDispatch, useSelector } from "react-redux";
import { loadActiveAnnoucement, startDelAnnoucement, startLoadAnnoucements } from "../../../../../actions/convocatoria";
import { i_redux } from "../../../../../interfaces/redux";
import moment from '../../../../../helpers/momentjs';
import Paginacion from "../../../../ui/paginación";
import Modal from '../../../../ui/modal';
import { openModal, startLoading } from '../../../../../actions/ui';
import { i_event_resp } from "../../../../../interfaces/resp_serv/convocatorias";
import { useEffect } from "react";
import Loading from '../../../../ui/loading';

const AllConvocatorias = () => {

    const dispatch = useDispatch();

    const { ui: {pagina, loading}, conv: { typeList, convocatorias }, auth: {rol} } = useSelector((info:i_redux) => info);

    useEffect(() => {
        if( pagina && typeList === 'all' ){
            dispatch(startLoading());
            dispatch(startLoadAnnoucements(pagina));
        }
    },[dispatch,pagina,typeList]);

  
    const handleDel = (conv:i_event_resp) => {
        dispatch(startLoading());
        dispatch(startDelAnnoucement(conv))
    };

    const handlEdit = ( event:i_event_resp) => {
        dispatch( openModal() );
        dispatch(loadActiveAnnoucement(event));
    }

    return <div>{
            !loading
            ? Number(convocatorias?.registros) >= 1 
                ? <div className="col l9 s12 listado">
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
                            convocatorias?.data.map((conv:any) => {
                                const { id,asunto,fecha,usuario } = conv;
                                return <tr key={ id }>
                                    <td>{id}</td>
                                    <td>{asunto}</td>
                                    <td>{moment(fecha).format('DD/MM/yyyy')}</td>
                                    <td>{usuario}</td>
                                    <td>

                                        {
                                            Number(rol) === 1 
                                                ?  <div>
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
                                                </div>
                                                :   <i 
                                                    className="material-icons" 
                                                    style={{cursor:'pointer'}}
                                                    onClick={ () => handlEdit(conv)} >visibility
                                                </i>
                                        }
                                    </td>
                                </tr>
                            })
                        }</tbody>
                    </table>
                    
                    <Paginacion maxElem={Number(convocatorias?.registros)}/>

                    <Modal/>
                </div>
                : <div>
                    No existen convocatorias!!
                </div> 
            : <Loading/>
        }

        

    </div>
}





export default AllConvocatorias;