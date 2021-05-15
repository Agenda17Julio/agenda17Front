import { i_event_resp } from "../../../../interfaces/resp_serv/convocatorias";
import moment from '../../../../helpers/momentjs';

const CardActiveAnnoucements = ({ id,asunto,detalle,fecha }:i_event_resp) => {

    const date = moment(fecha).fromNow();

    return  <div className="row">
    <div className="col s12 m6">
      <div className="card grey lighten-5">
        <div className="card-content">
            <div className="card-container-title">
                <span className="card-title">{ asunto }</span>
                <span className="card-fecha">{ date }</span>
            </div>
            <p className='card-text'>{ detalle }</p>
            <div className="card-container-img">
                <img 
                    src="https://images.photowall.com/products/60869/azores-mountain-landscape-1.jpg?h=699&q=85" 
                    alt="autor.jpg" 
                />
            </div>
        </div>
      </div>
    </div>
  </div>
}

export default CardActiveAnnoucements;