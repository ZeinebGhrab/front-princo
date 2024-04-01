import { Size,  Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Button, Text, Avatar, Col, Row, Radio,  Container} from '@piximind/ds-p-23';
import PasswordModal from "./PasswordModal";
import { useState } from "react";
import moment from "moment";
import ProfileNav from "./ProfileNav";
import { useAppSelector } from "../../api/hooks";
import userLogo from '../../assets/user.png';
import { useNavigate } from "react-router-dom";

export default function ProfileDetails() {

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const navigate = useNavigate();
    const data = useAppSelector(state => state.profile.data);
   
    return (
        <>
        <ProfileNav handleModify={()=>navigate('/EditProfileDetails')}/>
            <div className="ds-ml-100 ds-mt-50">
                <Row>
                    <Col>
                        <Avatar isActive={true} isImage={true} src={userLogo}/>
                    </Col>
                    <Col className="ds-ml-20">
                        <Container 
                        className="ds-mb-18"
                        children=
                        {
                        <> 
                        <Text
                            text='Nom et prénom'
                            className='ds-mb-5 ds-text-size-16'
                        />
                        <Text
                            text= {data?.firstName + " " + data?.lastName}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-15' 
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
                            text='Adresse mail'
                            className='ds-mb-5 ds-text-size-16'
                        />
                        <Text
                            text={data?.email}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
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
                            text='Identité de genre'
                            className='ds-mb-5 ds-text-size-16'
                        />
                        <Radio
                            label='Identité de genre'
                            name='gender'
                            value={data?.gender}
                            className="ds-ml-5  ds-text-size-15"
                            disabled={false}
                            data={[{ label: 'Homme', value: 'Homme' }, { label: 'Femme', value: 'Femme' }]}
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
                            text='Date de naissance'
                            className='ds-mb-5 ds-mt-14 ds-text-size-16'
                        />
                         <Text
                            text={moment(data?.birthDate as Date).format("DD/MM/YYYY")}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
                        />
                        </>
                    }
                    />
                       <Container
                       className="ds-mb-18"
                       children ={
                        <>
                         <Text
                            text='N° de téléphone '
                            className='ds-mb-5 ds-text-size-16'
                        />
                        <Text
                            text={data?.tel}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
                        />
                        </>
                       }
                       />
                       
                       <Container  
                       className="ds-mb-18"
                       children=
                       {
                        <>
                         <Text
                            text='Pays / Région'
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
                       children =
                       {
                        <>
                        <Text
                            text='Profil'
                            className='ds-mb-5 ds-text-size-16'
                        />
                        <Text
                            text={data?.profile}
                            className='ds-ml-5 ds-text-primary700 ds-text-size-15'
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
                    size={Size.medium} 
                    onClick={() => setShowPasswordModal(true)}
                    />
                  </Col>
                </Row>
            </div>
            <PasswordModal 
                show={showPasswordModal} 
                handleClose={() => setShowPasswordModal(false)} 
            />
        </>
    )
}