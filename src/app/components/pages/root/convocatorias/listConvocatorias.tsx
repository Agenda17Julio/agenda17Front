import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearActiveFab } from "../../../../actions/ui";
import { i_redux } from "../../../../interfaces/redux";
import { i_event_resp } from '../../../../interfaces/resp_serv/convocatorias';
import CardConvocatoria from './card_activas';

const ListConvocatorias = () => {

    const { actives } = useSelector((info:i_redux) => info.conv);
    const conv_actives = actives as Array<i_event_resp>;
    const dispatch = useDispatch();
    const { fab } = useSelector((info:i_redux) => info.ui);

    const handleClick= () => {
        if( fab?.edit || fab?.del || fab?.plus ) {
            dispatch(clearActiveFab())
        }
    }

    return <div className='list_container'>
        <div className="section_header">
            <p>Convocatorias Activas</p>
            <Link to='/allconv' onClick={ handleClick }>Ver todo</Link>
        </div>
        <div className="section_body">
            {
                conv_actives?.map((conv:i_event_resp) => {
                    const { id } = conv;
                    return <CardConvocatoria
                        key={ id }
                        { ...conv }
                    />
                })
            }
        </div>
    </div>
}

export default ListConvocatorias;