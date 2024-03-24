import { Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Button, ModalRefType, Tab, Text } from '@piximind/ds-p-23';
import { FaPencilAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import InvoiceDetails from "./InvoiceDetails";
import { getUser } from "../../api/reducers/ProfileReducer";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";


export default function Profile() {


    const tabs = [
        { label: 'Informations du profil' },
        { label: 'Informations de facturation'},
      ];

    const [index,setIndex] = useState(0)
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state=>state.auth.data)
    const data = useAppSelector(state => state.profile.data);

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
 
     
    return(
        <>
          <Navbar/>
           <div className="ds-flex ds-justify-between ds-items-center ds-mt-10">
                <div className="ds-flex ds-items-center ">
                    <Button 
                        icon='https://th.bing.com/th/id/R.63d9a0f0ca26a6a3da699c91132aa03d?rik=ePEGNrFG0NR84A&pid=ImgRaw&r=0'
                        type={Type.tertiary}
                        size={Size.small}
                        text = {<IoMdArrowRoundBack /> as unknown as string}
                        className="ds-text-size-30 ds-mt-3 ds-text-primary"
                        onClick={()=>navigate('/')} />
                    <Text
                        text='Mon profil'
                        className='ds-flex ds-justify-center ds-text-primary'
                        type={TextType["type-5"]} />
                </div>
                <Button
                    type={Type.secondary}
                    text={<><FaPencilAlt className="ds-mr-2" /> Modifier</> as unknown as string}
                    className="ds-mr-90 ds-text-size-15"
                    size={Size.small}
                    onClick={handleOpenModal}
                    
                />
            </div>
          
            <Tab
            list={tabs}
            isTopTab={true}
            isClicked={true}
            selectedIndex={index}
            tabClassName="ds-m-25 ds-flex"
            onClick={(i: number)=>{setIndex(i)}}
            />

            {
                index === 0? 
                <ProfileDetails
                data={data}
                cancel={cancel}
                modalRef={modalRef}
                />
                : 
                <InvoiceDetails
                data={data.invoiceDetails}
                cancel={cancel}
                modalRef={modalRef}
                />
            }
        </>
    )
}