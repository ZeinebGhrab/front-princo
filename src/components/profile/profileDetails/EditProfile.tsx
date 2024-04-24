import { Avatar, Button, Col, Datepicker, EDisplayType, Input,  NumberInput, Radio, Row, Text } from "@piximind/ds-p-23";
import { ESizeInput, ETypesInput, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useAppDispatch, useAppSelector } from "../../../api/hooks";
import { useState } from "react";
import { Validation } from "@piximind/validation";
import { updateUser } from "../../../api/reducers/ProfileReducer";
import userLogo from '../../../assets/user.png';
import { IChangeDatePicker } from "@piximind/ds-p-23/lib/esn/Interfaces/Molecule/IMoleculeDatepicker/IMoleculeDatepicker";
import { useNavigate } from "react-router-dom";
import { existName, validEmail } from "../../helpers/ErrorMsg";
import ComponentTitle from "../../../customComponent/ComponentTitle";
import { profileDetailsFields } from "./helpers/ProfileDetailsFields";
import NavApp from "../../nav/NavApp";
import ProfileField from "../../../interfaces/ProfileFields";
import EditUser from "../../../interfaces/user/EditUser";


export default function EditProfile(){

    const navigate = useNavigate();
    const [changeUser,setChangeUser] = useState<EditUser>(useAppSelector(state => state.profile.data) || {} as EditUser);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state => state.authentication.data);
    const validation = new Validation();
    const fields : ProfileField[] = profileDetailsFields(changeUser, true);

    const handleModify = async() =>{
        
        console.log(changeUser)
        if(!validation.isMail(changeUser.email))
        {
           
            setErrors({messageMail : validEmail});
            return;
        }
        if (validation.isEmpty(changeUser.firstName) || validation.isEmpty(changeUser.lastName)) {
            setErrors({message : existName});
            return;
        }
        try {  
            await dispatch(updateUser({id : dataAuth?.id , updateUser: changeUser, token : dataAuth?.token})).unwrap();
           console.log(changeUser)
            navigate('/profileDetails');
        }
        catch(error) {
            console.log(error);
        }
     }

    return(
        <>
        <NavApp/>
        <div className="ds-mt-40">
            <ComponentTitle title="Modifier mes informations du profil" navigatePage='/profileDetails'/>
        </div>
        <div className="ds-ml-100 ds-mt-30 ds-mb-50">
                <Row>
                    <Col>
                        <Avatar isActive={true} isImage={true} src={userLogo}/>
                    </Col>
                    <Col className="ds-ml-20 ds-w-30">
                 { 
           fields.map((field: ProfileField, index) => (
            field.type === "number" ? (
             <NumberInput 
                key={index}
                label={field.label}
                value={field.value}
                className='ds-w-100 ds-h-80'
                containerClassName='ds-w-100 ds-mb-15'
                allowNegative={false}
                allowLeadingZeros={true}
                displayType={EDisplayType.input}
                onChange={(e: { value: number }) => setChangeUser({ ...changeUser, [field.name as string]: e.value.toString()})}
            /> 
        ) : (
            field.type === 'date' ? (
                <Datepicker
                placeholder="Date de naissance"
                containerClassName= 'ds-mb-15'
                inputSize={ESizeInput.medium}
                isRange={false}
                value={typeof changeUser.birthDate === 'string' ? new Date(changeUser.birthDate) : null }
                onChange={(e : Date | IChangeDatePicker)=>setChangeUser({...changeUser,  [field.name as string]: e})}
               />
            ) : (
                 field.type ==='radio' ? (
                    <Radio
                    key={index}
                    label={field.label}
                    value={field.value as string}
                    disabled={false}
                    data={field.options}
                    onClick={(e : React.ChangeEvent<HTMLInputElement>)=>setChangeUser({...changeUser, [field.name as string] : e.target.value})}
                  />
                 ): (
                    <Input
                    key={index}
                    label={field.label}
                    value={field.value as string}
                    type={ETypesInput.text}
                    autoComplete={`current-${field.name}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangeUser({ ...changeUser, [field.name as string]: e.target.value })}
                    containerClassName='ds-w-100 ds-mb-10'    
                />
                 )
            )
        )
    ))
}
                {
                      errors['message']&&                
                     
                        <Text
                         text={errors['message']}
                         className="ds-text-error600"
                         type={TextType["body-2"]} 
                    />      
                 }
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