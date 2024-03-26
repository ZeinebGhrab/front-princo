import { Size,  Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Button, Text, Avatar, Col, Row, Radio,  ModalRefType, Container} from '@piximind/ds-p-23';
import PasswordModal from "./PasswordModal";
import EditProfile from "./EditProfile";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import ProfileNav from "./ProfileNav";
import { getUser } from "../../api/reducers/ProfileReducer";
import { useAppDispatch, useAppSelector } from "../../api/hooks";


export default function ProfileDetails() {

    const [showPasswordModal, setShowPasswordModal] = useState(false);
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
 

   
    return (
        <>
        <ProfileNav handleOpenModal={handleOpenModal}/>
            <div className="ds-ml-100 ds-mt-50">
                <Row>
                    <Col>
                        <Avatar isActive={true} isImage={true} src='https://storage.googleapis.com/uscimages/account.png' />
                    </Col>
                    <Col className="ds-ml-20">
                        <Container 
                        children=
                        {
                        <> 
                        <Text
                            text='Nom et prénom'
                            className='ds-mb-5 ds-text-size-15'
                        />
                        <Text
                            text= {data?.firstName + " " + data?.lastName}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-14' 
                        />
                        </>
                    }
                    />
                    <Container 
                    children =
                    {
                        <>
                        <Text
                            text='Adresse mail'
                            className='ds-mb-5 ds-text-size-15'
                        />
                        <Text
                            text={data?.email}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-14'
                        />
                        </>
                    }
                    />
                    <Container
                    children = 
                    {
                        <>
                        <Text
                            text='Identité de genre'
                            className='ds-mb-5 ds-text-size-15'
                        />
                        <Radio
                            label='Identité de genre'
                            name='gender'
                            value={data?.gender}
                            className="ds-ml-5"
                            disabled={false}
                            data={[{ label: 'Homme', value: 'Homme' }, { label: 'Femme', value: 'Femme' }]}
                        />
                        </>
                    }
                    />
                    <Container 
                    children = 
                    {
                        <>
                         <Text
                            text='Date de naissance'
                            className='ds-mb-5 ds-mt-14 ds-text-size-15'
                        />
                         <Text
                            text={moment(data?.birthDate as Date).format("DD/MM/YYYY")}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-14'
                        />
                        </>
                    }
                    />
                       <Container
                       children ={
                        <>
                         <Text
                            text='N° de téléphone '
                            className='ds-mb-5 ds-text-size-15'
                        />
                        <Text
                            text={data?.tel}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-14'
                        />
                        </>
                       }
                       />
                       
                       <Container  
                       children=
                       {
                        <>
                         <Text
                            text='Pays / Région'
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
                       children =
                       {
                        <>
                        <Text
                            text='Profil'
                            className='ds-mb-5 ds-text-size-15'
                        />
                        <Text
                            text={data?.profile}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-14'
                        />
                        </>
                       }
                       />
                    </Col>
                </Row>
                <Row>
                  <Col>
                  <Button 
                    text='Changer mon mot de passe'
                    className="ds-mt-12 ds-mb-12"
                    type={Type.secondary}
                    size={Size.small} 
                    onClick={() => setShowPasswordModal(true)}
                    />
                  </Col>
                </Row>
            </div>
            <PasswordModal 
                show={showPasswordModal} 
                handleClose={() => setShowPasswordModal(false)} 
            />
            <EditProfile
                modalRef={modalRef}
                cancel={()=>cancel()}
            />
        </>
    )
}