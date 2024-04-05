import { Modal } from "react-bootstrap";
import Props from "../../interfaces/Props";
import { Button, SizeButton, TypeButton, Text } from "@piximind/ds-p-23";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { deleteConnector } from "../../api/reducers/ConnectorsReducer";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function DeleteConnector({show,data,handleClose}: Props) {


    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.authentication.data?.token);
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
        show={show}
        onHide={handleClose}
        centered>
       <Modal.Header closeButton>
       </Modal.Header>
        <Modal.Body>
            <b className="ds-flex ds-center ds-text-size-21 ds-mb-20">
                Confirmez-vous la suppression ?
            </b>
            <Text
            text='Si vous confirmez, le connecteur sera définitivement effacé'
            className="ds-flex ds-center ds-text-size-17"
            />
        </Modal.Body>
        <Modal.Footer className="ds-flex ds-center">
            <Button
            text={<><IoMdClose className="ds-mr-3 ds-text-size-20"/> Annuler</> as unknown as string}
            onClick={handleClose}
            className="ds-w-45 ds-mr-7"
            type={TypeButton.secondary}
            size={SizeButton.medium}
            />
            <Button
            text={<><GiCheckMark className="ds-mr-3 ds-text-size-20"/>Confirmer</> as unknown as string}
            onClick={()=>handleDelete()}
            className="ds-w-45"
            size={SizeButton.medium}
            />
        </Modal.Footer>
      </Modal>
        </>
    )
}