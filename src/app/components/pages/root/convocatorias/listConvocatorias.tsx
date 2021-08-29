import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearActiveFab } from "../../../../actions/ui";
import { i_redux } from "../../../../interfaces/redux";
import { i_event_resp } from '../../../../interfaces/resp_serv/convocatorias';
import CardConvocatoria from './card_activas';
import Loading from '../../../ui/loading';

const ListConvocatorias = () => {

    const { conv: { actives }, ui: { fab, loading } } = useSelector((info: i_redux) => info);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (fab?.edit || fab?.del || fab?.plus) {
            dispatch(clearActiveFab())
        }
    }

    let convocatorias = actives as Array<i_event_resp>;


    const actual = moment(new Date());
    const actualFinalDia= moment(new Date())
    console.log("actual"+actual)
    if (actives) {
        convocatorias = actives?.filter(conv => {
            const trans = conv.fecha as Date
            const fechaCorregida = new Date(trans)
         
            return moment(fechaCorregida).isBetween(moment(actual),moment(actualFinalDia.minute(59).hour(23)));
        })
    }

    return loading
        ? <Loading />
        : <div className='list_container'>
            <div className="section_header">
                <p>Convocatorias Activas</p>
                <Link to='/allconv' onClick={handleClick}>Ver todo</Link>
            </div>
            <div className="section_body">
                {
                    convocatorias?.length >= 1
                        ? convocatorias?.map((conv: i_event_resp) => {
                            return <CardConvocatoria
                                key={conv.id}
                                {...conv}
                            />
                        })
                        : <div>
                            No existen convocatorias activas para el dia de hoy!!
                        </div>

                }
            </div>
        </div>
}

export default ListConvocatorias;