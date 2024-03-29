import { Modal } from "react-bootstrap";
import Props from "../../interfaces/Props";
import { Button, SizeButton, TypeButton } from "@piximind/ds-p-23";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { deleteConnector } from "../../api/reducers/ConnectorsReducer";
import { useNavigate } from "react-router-dom";

export default function DeleteConnector({show,data,handleClose}: Props) {


    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.auth.data?.token);
    const navigate = useNavigate();


    const handleDelete = async() =>{
        try {
            await dispatch(deleteConnector({id : data, token})).unwrap()
            navigate('/');
        }
        catch(error){
            console.log(error);
        }

    }


    return (
        <>
        <Modal
        size='sm'
        show={show}
        onHide={handleClose}
        centered>
       <Modal.Header closeButton>
       </Modal.Header>
        <Modal.Body className="ds-flex ds-justify-center ds-text-size-17">Veuillez supprimer ce connecteur ? </Modal.Body>
        <Modal.Footer>
            <Button
            text="Annuler"
            onClick={handleClose}
            className="ds-w-46"
            type={TypeButton.secondary}
            size={SizeButton.small}
            />
            <Button
            text="Confirmer"
            onClick={()=>handleDelete()}
            className="ds-w-46"
            size={SizeButton.small}
            />
        </Modal.Footer>
      </Modal>
        </>
    )
}