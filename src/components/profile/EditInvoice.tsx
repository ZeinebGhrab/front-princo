import { Button, Col, Input, Row, Text } from "@piximind/ds-p-23";
import { ETypesInput, Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import Props from "../../interfaces/Props";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useState } from "react";
import { updateUser } from "../../api/reducers/ProfileReducer";
import ProfileInvoiceDetails from "../../interfaces/InvoiceDetails";
import { Modal } from "react-bootstrap";

export default function EditInvoice ({show, handleClose} : Props) {
    
    const dispatch = useAppDispatch();
    const authData= useAppSelector(state => state.auth.data);
    const [changeInvoice,setChangeInvoice] = useState<ProfileInvoiceDetails>(useAppSelector(state=>state.profile.data.invoiceDetails)|| {} as ProfileInvoiceDetails)


    const handleModify = async(): Promise<void> =>{
        try {
            await dispatch(updateUser({id: authData?.id ,updateUser : {invoiceDetails : changeInvoice} ,token : authData?.token})).unwrap();
            handleClose();
        }
        catch(error){
            console.log(error);
        }

    }
    
    return(
        <>
         <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title >
                    <Text
                         text='Changer mes informations de facturation'
                         className='ds-mb-2 ds-text-primary'
                     />
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                    <Col className="ds-w-50">
                    <Input 
                    label='Raison Sociale'
                    value={changeInvoice?.legalName}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15' 
                    name='legalName' 
                    autoComplete='current-legalName'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'legalName' : e.target.value})}
                    
                />
                </Col>
                 <Col className="ds-w-50">
                    <Input 
                    label='Matricule fiscale'
                    value={changeInvoice?.fiscalId}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='mat' 
                    autoComplete='current-mat'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'fiscalId' : e.target.value})}
                />
                    </Col>
                 </Row>
                 <Row>
                    <Col className="ds-w-50">
                    <Input 
                    label='Adresse du siège social'
                    value={changeInvoice?.adress}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='adr' 
                    autoComplete='current-adress'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'adress' : e.target.value})}
                />
                    </Col>
                    <Col className="ds-w-50">
                    <Input 
                    label='Pays'
                    value={changeInvoice?.country}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='country' 
                    autoComplete='current-country' 
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'country' : e.target.value})}
                />
                    </Col>
                    </Row>
                   <Row>
                    <Col className="ds-w-50">
                    <Input 
                    label='Ville'
                    value={changeInvoice?.city}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='city' 
                    autoComplete='current-city'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'city' : e.target.value})}
                />
                    </Col>
                    <Col className="ds-w-50">
                    <Input 
                    label='Code postale'
                    value={changeInvoice?.postalCode}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='postalCode' 
                    autoComplete='current-postalCode'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'postalCode' : e.target.value})}
                />
                    </Col>
                   </Row>
            </Modal.Body>
            <Modal.Footer>
                    <Button
                    type={Type.secondary}
                    text='Annuler'
                    size={Size.medium} 
                    className='ds-w-48'
                    onClick={handleClose}
                   />
                    <Button
                    type={Type.primary}
                    text='Enregistrer'
                    size={Size.medium}
                    className='ds-w-48' 
                    onClick={()=>handleModify()}
                    />
            </Modal.Footer>
        </Modal>
        </>
    )
}
