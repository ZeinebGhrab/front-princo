import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import ProfileInvoiceDetails from "../../interfaces/InvoiceDetails";
import { updateUser } from "../../api/reducers/ProfileReducer";
import Navbar from "../nav/Navbar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Button, Col, Container, Input, Text } from "@piximind/ds-p-23";
import { useNavigate } from "react-router-dom";
import { ETypesInput, Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";

export default function EditInvoice(){

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authData= useAppSelector(state => state.auth.data);
    const [changeInvoice,setChangeInvoice] = useState<ProfileInvoiceDetails>(useAppSelector(state=>state.profile.data.invoiceDetails)|| {} as ProfileInvoiceDetails)


    const handleModify = async(): Promise<void> =>{
        try {
            await dispatch(updateUser({id: authData?.id ,updateUser : {invoiceDetails : changeInvoice} ,token : authData?.token})).unwrap();
            navigate('/invoiceDetails')
        }
        catch(error){
            console.log(error);
        }

    }
    
    return(
        <>
        <Navbar/>
        <Container
        children = {
            <div className="ds-flex ds-align-center ds-mt-40">
                <Button
                text = {<IoIosArrowRoundBack /> as unknown as string}
                type = {Type.tertiary}
                className="ds-text-size-55 ds-ml-50"
                style = {{color : '#003D42'}}
                size = {Size.small}
                onClick={()=>navigate('/invoiceDetails')}
                />
                <Text
                text = "Modifier mes informations de facturation"
                className="ds-text-size-30"
                style = {{color : '#003D42'}}
                />
            </div>
        }
        />
         <Col className="ds-ml-125 ds-mt-50 ds-w-30 ds-mb-15">
        <Input 
                    label='Raison Sociale'
                    value={changeInvoice?.legalName}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15' 
                    name='legalName' 
                    autoComplete='current-legalName'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'legalName' : e.target.value})}
                    
                />
                 <Input 
                    label='Matricule fiscale'
                    value={changeInvoice?.fiscalId}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='mat' 
                    autoComplete='current-mat'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'fiscalId' : e.target.value})}
                />
                 <Input 
                    label='Adresse du siège social'
                    value={changeInvoice?.adress}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='adr' 
                    autoComplete='current-adress'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'adress' : e.target.value})}
                />
                 <Input 
                    label='Pays'
                    value={changeInvoice?.country}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='country' 
                    autoComplete='current-country' 
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'country' : e.target.value})}
                />
                 <Input 
                    label='Ville'
                    value={changeInvoice?.city}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='city' 
                    autoComplete='current-city'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'city' : e.target.value})}
                />
                 <Input 
                    label='Code postale'
                    value={changeInvoice?.postalCode}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-33'
                    name='postalCode' 
                    autoComplete='current-postalCode'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeInvoice({...changeInvoice, 'postalCode' : e.target.value})}
                />
                    <Button
                    type={Type.primary}
                    text='Enregistrer'
                    size={Size.medium}
                    className="ds-w-100"
                    onClick={()=>handleModify()}
                    />
        </Col>
        </>
    )
}