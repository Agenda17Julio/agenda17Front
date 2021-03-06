import UseForm from "../../../../../hooks/useForm";
import moment from '../../../../../helpers/momentjs';
import { i_search } from '../../../../../interfaces/components/convocatoria';
import { useDispatch, useSelector } from "react-redux";
import { setTypeList, startLoadAnnoucements, startSearchConvocatoria } from "../../../../../actions/convocatoria";
import { setPagina, startLoading } from "../../../../../actions/ui";
import { i_redux } from "../../../../../interfaces/redux";
import { useEffect } from "react";



const Search = () => {

    const { ui: { pagina }, conv: { typeList, convocatorias } } = useSelector((info: i_redux) => info);

    const init: i_search = {
        asunto_check: true,
        autor_check: false,
        fecha_check: false,
        asunto: '',
        autor: '',
        fecha: moment(new Date()).format('YYYY-MM-DD')
    }

    const dispatch = useDispatch();


    const [valuesSearch, handleInputChange] = UseForm(init);
    const { asunto_check, autor_check, fecha_check, asunto, autor, fecha } = valuesSearch as i_search;

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        dispatch(setTypeList('search'));
        dispatch(startLoading());
        dispatch(startSearchConvocatoria(valuesSearch));
    }

    useEffect(() => {
        if (pagina && typeList === 'search') {
            dispatch(startLoading());
            dispatch(startSearchConvocatoria(valuesSearch));
        }
    }, [pagina, dispatch, typeList])

    const handleShowAll = () => {
        if (typeList === 'search') {
            dispatch(startLoading());
            dispatch(setPagina(1));
            dispatch(setTypeList('all'));
            dispatch(startLoadAnnoucements(1));
        }
    };


    return <>{
        Number(convocatorias?.registros) >= 1 && <div className="col l3 s12 contentSearch">
            <div>
                <h5>Criterios de Busqueda</h5>
            </div>

            <form className="formSearch row" onSubmit={handleSubmit as any}>
                <section className="row col s12">
                    <div className="col l4 s12">
                        <label>
                            <input
                                type="checkbox"
                                name='asunto_check'
                                checked={asunto_check}
                                onChange={handleInputChange}
                            />
                            <span>Asunto</span>
                        </label>
                    </div>
                    <div className="col l4 s12">
                        <label>
                            <input
                                type="checkbox"
                                name='autor_check'
                                checked={autor_check}
                                onChange={handleInputChange}
                            />
                            <span>Autor</span>
                        </label>
                    </div>
                    <div className="col l4 s12">
                        <label>
                            <input
                                type="checkbox"
                                name='fecha_check'
                                checked={fecha_check}
                                onChange={handleInputChange}
                            />
                            <span>Fecha</span>
                        </label>
                    </div>
                </section>

                <section className="row col l12 m12 s12">
                    {
                        asunto_check && <div className="input-field col s12">
                            <i className="material-icons prefix">comment</i>
                            {/* <label htmlFor="asuntofid">Asunto</label> */}
                            <input
                                type="text"
                                id="asuntofid"
                                name='asunto'
                                placeholder='asunto'
                                value={asunto}
                                onChange={handleInputChange}
                                minLength={0}
                                autoComplete='off'
                            />
                        </div>
                    }{
                        autor_check && <div className="input-field col s12">
                            <i className="material-icons prefix">person</i>
                            {/* <label htmlFor="autorfid">Autor</label> */}
                            <input
                                type="text"
                                id="autorfid"
                                name='autor'
                                placeholder='autor'
                                value={autor}
                                onChange={handleInputChange}
                                minLength={0}
                                autoComplete='off'
                            />
                        </div>
                    }{
                        fecha_check && <div className="input-field col s12">
                            <i className="material-icons prefix">date_range</i>
                            <input
                                type="date"
                                name='fecha'
                                value={moment(fecha).format('YYYY-MM-DD')}
                                onChange={handleInputChange}
                            />
                        </div>
                    }
                </section>

                <div className="row col s12">
                    <button className="btn waves-effect waves-light" type="submit" >Buscar
                        <i className="material-icons right">search</i>
                    </button>
                  
                    <button className="btn waves-effect waves-light" type="button" onClick={handleShowAll} >Mostrar todo
                        <i className="material-icons right">all_inclusive</i>
                    </button>
                </div>
            </form>
        </div>
    }</>
}


export default Search;