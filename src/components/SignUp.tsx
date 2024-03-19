import { useNavigate } from 'react-router-dom';
import '@piximind/ds-p-23/lib/main.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createUser } from '../redux/reducers/ProfileReducer';
import { Button, Checkbox, ETypesInput, Input, TextType } from '@piximind/ds-p-23';
import {  Text } from '@piximind/ds-p-23';
import { Size, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { FormEvent} from 'react';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";
import { useForm } from '@piximind/custom-hook';
import { ValidationList } from '../interfaces/ValidationList';

  
  

export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.auth.data?.accessToken);


   
    const {state,onChange,isFormValid} = useForm({ isRealTimeValidation: true, data: ValidationList });
            
   
    const handleSign = (e: React.FormEvent) : void => {
        e.preventDefault();
        if (!isFormValid || state.password.value !== state.confirmPassword.value) {
            return;
        }
    
        try {
            dispatch(createUser({ 
                firstName: state.firstName.value,
                lastName : state.lastName.value,
                email : state.email.value,
                password : state.password.value,
                token })).unwrap();
           navigate('/login',{ state: { validate: "Inscription confirmée !"}})
        }
        catch(error){
            console.log(error);
        }
      }

    const handleConnect =(e : React.FormEvent) : void => {
        e.preventDefault();
        navigate('/login');
    }
    
    return(
        <div className='ds-flex ds-flex-col ds-center p-3'>
        <form className='ds-blur4 p-4 border rounded ds-w-35 ds-m-1'>
        <Text 
            text='Inscription'
            className='ds-flex ds-mb-25 ds-justify-center ds-text-primary'
            type={TextType['type-4']}/>
        <Input 
            label='Nom'
            type = {ETypesInput.text} 
            value={state.lastName.value as string}
            autoComplete='current-firstname'
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: "lastName", value: e.target.value })}
        />
        {
            state.lastName.errorMessage &&                
            <Text
            text={state.lastName.errorMessage }
            className="ds-text-error600"
            type={TextType.caption} 
        />
        }
        <Input 
            label='Prénom'
            type = {ETypesInput.text} 
            value={state.firstName.value as string}
            autoComplete='current-lastname'
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: "firstName", value: e.target.value })}
        />
        {
            state.firstName.errorMessage &&                
            <Text
            text={state.firstName.errorMessage }
            className="ds-text-error600"
            type={TextType.caption} 
        />
        }
        <Input 
            label='Adresse email'
            type = {ETypesInput.text} 
            value={state.email.value as string}
            autoComplete='current-email'
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: "email", value: e.target.value })}
        />
        {
            state.email.errorMessage &&                
            <Text
            text={state.email.errorMessage }
            className="ds-text-error600"
            type={TextType.caption} 
        />
        }
        <Input 
            label='Mot de passe'
            type = {ETypesInput.password} 
            value={state.password.value as string}
            autoComplete='current-password'
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: "password", value: e.target.value })}
        />
        {
            state.password.errorMessage &&                
            <Text
            text={state.password.errorMessage }
            className="ds-text-error600"
            type={TextType.caption} 
        />
        }
        <Input 
            label='Confirmation de Mot de passe'
            type = {ETypesInput.password} 
            value={state.confirmPassword.value as string}
            autoComplete='current-confirm-password'
            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: "confirmPassword", value: e.target.value })}
        />
        {
            state.confirmPassword.errorMessage &&                
            <Text
            text={state.confirmPassword.errorMessage }
            className="ds-text-error600"
            type={TextType.caption} 
        />
        }
        {
            state.confirmPassword.value !== state.password.value &&                
        <Text
            text='Le mot de passe ne correspond pas'
            className="ds-text-error600"
            type={TextType.caption} 
        />
        }
      
            <Button 
                type={Type.primary}
                className='ds-w-100 ds-mb-5 ds-mt-7' 
                size={Size.medium}
                onClick={(e: FormEvent<Element>) => handleSign(e)}
                text='S’inscrire'
            />
            <Text 
                text='Vous avez déjà un compte ?'
                className='ds-mb-5 ds-w-100 ds-text-secondaryDarker ds-flex ds-justify-center ds-align-center'
                type={TextType['body-2']}
            />
            <Button 
                type={Type.secondary}
                className='ds-w-100' 
                size={Size.medium}
                onClick={(e: FormEvent<Element>) => handleConnect(e)}
                text='Se connecter'
            />
        </form>
        </div>
    )
}

/*
   <Checkbox 
                    label={"J'accepte les conditions d'utilisation"}
                    className='ds-mt-7 ds-bg-white'
                    labelClassName ='ds-mt-7'
                    checked={state.confirm.value as boolean}
                    disabled={false}
                    type={TypeCheck.checkbox}
                    onClick={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: "confirm", value: e.target.checked})}
            />
*/