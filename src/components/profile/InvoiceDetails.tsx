import { Text, Col, Container } from "@piximind/ds-p-23";
import { useAppSelector } from "../../api/hooks";
import ProfileNav from "./ProfileNav";
import { useNavigate } from "react-router-dom";

export default function InvoiceDetails ()  {
    
    const data = useAppSelector(state => state.profile.data.invoiceDetails);
    const navigate = useNavigate();

    return (
        <>
        <ProfileNav handleModify={()=>navigate('/editInvoiceDetails')}/>
        <Col className="ds-ml-125 ds-mt-50">
            <Container
            className="ds-mb-18"
            children = 
            {
                <>
                <Text
                   text='Raison Sociale'
                   className='ds-mb-5 ds-text-size-16'
                 />
                <Text
                   text={data?.legalName}
                   className='ds-mb-5 ds-ml-5 ds-text-primary700 ds-text-size-15'
                 />
                </>
            }
            />
            <Container
            className="ds-mb-18"
            children = 
            {
            <>
            <Text
            text='Matricule fiscale'
            className='ds-mb-5 ds-text-size-16'
            />
            <Text
            text={data?.fiscalId}
            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
            />
            </>
            }
            />
           <Container
           className="ds-mb-18"
           children = {
            <>
            <Text
            text='Adresse du siège social'
            className='ds-mb-5 ds-text-size-16'
        />
        <Text
            text={data?.adress}
            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
        />
            </>
           }
           />
           <Container
           className="ds-mb-18"
           children = {
            <>
             <Text
            text='Pays'
            className='ds-mb-5 ds-text-size-16'
            />
        <Text
            text={data?.country}
            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
        />
            </>
           }
           />
           <Container
           className="ds-mb-18"
           children = {
            <>
            <Text
            text='Ville'
            className='ds-mb-5 ds-text-size-16'
            />
        <Text
            text={data?.city}
            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
        />
            </>
           }
           />
           <Container
           className="ds-mb-18"
           children = {
            <>
            <Text
            text='Code postale'
            className='ds-mb-5 ds-text-size-16'
        />
        <Text
            text={data?.postalCode}
            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
        />
            </>
           }
           />
        </Col>
        </>
    )
}