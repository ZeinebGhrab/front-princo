import { Modal } from "react-bootstrap";
import { Button, SizeButton, TypeButton, Text } from "@piximind/ds-p-23";
import { GiCheckMark } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import PropsDelete from "../interfaces/props/PropsDelete";

export default function ComponentDelete({show, handleClose, handleDelete, title}: PropsDelete){
    return(
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
            text={`Si vous confirmez, ${title} sera définitivement effacé`}
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