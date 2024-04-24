import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../api/hooks";
import ProfileInvoiceDetails from "../../../interfaces/user/InvoiceDetails";
import { updateUser } from "../../../api/reducers/ProfileReducer";
import NavApp from "../../nav/NavApp";
import { Button, Col, Input } from "@piximind/ds-p-23";
import { useNavigate } from "react-router-dom";
import { ETypesInput, Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import ComponentTitle from "../../../customComponent/ComponentTitle";
import { InvoiceDetailsFields } from "./helpers/InvoiceDetailsFields";

export default function EditInvoice(){

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authData= useAppSelector(state => state.authentication.data);
    const [changeInvoice,setChangeInvoice] = useState<ProfileInvoiceDetails>(useAppSelector(state=>state.profile.data.invoiceDetails)|| {} as ProfileInvoiceDetails);
    const fields = InvoiceDetailsFields(changeInvoice);

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
        <NavApp/>
            <div className="ds-flex ds-align-center ds-mt-40">
            <ComponentTitle title="Mon profil" navigatePage='/invoiceDetails'/>
            </div>
         <Col className="ds-ml-125 ds-mt-30 ds-w-30 ds-mb-15">
         {fields.map((field, index) => (
            <Input
              key={index}
              label={field.label}
              value={field.value}
              type={ETypesInput.text}
              containerClassName= 'ds-mb-15'
              autoComplete={`current-${field.name}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangeInvoice({ ...changeInvoice, [field.name]: e.target.value })}
            />
         ))}
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