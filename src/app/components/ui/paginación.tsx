import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPagina } from "../../actions/ui";
import { i_redux } from "../../interfaces/redux";

const Paginacion = ({maxElem}:{maxElem:number}) => {

    const dispatch = useDispatch();
    const { pagina } = useSelector((info:i_redux) => info.ui);
    
    const rangosInit = {
        min: 1,
        max: 6
    }

    const [paginas, setPaginas] = useState<Array<number>>([]);
    const [ maxPag, setMaxPag ] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rango,setRango] = useState(rangosInit);

    useEffect(() => {

        const maxPaginas = Math.ceil(maxElem/10);
        let aux = [];
        for (let i = 1; i <= maxPaginas; i++) {
            aux[i] = i;
        }
        setPaginas(aux);
        setMaxPag( maxPaginas );
        setCurrentPage(Number(pagina));
    },[maxElem,pagina]);
    
    const { min, max } = rango;
    
    const handleLessPage = () => {
        if( currentPage > 1 ) {
            setCurrentPage(currentPage-1);
            dispatch(setPagina(currentPage - 1 ));
            
            if( currentPage === min ){
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

        if(currentPage+1 > maxPag) return;

        if ( maxPag <= 5 && currentPage+1 === 6) return setRango(rangosInit);
        
        if( currentPage < max - 1 ){
            setCurrentPage( currentPage + 1 );
            dispatch(setPagina(currentPage + 1 ))
        }
        
        if ( maxPag > 5  && currentPage % 5 === 0) {

            let inicio = currentPage+1;
            let fin = maxPag < 6 ? currentPage+6 : maxPag+1;
            let aux = [];


            for (let i = inicio; i <= fin; i++,inicio++) {
               aux[i]= inicio;
            }

            dispatch(setPagina((currentPage+1)));
            setCurrentPage(currentPage+1);
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
            <div onClick={ handleLessPage }>
                <i className="material-icons">chevron_left</i>
            </div>
        </li>
        {    
            maxPag <= 5 ? paginas.map((elem:any) => {
                return <li 
                    key={elem} 
                    className={`${currentPage === elem && 'active'}`}
                    style={{cursor: 'pointer'}}
                    onClick={ () => handleCurrentPage(elem) }>
                    <div  >{elem}</div>
                </li>
            }) : 
            paginas.slice(min,max).map((elem:any) => {
                return <li 
                    key={elem} 
                    className={`${currentPage === elem && 'active'}`}
                    style={{cursor: 'pointer'}}
                    onClick={ () => handleCurrentPage(elem) }>
                    <div  >{elem}</div>
                </li>
            })
        }
        <li className={`${(currentPage === maxPag) && 'disabled'}`} style={{cursor: 'pointer'}} >     
            <div  onClick={ handleMorePage }>
                <i className="material-icons" >chevron_right</i>
            </div>  
        </li>
    </ul>
}




export default Paginacion;