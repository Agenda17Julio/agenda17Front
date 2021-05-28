import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPagina } from "../../actions/ui";
import { i_redux } from "../../interfaces/redux";

const Paginacion = ({maxElem}:{maxElem:number}) => {

    const dispatch = useDispatch();
    const { pagina } = useSelector((info:i_redux) => info.ui);

    let paginas = [];
    const maxPaginas = Math.ceil(maxElem/10);
    for (let i = 1; i <= maxPaginas; i++) {
        paginas[i] = i;
    }

    const rangosInit = {
        min: 1,
        max: paginas.length < 5 ? maxPaginas+1 : 6
    }

    const [currentPage, setCurrentPage] = useState(Number(pagina));
    const [rango,setRango] = useState(rangosInit);

    const handleLessPage = () => {
        if( currentPage > 1 ) {
            setCurrentPage(currentPage-1);
            dispatch(setPagina(currentPage - 1 ));

            if( currentPage === rango.min ){
                let inicio = currentPage;
                let fin = currentPage-5;
                let aux = [];
    
                for (let i = inicio; i >= fin; i--) {
                    aux[i] = i;
                }
    
                aux = aux.filter(Number);
    
                setRango({
                    min: aux[0],
                    max: aux[ aux.length-1 ]
                });
            }
        }

    }
   
    const handleMorePage = () => {

        if( currentPage < rango.max - 1 ){
            setCurrentPage( currentPage + 1 );
            dispatch(setPagina(currentPage + 1 ))
        }

        
        if ( maxPaginas >= 5  && currentPage % 5 === 0) {
            let inicio = currentPage+1;
            let fin = currentPage+6;
            let aux = [];


            for (let i = inicio; i <= fin; i++,inicio++) {
               aux[i]= inicio;
            }

            dispatch(setPagina((currentPage+1)));
            aux = aux.filter(Number);

            setRango({
                min: aux[0],
                max: aux[ aux.length-1 ]
            });
        }

    }

    const handleCurrentPage = (e:number) => {
        setCurrentPage(e);
        dispatch(setPagina(e));
    }

    return<ul className="pagination">
        <li className={`${currentPage === 1 && 'disabled'}`} style={{cursor: 'pointer'}}>
            <a href='#' onClick={ handleLessPage }>
                <i className="material-icons">chevron_left</i>
            </a>
        </li>
        {            
            paginas.slice(rango.min,rango.max).map((elem:any) => {
                return <li 
                    key={elem} 
                    className={`${currentPage === elem && 'active'}`}
                    style={{cursor: 'pointer'}}
                    onClick={ () => handleCurrentPage(elem) }>
                    <a href='#' >{elem}</a>
                </li>
            })
        }
        <li className={`${(currentPage === maxPaginas) && 'disabled'}`} style={{cursor: 'pointer'}} >     
            <a href='#' onClick={ handleMorePage }>
                <i className="material-icons" >chevron_right</i>
            </a>  
        </li>
    </ul>
}
export default Paginacion;