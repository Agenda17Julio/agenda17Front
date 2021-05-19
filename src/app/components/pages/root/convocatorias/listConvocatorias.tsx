import { useSelector } from "react-redux";
import { i_redux } from "../../../../interfaces/redux";
import { i_event_resp } from '../../../../interfaces/resp_serv/convocatorias';
import CardConvocatoria from './card_activas';

const ListConvocatorias = () => {

    const { actives } = useSelector((info: i_redux) => info.conv);
    const conv_actives = actives as Array<i_event_resp>;



    return <div className='list_container'>
        <div className="section_header row">
            <div className="first col s6">
                <p>Convocatorias Activas</p>
            </div>
            <div className="second col s6">
                <p>Ver todo</p>
            </div>
        </div>
        <div className="section_body">
            {
                conv_actives?.map((conv: i_event_resp) => {
                    const { id } = conv;
                    return <CardConvocatoria
                        key={id}
                        {...conv}
                    />
                })
            }
        </div>
    </div>
}

export default ListConvocatorias;