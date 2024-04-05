import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../api/hooks';
import { Button, Checkbox, Container, ETypesInput, Input, TextType } from '@piximind/ds-p-23';
import {  Text } from '@piximind/ds-p-23';
import { Size, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { FormEvent, useState} from 'react';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";
import { useForm } from '@piximind/custom-hook';
import { ValidationList } from '../../interfaces/user/ValidationList';
import { signup } from '../../api/reducers/AuthReducer';
import { MdOutlineMarkEmailRead } from "react-icons/md";

  

export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [send, setSend]=useState<boolean>(false);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});


    const {state,onChange,isFormValid} = useForm({ isRealTimeValidation: true, data: ValidationList });
            
   
    const handleSign = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();
        setErrors({})

        if (!isFormValid || state.password.value !== state.confirmPassword.value) {
            return;
        }
    
        try {

           await dispatch(signup({
                firstName: state.firstName.value,
                lastName: state.lastName.value,
                email: state.email.value,
                password: state.password.value,
            })).unwrap();

            setSend(true);
        }
        catch(error){
            console.log(error);
            setErrors(error as { [key: string]: string } );
        }
      }

    const handleConnect =(e : React.FormEvent) : void => {
        e.preventDefault();
        navigate('/login');
    }
    
    return(
        <>
        {
            send ? (
                <div className="ds-m-100">
                    <div className='ds-flex ds-justify-center ds-text-size-80 ds-mb-20'>
                    <MdOutlineMarkEmailRead className='ds-text-success700' />
                    </div>
                    
            <Text
               text="Un lien a été envoyé à votre adresse e-mail."
               className="ds-text-success800 ds-text-size-24 ds-flex ds-justify-center"
            /> 
            <Text
               text="
               Veuillez le consulter pour activer votre compte."
               className="ds-text-neutral700 ds-text-size-24 ds-flex ds-justify-center"
            />          
            </div>
            ):(
        <div className='ds-flex-col ds-center ds-m-10'>
        <form className='ds-blur4 ds-p-20 ds-border-radius-8 ds-w-35 ds-box-shadow2'>
        <Text 
            text='Inscription'
            className='ds-flex ds-mb-25 ds-justify-center ds-text-primary'
            type={TextType['type-4']}
        />
        <Container
        className='ds-mb-15'
        children = {
            <>
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
            </>
        }
        />
        <Container
        children = {
            <>
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
            </>
        }
        />

        <Container
        className='ds-mb-15'
        children = {
            <>
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
            </>
        }
        />

        <Container
        className='ds-mb-15'
        children = {
            <>
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
            </>

        }
        />

<Container
        className='ds-mb-15'
        children = {
            <>
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
            </>  
        }
        />

        <Container
        className='ds-mb-13'
        children={
            <>
            <Checkbox 
                    label={"J'accepte les conditions d'utilisation"}
                    className='ds-mb-13 ds-bg-white'
                    labelClassName ='ds-mb-13'
                    checked={state.confirm.value as boolean}
                    disabled={false}
                    type={TypeCheck.checkbox}
                    onClick={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: "confirm", value: e.target.checked})}
            />
            </>
        }
        />

                {
                      errors['message']&&                
                      <Container 
                      children = {
                        <Text
                         text={errors['message']}
                         className="ds-text-error600 ds-ml-3"
                         type={TextType['subtitle-1']} 
                    />
                      }/>
                     }
        
        <Container
        children = {
            <>
            <Button 
                type={Type.primary}
                className='ds-w-100 ds-mb-13' 
                size={Size.large}
                onClick={(e: FormEvent<Element>) => handleSign(e)}
                text='S’inscrire'
            />
            <Text 
                text='Vous avez déjà un compte ?'
                className='ds-mb-13 ds-w-100 ds-text-secondaryDarker ds-flex ds-justify-center ds-align-center'
                type={TextType['body-2']}
            />
            <Button 
                type={Type.secondary}
                className='ds-w-100' 
                size={Size.large}
                onClick={(e: FormEvent<Element>) => handleConnect(e)}
                text='Se connecter'
            />
            </>
        }
        />
        </form>
        </div>
            )
        }
 
        </>
)
}
