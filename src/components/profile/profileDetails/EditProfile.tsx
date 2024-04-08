import { Avatar, Button, Col, Container, Datepicker, EDisplayType, Input,  NumberInput, Radio, Row, Text } from "@piximind/ds-p-23";
import { ESizeInput, ETypesInput, Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useAppDispatch, useAppSelector } from "../../../api/hooks";
import { useState } from "react";
import User from "../../../interfaces/user/User";
import { Validation } from "@piximind/validation";
import { updateUser } from "../../../api/reducers/ProfileReducer";
import userLogo from '../../../assets/user.png';
import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navbar from "../../nav/Navbar";


export default function EditProfile(){

    const navigate = useNavigate();
    const [changeUser,setChangeUser] = useState<User>(useAppSelector(state => state.profile.data) || {} as User );
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state => state.authentication.data);
    const validation = new Validation();

    const handleModify = async() =>{
        
        console.log(changeUser)
        if(!validation.isMail(changeUser.email) || validation.isEmpty(changeUser.firstName) || validation.isEmpty(changeUser.lastName))
        {
            return;
        }
        try {  
            await dispatch(updateUser({id : dataAuth?.id , updateUser: changeUser, token : dataAuth?.token})).unwrap();
            navigate('/profileDetails');
        }
        catch(error) {
            console.log('error');
        }
     }



    return(
        <>
        <Navbar/>
        <Container
        children = {
            <div className="ds-flex ds-align-center ds-mt-40">
                <Button
                text = {<IoIosArrowRoundBack /> as unknown as string}
                type = {Type.tertiary}
                className="ds-text-size-55 ds-ml-50"
                style = {{color : '#003D42'}}
                size = {Size.small}
                onClick={()=>navigate('/profileDetails')}
                />
                <Text
                text = "Modifier mes informations du profil"
                className="ds-text-size-30"
                style = {{color : '#003D42'}}
                />
            </div>
        }
        />
        <div className="ds-ml-100 ds-mt-50 ds-mb-50">
                <Row>
                    <Col>
                        <Avatar isActive={true} isImage={true} src={userLogo}/>
                    </Col>
                    <Col className="ds-ml-20 ds-w-30">
                    <Input 
                    label='Nom'
                    value ={changeUser?.lastName}
                    type = {ETypesInput.text}  
                    containerClassName= 'ds-mb-15'
                    name='lastName' 
                    autoComplete='current-lastName'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'lastName' : e.target.value})}
                />
                <Input 
                    label='Prénom'
                    value = {changeUser?.firstName}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='firstName' 
                    autoComplete='current-firstName'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'firstName' : e.target.value})}
                />
                 <Input 
                    label='Adresse mail'
                    value ={changeUser?.email}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15'
                    name='email' 
                    autoComplete='current-email'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'email' : e.target.value})}
                />
                <NumberInput 
                    label= 'N° de téléphone'
                    value ={changeUser?.tel}
                    className= 'ds-w-100 ds-h-50'
                    containerClassName = 'ds-w-100 ds-h-12'
                    allowNegative={false}
                    displayType={ EDisplayType.input}
                    onChange={(e: { value: string })=>setChangeUser({...changeUser, 'tel' : e.value})}
                 />   
                   <label className="ds-text-weight400">Date de naissance</label>    
                <Datepicker
                 placeholder="Date de naissance"
                 containerClassName= 'ds-mb-15'
                 inputSize={ESizeInput.medium}
                 isRange={false}
                 value={typeof changeUser.birthDate === 'string' ? new Date(changeUser.birthDate) : null }
                 onChange={(e : Date | IChangeDatePicker)=>setChangeUser({...changeUser, 'birthDate' : e})}
                />
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
            <Input 
                    label='Pays / Région'
                    value ={changeUser?.country}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-15 ds-mt-15'
                    name='country' 
                    autoComplete='current-country'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'country' : e.target.value})}
                />
                <Input 
                    label='Profil'
                    value ={changeUser?.profile}
                    type = {ETypesInput.text} 
                    containerClassName= 'ds-mb-30'
                    name='profile' 
                    autoComplete='current-profile'
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, 'profile' : e.target.value})}
                />
                <Button 
                    text='Enregistrer'
                    className="ds-mt-17 ds-mb-12 ds-w-100"
                    type={Type.primary}
                    size={Size.medium} 
                    onClick={() => handleModify()}
                    /> 
                    </Col>
                </Row>
            </div>
        </>
    )
}