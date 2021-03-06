import { i_event_resp } from "../../../../interfaces/resp_serv/convocatorias";
import moment from '../../../../helpers/momentjs';
import { useDispatch } from "react-redux";
import { loadActiveAnnoucement } from "../../../../actions/convocatoria";
import { activeEditDeleteFab } from '../../../../actions/ui';

const CardActiveAnnoucements = (event: i_event_resp) => {

  const { asunto, detalle, fecha } = event;
  const dispatch = useDispatch();

  const date = moment(fecha).fromNow();

  const handleClick = () => {

    dispatch(loadActiveAnnoucement(event))
    dispatch(activeEditDeleteFab())

  }

  return <div className="card hoverable grey lighten-5" onClick={handleClick}>
    <div className="card-content">
      <div className=" row">
        <span className="card-title col s6 m12 l6">{asunto}</span>
        <span className="card-fecha col s6 m12 l6">{date}</span>
      </div>
      <div className="detalle">
        <p className='card-text' dangerouslySetInnerHTML={{ __html: String(detalle) }}></p>
      </div>
      <div className="card-container-img">
        <img
          src="https://images.photowall.com/products/60869/azores-mountain-landscape-1.jpg?h=699&q=85"
          alt="autor.jpg"
        />
      </div>

    </div>
  </div>

}

export default CardActiveAnnoucements;