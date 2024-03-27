import { Button, Col, Datepicker, EDisplayType, Input,  NumberInput, Radio, Row, Text } from "@piximind/ds-p-23";
import { ESizeInput, ETypesInput, Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import Props from "../../interfaces/Props";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { useState } from "react";
import User from "../../interfaces/User";
import { Validation } from "@piximind/validation";
import { updateUser } from "../../api/reducers/ProfileReducer";
import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";
import { Modal } from "react-bootstrap";

export default function EditProfile ({show, handleClose} : Props) {

    const [changeUser,setChangeUser] = useState<User>(useAppSelector(state => state.profile.data) || {} as User );
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state => state.auth.data);
    const validation = new Validation();

    const handleModify = async() =>{
        
        console.log(changeUser)
        if(!validation.isMail(changeUser.email) || validation.isEmpty(changeUser.firstName) || validation.isEmpty(changeUser.lastName))
        {
            return;
        }
        try {
            
            await dispatch(updateUser({id : dataAuth?.id , updateUser: changeUser, token : dataAuth?.token})).unwrap();
            handleClose()
        }
        catch(error) {
            console.log('error');
        }
     }

    return(
        <>
         <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title >
                    <Text
                         text='Changer mes informations de profil'
                         className='ds-mb-2 ds-text-primary'
                     />
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                    <Col className="ds-w-50">
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
                <Col className="ds-w-50">
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
                <Row>
                <Col className="ds-w-50">
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
                <Col className="ds-w-50">   
                <NumberInput 
                    label= 'N° de téléphone'
                    value ={changeUser?.tel}
                    className= 'ds-w-100 ds-h-50'
                    containerClassName = 'ds-w-100 ds-h-100'
                    allowNegative={false}
                    displayType={ EDisplayType.input}
                    onChange={(e: { value: string })=>setChangeUser({...changeUser, 'tel' : e.value})}
                 />   
                </Col>
                </Row>
          <Row>
                <Col className="ds-w-50">
                    <label className="ds-text-weight400">Date de naissance</label>    
                <Datepicker
                 placeholder="Date de naissance"
                 containerClassName= 'ds-mb-15'
                 inputSize={ESizeInput.medium}
                 isRange={false}
                 value={typeof changeUser.birthDate === 'string' ? new Date(changeUser.birthDate) : null }
                 onChange={(e : Date | IChangeDatePicker)=>setChangeUser({...changeUser, 'birthDate' : e})}
                />
                </Col>
            <Col className="ds-w-50">
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

                <Row>
                    <Col className="ds-w-50">
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
                <Col className="ds-w-50">
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
            </Modal.Body>
            <Modal.Footer>
                    <Button
                    type={Type.secondary}
                    text='Annuler'
                    size={Size.medium} 
                    className='ds-w-48'
                    onClick={handleClose}
                   />
                    <Button
                    type={Type.primary}
                    text='Enregistrer'
                    size={Size.medium}
                    className='ds-w-48' 
                    onClick={()=>handleModify()}
                    />
            </Modal.Footer>
        </Modal>
        </>
    )
}