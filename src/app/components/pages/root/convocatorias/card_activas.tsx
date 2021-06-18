import { i_event_resp } from "../../../../interfaces/resp_serv/convocatorias";
import moment from '../../../../helpers/momentjs';
import { useDispatch, useSelector } from "react-redux";
import { i_redux } from "../../../../interfaces/redux";
import { loadActiveAnnoucement } from "../../../../actions/convocatoria";
import { activeEditDeleteFab } from '../../../../actions/ui';

const CardActiveAnnoucements = (event:i_event_resp) => {

    const { asunto,detalle,fecha } = event;
    const dispatch = useDispatch();
    const { active } = useSelector((info:i_redux) => info.conv);
    const date = moment(fecha).fromNow();

    const handleClick= () => {
      
        dispatch(loadActiveAnnoucement(event))
        dispatch(activeEditDeleteFab())
      
    }

    return  <div className="row" onClick={ handleClick }>
      <div className="col s12 m6">
        <div className="card grey lighten-5">
          <div className="card-content">
              <div className="card-container-title">
                  <span className="card-title">{ asunto }</span>
                  <span className="card-fecha">{ date }</span>
              </div>
              <p className='card-text' dangerouslySetInnerHTML={{__html: String(detalle)}}></p>
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