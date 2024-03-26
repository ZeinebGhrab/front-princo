import { TextType, Text, Col, Container, ModalRefType } from "@piximind/ds-p-23";
import EditInvoice from "./EditInvoice";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useCallback, useEffect, useRef } from "react";
import { getUser } from "../../api/reducers/ProfileReducer";
import ProfileNav from "./ProfileNav";




export default function InvoiceDetails ()  {
    
      
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state=>state.auth.data)
    const data = useAppSelector(state => state.profile.data.invoiceDetails);

    const modalRef = useRef<ModalRefType>(null);


    const fetchData =useCallback(()=> {
        try{
            dispatch(getUser({id: dataAuth?.id , token: dataAuth?.token})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    },[dataAuth?.id, dataAuth?.token, dispatch]);


    const handleOpenModal = () => {
        if (modalRef .current) {
            modalRef .current.onOpen();
        }
      };
    
    const cancel =()=>{
        modalRef.current?.onClose();
    }

    
    useEffect(()=>{
        fetchData()
    },[fetchData, data, dispatch])




    return (
        <>
        <ProfileNav handleOpenModal={handleOpenModal}/>
        <Col className="ds-ml-125 ds-mt-50">
            <Container
            className="ds-mb-11"
            children = 
            {
                <>
                <Text
                   text='Raison Sociale'
                   className='ds-mb-5 ds-text-size-15'
                 />
                <Text
                   text={data?.legalName}
                   className='ds-mb-5 ds-ml-5 ds-text-primary700 ds-text-size-14'
                 />
                </>
            }
            />
            <Container
            className="ds-mb-10"
            children = 
            {
            <>
            <Text
            text='Matricule fiscale'
            className='ds-mb-5 ds-text-size-15'
            type={TextType["subtitle-1"]}
            />
            <Text
            text={data?.fiscalId}
            className='ds-ml-5 ds-text-primary700 ds-text-size-14'
            />
            </>
            }
            />
           <Container
           className="ds-mb-11"
           children = {
            <>
            <Text
            text='Adresse du siège social'
            className='ds-mb-5 ds-text-size-15'
        />
        <Text
            text={data?.adress}
            className='ds-ml-5 ds-text-primary700 ds-text-size-14'
        />
            </>
           }
           />
           <Container
           className="ds-mb-11"
           children = {
            <>
             <Text
            text='Pays'
            className='ds-mb-5 ds-text-size-15'
            />
        <Text
            text={data?.country}
            className='ds-ml-5 ds-text-primary700 ds-text-size-14'
        />
            </>
           }
           />
           <Container
           className="ds-mb-11"
           children = {
            <>
            <Text
            text='Ville'
            className='ds-mb-5 ds-text-size-15'
            />
        <Text
            text={data?.city}
            className='ds-ml-5 ds-text-primary700 ds-text-size-14'
        />
            </>
           }
           />
           <Container
           className="ds-mb-11"
           children = {
            <>
            <Text
            text='Code postale'
            className='ds-mb-5 ds-text-size-15'
        />
        <Text
            text={data?.postalCode}
            className='ds-ml-5 ds-text-primary700 ds-text-size-14 '
        />
            </>
           }
           />
        </Col>
        <EditInvoice
                modalRef={modalRef}
                cancel={cancel}
        />
        </>
    )
}