import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../api/hooks';
import { Checkbox, Container, ETypesInput, Input, TextType } from '@piximind/ds-p-23';
import {  Text } from '@piximind/ds-p-23';
import { FormEvent, useState} from 'react';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";
import { useForm } from '@piximind/custom-hook';
import { ValidationList } from './helpers/ValidationList';
import { signup } from '../../api/reducers/AuthReducer';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FormFooter } from '../../customComponent/FormFooter';

export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [send, setSend]=useState<boolean>(false);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});

    const fields = ValidationList;
    const {state,onChange,isFormValid} = useForm({isRealTimeValidation: true, data: fields});
            
    const handleSign = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();
        setErrors({})
        
        if (!isFormValid) {
            return;
        }

        if (state.password.value && state.password.value.toString.length < 8 ) {
            setErrors({message: 'Le mot de passe doit avoir au minimum 8 caractéres.'});
            return;
        }

        if (state.password.value !== state.confirmPassword.value) {
            setErrors({message: 'Le mot de passe ne correspond pas.'});
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

        {
            fields.map((field, index)=>(
                <Container
                key={index}
                className='ds-mb-15'
                children = {
                    <>
                    {
                        (field.type ==='check' )? (
                            <Checkbox 
                            label={field.label}
                            className='ds-bg-white'
                            checked={state[field.key].value as boolean}
                            disabled={false}
                            type={TypeCheck.checkbox}
                            onClick={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: field.key, value: e.target.checked})}
                    />

                        ): (
                            <Input 
                            label={field.label}
                            type = {field.type ==="password"? ETypesInput.password : ETypesInput.text} 
                            value={state[field.key].value as string}
                            autoComplete={`current-${field.key}`}
                            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>onChange({ key: field.key, value: e.target.value })}
                        />
                        )
                    }
                {
                    state[field.key].errorMessage &&                
                    <Text
                    text={state[field.key].errorMessage }
                    className="ds-text-error600"
                    type={TextType.caption} 
                />
                }
                    </>
                }
                />
            ))
        }
        <FormFooter
        errors ={errors}
        text = 'Vous avez déjà un compte ?'
        button1= {{ text: 'S’inscrire', handleButton1: (e: FormEvent<Element>) => handleSign(e) }}
        button2= {{ text: 'Se connecter', handleButton2: (e: FormEvent<Element>) => handleConnect(e)}}
        />
        </form>
        </div>
            )
        }
 
        </>
)
}
