import ReactLoading from 'react-loading';
import { config } from '../../config/loading';

const Loading = ( ) => {
    const { type,color,height,width } = config;

    return <div className='loading_container'>
        <ReactLoading 
            type={ type }
            color={ color }
            height={ height } 
            width={ width } 
            className='loading'
        />
    </div>
}
    

export default Loading;