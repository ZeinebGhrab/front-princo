import NavBar from "../nav/NavBar";
import { Size,  TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Button, Text, Avatar, Col, Row, Radio,  ModalRefType,} from '@piximind/ds-p-23';
import {  useCallback, useEffect, useRef } from "react";
import Nav from "../nav/Nav";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getUser } from "../../api/reducers/ProfileReducer";
import PasswordModal from "./PasswordModal";
import EditProfile from "./EditProfile";

export default function ProfileDetails() {

    const modalRef = useRef<ModalRefType>(null);
    const modalEditRef = useRef<ModalRefType>(null);
  
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state=>state.auth.data)
    const data = useAppSelector(state => state.profile.data)

    const fetchData =useCallback(async ()=> {
        try{
            await dispatch(getUser({id: dataAuth?.id , token: dataAuth?.token})).unwrap();
        }
        catch(error) {
            console.log(error);
        }
    },[dataAuth?.id, dataAuth?.token, dispatch])

    const handleOpenModal = (ref : React.RefObject<ModalRefType>) => {
        if (ref.current) {
            ref.current.onOpen();
        }
      };
    
    const cancel =(ref : React.RefObject<ModalRefType>)=>{
        ref.current?.onClose();
    }

    useEffect(()=>{
        fetchData()
    },[fetchData, dispatch, data])


    return (
        <>
            <NavBar/>
            <Nav handleModify={()=>handleOpenModal(modalEditRef)}/>
            <div className="ds-ml-100 ds-mt-10">
                <Row>
                    <Col>
                        <Avatar isActive={true} isImage={true} src='https://storage.googleapis.com/uscimages/account.png' />
                    </Col>
                    <Col className="ds-ml-20">
                        <Text
                            text='Nom et Prénom'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-16'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text= {data.firstName + " " + data.lastName}
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Adresse Mail'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-16'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text={data.email}
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Identité de genre'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-16'
                            type={TextType["subtitle-1"]}
                        />
                        <Radio
                            label='Identité de genre'
                            name='gender'
                            value={data.gender}
                            className="ds-ml-5 ds-text-primary500 ds-text-size-16"
                            disabled={false}
                            data={[{ label: 'Homme', value: 'Homme' }, { label: 'Femme', value: 'Femme' }]}
                        />
                        <Text
                            text='Date de naissance'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-16'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text={data.birthDate}
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='N° de téléphone '
                            className='ds-mb-5 ds-text-primary500 ds-text-size-16'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text={data.tel}
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Pays / Région'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-16'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text={data.country}
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Profil'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-16'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text={data.profile}
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                    </Col>
                </Row>
                <Row className="ds-mt-10">
                  <Button 
                    text='Changer mon mot de passe'
                    type={Type.secondary}
                    size={Size.small} 
                    onClick={() => handleOpenModal(modalRef)}
                    />
                </Row>
            </div>
            <PasswordModal 
                modalRef={modalRef}
                cancel={()=>cancel(modalRef)}
            />
            <EditProfile
                modalRef={modalEditRef}
                cancel={()=>cancel(modalEditRef)}
            />
        </>
    )
}