import { Size,  Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Button, Text, Avatar, Col, Row, Radio,  Container} from '@piximind/ds-p-23';
import PasswordModal from "./PasswordModal";
import { useState } from "react";
import ProfileNav from "../ProfileNav";
import { useAppSelector } from "../../../api/hooks";
import userLogo from "../../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { profileDetailsFields } from "./helpers/ProfileDetailsFields";
import ProfileField from "../../../interfaces/ProfileFields";

export default function ProfileDetails() {

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const navigate = useNavigate();
    const data = useAppSelector(state => state.profile.data);
    const fields: ProfileField[] = profileDetailsFields(data, false);
   
    return (
        <>
        <ProfileNav handleModify={()=>navigate('/EditProfileDetails')}/>
            <div className="ds-ml-100 ds-mt-50">
                <Row>
                    <Col>
                        <Avatar isActive={true} isImage={true} src={userLogo}/>
                    </Col>
                    <Col className="ds-ml-20">
                {fields.map((field: ProfileField, index: number) => (
                 <Container key={index} className="ds-mb-18">
                     <>
                        <Text
                            text={field.label}
                            className='ds-mb-5 ds-text-size-16'
                            style={{ color: '#195054' }}
                        />
                        {field.type === 'radio' ? (
                <Radio
                  label={field.label}
                  name='gender'
                  value={field.value as string}
                  className={`ds-ml-5 ds-text-size-15 ${field.className}`}
                  data={field.options}
                  disabled={false}
                />
              ) : (
                <Text
                  text={field.value as string}
                  className={`ds-ml-5 ds-text-primary700 ${field.className}`}
                />        
              )}
                     </>
                 </Container>
                ))}
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