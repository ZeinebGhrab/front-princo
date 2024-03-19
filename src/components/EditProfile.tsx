import { Button, Col, Input, Modal, Radio, Row, Text } from "@piximind/ds-p-23";
import { ETypesInput, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import Props from "../interfaces/Props";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useState } from "react";
import User from "../interfaces/User";
import { Validation } from "@piximind/validation";
import { updateUser } from "../redux/reducers/ProfileReducer";
import { useNavigate } from "react-router-dom";

export default function EditProfile ({modalRef, data, cancel} : Props) {

    const [changeUser,setChangeUser] = useState<User>(data as User);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.data?.accessToken);
    const validation = new Validation();
    const navigate = useNavigate();

    const handleModify = () =>{
        if(!validation.isMail(changeUser.email) || validation.isEmpty(changeUser.firstName) || validation.isEmpty(changeUser.lastName))
        {
            return;
        }
        try {
            dispatch(updateUser({user: changeUser, token})).unwrap();
            navigate('/profile')
        }
        catch(error) {
            console.log('error')
        }
     }



    return(
        <>
        <Modal ref={modalRef} withCloseIcon={true} contentClassName="ds-flex ds-m-200" containerClassName="ds-blur0 ds-center ds-p-20">
                <Text
                    text='Changer mes informations de profil'
                    className='ds-flex ds-mb-2 ds-text-primary ds-ml-10 '
                    type={TextType['type-5']} />
                <hr/>
                <div className=" ds-w-100  ds-m-3">
                    <Row className="ds-justify-center">
                    <Col className="ds-w-45">
                    <Input 
                    label='Nom'
                    value ={changeUser?.lastName}
                    type = {ETypesInput.text}  
                    name='lastName' 
                    autoComplete='current-lastName'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'lastName' : e.target.value})}
                />
                </Col>
                <Col className="ds-w-45">
                <Input 
                    label='Prénom'
                    value = {changeUser?.firstName}
                    type = {ETypesInput.text} 
                    name='firstName' 
                    autoComplete='current-firstName'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'firstName' : e.target.value})}
                />
            </Col>
                </Row>
                <Row className="ds-justify-center">
                <Col className="ds-w-45">
                    <Input 
                    label='Adresse mail'
                    value ={changeUser?.email}
                    type = {ETypesInput.text} 
                    name='email' 
                    autoComplete='current-email'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'email' : e.target.value})}
                />
                </Col>
                <Col className="ds-w-45">
                <Input 
                    label='tel'
                    value ={changeUser?.tel}
                    type = {ETypesInput.text} 
                    name='tel' 
                    autoComplete='current-tel'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'tel' : e.target.value})}
                />
                </Col>
                </Row>
            
          <Row className="ds-justify-center ds-mb-16 ds-mt-4">
                <Col className="ds-w-45">
                    <label className="ds-text-weight400">Date de naissance</label>
                 
            <input 
                    className="default-input ds-text-dark ds-px-12 ds-h-85 ds-bg-white ds-text-weight400 ds-w-100 ds-borad-8"
                    value ={changeUser?.birthDate}
                    type = 'date'
                    name='birthDate' 
                    autoComplete='current-birthDate'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'birthDate' : e.target.value})}
                />

  
                </Col>
            <Col className="ds-w-45">
            <label className="ds-text-weight400 ds-mb-8">Identité de genre</label>
            <Radio
                label='Identité de genre'
                name='gender'
                value ={changeUser?.gender}
                isVertical = {false}
                disabled={false}
                data={[{ label: 'Homme', value: 'Homme' }, { label: 'Femme', value: 'Femme' }]}
                onClick={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'gender' : e.target.value})}
            />
            </Col>
          </Row>

                    <Row className="ds-justify-center">
                    <Col className="ds-w-45">
                    <Input 
                    label='Pays / Région'
                    value ={changeUser?.country}
                    type = {ETypesInput.text} 
                    name='country' 
                    autoComplete='current-country'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'country' : e.target.value})}
                />
                 </Col>
                <Col className="ds-w-45">
                    <Input 
                    label='Profil'
                    value ={changeUser?.profile}
                    type = {ETypesInput.text} 
                    name='profile' 
                    autoComplete='current-profile'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'profile' : e.target.value})}
                />
                </Col>      
                    </Row>
                <Row className="ds-ml-31 ds-mt-14 ">
                    <Col>
                    <Button
                    type={Type.secondary}
                    text='Annuler'
                    size={Size.medium} 
                    onClick={cancel}
                   />
                   </Col>
                    <Col>
                    <Button
                    type={Type.primary}
                    text='Enregistrer'
                    size={Size.medium} 
                    onClick={()=>handleModify()}
                    />
                    </Col>
                </Row>
                </div>
            </Modal>
        </>
    )
}