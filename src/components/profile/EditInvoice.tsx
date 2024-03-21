import { Button, Col, Input, Modal, Row, Text } from "@piximind/ds-p-23";
import { ETypesInput, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import Props from "../../interfaces/Props";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useState } from "react";
import { updateUser } from "../../api/reducers/ProfileReducer";
import ProfileInvoiceDetails from "../../interfaces/InvoiceDetails";

export default function EditInvoice ({modalRef, cancel} : Props) {
    
    const dispatch = useAppDispatch();
    const authData= useAppSelector(state => state.auth.data);
    const [changeInvoice,setChangeInvoice] = useState<ProfileInvoiceDetails>(useAppSelector(state=>state.profile.data.invoiceDetails)|| {} as ProfileInvoiceDetails)


    const handleModify = () =>{
        try {
            dispatch(updateUser({id: authData?.id ,updateUser : {invoiceDetails : changeInvoice} ,token : authData?.token})).unwrap();
            cancel();
        }
        catch(error){
            console.log(error);
        }

    }
    
    return(
        <>
        <Modal ref={modalRef} withCloseIcon={true} contentClassName="ds-flex ds-m-200" containerClassName="ds-blur0 ds-center ds-p-100">
                <Text
                    text='Changer mes informations de facturation'
                    className='ds-flex  ds-text-primary ds-ml-10'
                    type={TextType['type-5']} />
                    <hr/>
                
                <div className="ds-justify-center ds-align-center ds-w-100  ds-m-3">

                    <Row className="ds-justify-center">
                    <Col className="ds-w-45">
                    <Input 
                    label='Raison Sociale'
                    value={changeInvoice?.legalName}
                    type = {ETypesInput.text}  
                    name='legalName' 
                    autoComplete='current-legalName'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'legalName' : e.target.value})}
                    
                />
                </Col>
                 <Col className="ds-w-45">
                    <Input 
                    label='Matricule fiscale'
                    value={changeInvoice?.fiscalId}
                    type = {ETypesInput.text} 
                    name='mat' 
                    autoComplete='current-mat'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'fiscalId' : e.target.value})}
                />
                    </Col>
                    <Col className="ds-w-45">
                    <Input 
                    label='Adresse du siège social'
                    value={changeInvoice?.adress}
                    type = {ETypesInput.text} 
                    name='adr' 
                    autoComplete='current-adress'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'adress' : e.target.value})}
                />
                    </Col>
                    <Col className="ds-w-45">
                    <Input 
                    label='Pays'
                    value={changeInvoice?.country}
                    type = {ETypesInput.text} 
                    name='country' 
                    autoComplete='current-country' 
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'country' : e.target.value})}
                />
                    </Col>
                    </Row>
              
                   <Row className="ds-justify-center">
                    <Col className="ds-w-45">
                    <Input 
                    label='Ville'
                    value={changeInvoice?.city}
                    type = {ETypesInput.text} 
                    name='city' 
                    autoComplete='current-city'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'city' : e.target.value})}
                />
                    </Col>
                    <Col className="ds-w-45 ds-justify-center">
                    <Input 
                    label='Code postale'
                    value={changeInvoice?.postalCode}
                    type = {ETypesInput.text} 
                    name='postalCode' 
                    autoComplete='current-postalCode'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'postalCode' : e.target.value})}
                />
                    </Col>
                   </Row>
               
                <Row className="ds-mt-10 ds-ml-31">
                    <Col>
                    <Button
                    type={Type.secondary}
                    text='Annuler'
                    size={Size.medium} 
                    onClick={cancel}
                   />
                    </Col>
                    <Col>
                    <Button
                    type={Type.primary}
                    text='Enregistrer'
                    size={Size.medium} 
                    onClick={()=>handleModify()}
                    />
                    </Col>
                </Row>
                </div>
            </Modal>
        </>
    )
}