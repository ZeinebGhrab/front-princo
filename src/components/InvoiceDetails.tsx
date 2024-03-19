import { TextType, Text, Col, ModalRefType } from "@piximind/ds-p-23";
import Nav from "./Nav";
import NavBar from "./NavBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useCallback, useEffect, useRef } from "react";
import { getInvoiceDetails } from "../redux/reducers/InvoiceDetailsReducer";
import EditInvoice from "./EditInvoice";

export default function InvoiceDetails ()  {
    
    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.auth.data?.accessToken)
    const id = useAppSelector(state=>state.auth.data?._id)
    const data = useAppSelector(state => state.invoice.data)

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
            dispatch(getInvoiceDetails({id: id , token: token})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    },[dispatch, id, token]);

 
    useEffect(()=>{
        fetchData()
    },[fetchData])
    
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
            text={data.legalName}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Matricule fiscale'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
            />
        <Text
            text={data.mat}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Adresse du siège social'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
        />
        <Text
            text={data.adr}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Pays'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
            />
        <Text
            text={data.country}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Ville'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
            />
        <Text
            text={data.city}
            className='ds-mb-5 ds-ml-5'
            type={TextType["subtitle-1"]}
        />
        <Text
            text='Code postale'
            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
            type={TextType["subtitle-1"]}
        />
        <Text
            text={data.postalCode}
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