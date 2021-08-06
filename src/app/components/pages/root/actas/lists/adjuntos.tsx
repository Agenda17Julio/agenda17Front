import { useDispatch, useSelector } from "react-redux";
import { startDeleteFile, startDownloadFile } from "../../../../../actions/actas";
import { i_redux } from "../../../../../interfaces/redux";
import ModalActas from "../../../../ui/modal_actas";

const AdjuntosActas = ({ adjuntos, isOpen, setOpenModal }:{adjuntos:Array<any>,isOpen:boolean, setOpenModal:Function}) => {

    const dispatch = useDispatch();

    const { rol } = useSelector((i:i_redux) => i.auth);

    const handleDeleteFile = (acta:number, filename:string, id:number) => {
        dispatch(startDeleteFile(acta, filename, id));
        setOpenModal(false);
    }

    const handleDownloadFile = (acta:number, filename:string) => {
        dispatch(startDownloadFile(acta, filename));
        setOpenModal(false);
    }


    return <ModalActas  isOpen={ isOpen } setOpenModal={ setOpenModal } >
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Filename</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>{
                adjuntos.map(adjunto => <tr key={adjunto.id}>
                    <td>{adjunto.id}</td>
                    <td>{adjunto.filename}</td>
                    <td>
                        <i 
                            className="material-icons" 
                            style={{cursor:'pointer'}}
                            onClick={ () => handleDownloadFile(adjunto.acta, adjunto.filename) }
                            >file_download
                        </i>
                        {
                            Number(rol) === 1 && <i 
                                className="material-icons" 
                                style={{cursor:'pointer'}}
                                onClick={ () => handleDeleteFile(adjunto.acta, adjunto.filename, adjunto.id) }
                                >delete
                            </i>
                        }
                    </td>
                </tr>)
            }</tbody>
        </table>
    </ModalActas>
}

export default AdjuntosActas;