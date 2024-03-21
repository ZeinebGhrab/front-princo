import { TextType, Text, Col, ModalRefType } from "@piximind/ds-p-23";
import Nav from "../nav/Nav";
import NavBar from "../nav/NavBar";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useCallback, useEffect, useRef } from "react";
import EditInvoice from "./EditInvoice";
import { getUser } from "../../api/reducers/ProfileReducer";

export default function InvoiceDetails ()  {
    
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state=>state.auth.data)
    const data = useAppSelector(state => state.profile.data.invoiceDetails);

    const modalRef = useRef<ModalRefType>(null);
    const handleOpenModal = () => {
        if (modalRef .current) {
            modalRef .current.onOpen();
        }
      };
    
    const cancel =()=>{
        modalRef.current?.onClose();
    }

    const fetchData =useCallback(()=> {
        try{
            dispatch(getUser({id: dataAuth?.id , token: dataAuth?.token})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    },[dataAuth?.id, dataAuth?.token, dispatch]);

 
    useEffect(()=>{
        fetchData()
    },[fetchData, data])
    
    return (
        <>
        <NavBar/>
        <Nav handleModify={handleOpenModal}/>
        <Col className="ds-ml-100 ds-mt-20">
        <Text
            text='Raison Sociale'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
            />
        <Text
            text={data?.legalName}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Matricule fiscale'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
            />
        <Text
            text={data?.fiscalId}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Adresse du siège social'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
        />
        <Text
            text={data?.adress}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Pays'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
            />
        <Text
            text={data?.country}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Ville'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
            />
        <Text
            text={data?.city}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Code postale'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
        />
        <Text
            text={data?.postalCode}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        </Col>
        <EditInvoice
                modalRef={modalRef}
                cancel={cancel}
        />
        </>
    )
}