import { Button, Col, Datepicker, Input, Modal, Radio, Row, Text } from "@piximind/ds-p-23";
import { ETypesInput, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import Props from "../../interfaces/Props";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useState } from "react";
import User from "../../interfaces/User";
import { Validation } from "@piximind/validation";
import { updateUser } from "../../api/reducers/ProfileReducer";
import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";

export default function EditProfile ({modalRef, cancel} : Props) {

    const [changeUser,setChangeUser] = useState<User>(useAppSelector(state => state.profile.data) || {} as User );
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state => state.auth.data);
    const validation = new Validation();

    const handleModify = async() =>{
        
        if(!validation.isMail(changeUser.email) || validation.isEmpty(changeUser.firstName) || validation.isEmpty(changeUser.lastName))
        {
            return;
        }
        try {
            
            await dispatch(updateUser({id : dataAuth?.id , updateUser: changeUser, token : dataAuth?.token})).unwrap();
            cancel()
        }
        catch(error) {
            console.log('error');
        }
     }

    return(
        <>
        <Modal ref={modalRef} withCloseIcon={true} contentClassName=" ds-m-200" containerClassName="ds-center">
                
                <Text
                    text='Changer mes informations de profil'
                    className='ds-text-primary'
                    type={TextType['type-5']} />
                <hr/>
                <div className="ds-m-3">
                    <Row className="ds-justify-center">
                    <Col className="ds-w-45">
                    <Input 
                    label='Nom'
                    value ={changeUser?.lastName}
                    type = {ETypesInput.text}  
                    containerClassName= 'ds-mb-15'
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
                    containerClassName= 'ds-mb-15'
                    name='firstName' 
                    autoComplete='current-firstName'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'firstName' : e.target.value})}
                />
            </Col>
                </Row>
                <Row className="ds-justify-center ds-mb-7">
                <Col className="ds-w-45">
                    <Input 
                    label='Adresse mail'
                    value ={changeUser?.email}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='email' 
                    autoComplete='current-email'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'email' : e.target.value})}
                />
                </Col>
                <Col className="ds-w-45">      
                <Input 
                    label='N° de téléphone'
                    value ={changeUser?.tel}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='tel' 
                    autoComplete='current-tel'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'tel' : e.target.value})}
                />
                </Col>
                </Row>
            
          <Row className="ds-justify-center">
                <Col className="ds-w-45">
                    <label className="ds-text-weight400">Date de naissance</label>    
                <Datepicker
                 placeholder="Date de naissance"
                 containerClassName= 'ds-mb-15'
                 value={changeUser?.birthDate  instanceof Date ? changeUser.birthDate : null}
                 onChange={(e : Date | IChangeDatePicker)=>setChangeUser({...changeUser, 'birthDate' : e})}
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
                    containerClassName= 'ds-mb-15'
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
                    containerClassName= 'ds-mb-15'
                    name='profile' 
                    autoComplete='current-profile'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'profile' : e.target.value})}
                />
                </Col>      
                    </Row>
                <Row className="ds-justify-center ds-mt-10">
                    <Col className="ds-w-45">
                    <Button
                    type={Type.secondary}
                    text='Annuler'
                    size={Size.medium} 
                    className='ds-w-100'
                    onClick={cancel}
                   />
                   </Col>
                    <Col className="ds-w-45">
                    <Button
                    type={Type.primary}
                    text='Enregistrer'
                    size={Size.medium} 
                    className='ds-w-100'
                    onClick={()=>handleModify()}
                    />
                    </Col>
                </Row>
                </div>
            </Modal>
        </>
    )
}