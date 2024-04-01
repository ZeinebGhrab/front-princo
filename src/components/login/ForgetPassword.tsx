import { Button, TextType, Text, Input, Container } from "@piximind/ds-p-23";
import { ETypesInput, Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../api/hooks";
import { forgetPassword } from "../../api/reducers/AuthReducer";
import { Validation } from "@piximind/validation";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function ForgetPassword() {

    const [email, setEmail]= useState<string>('');
    const [errors, setErrors]= useState<{ [key: string]: string }>({});
    const [send, setSend] = useState<boolean>(false);
    const validation = new Validation()
    const dispatch = useAppDispatch();

    const handleSend = (e: FormEvent) =>{
        try {
            e.preventDefault();
            if(!validation.isMail(email)) {
                setErrors({message : 'Veuillez saisir une adresse email valide'})
                return;
            }
            dispatch(forgetPassword({email})).unwrap();
            setSend(true);
            
        }
        catch(error){
            setErrors(error as { [key: string]: string });
        }
    }

    return(
        <div className='ds-flex-col ds-center ds-p-10'>
            { send ? (
             <div className="ds-m-100">
                    <div className='ds-flex ds-justify-center ds-text-size-80 ds-mb-20'>
                    <MdOutlineMarkEmailRead className='ds-text-success700' />
                    </div>
                    
            <Text
               text="Un lien de réinitialisation a été envoyé à votre adresse e-mail."
               className="ds-text-success800 ds-text-size-24 ds-flex ds-justify-center"
            /> 
            <Text
               text=" Veuillez le consulter pour réinitialiser votre mot de passe."
               className="ds-text-neutral700 ds-text-size-24 ds-flex ds-justify-center"
            />          
            </div>
            )
            :
            (
                <form className='ds-bg-neutral300 ds-p-30 border rounded ds-w-37 ds-m-130' onSubmit={(e: FormEvent) =>handleSend(e)}>
                <Text 
                    text='Mot de passe oublié'
                    className='ds-flex ds-mb-40 ds-justify-center ds-text-primary'
                    type={TextType['type-4']}/>
                    <Container
                    children = {
                        <>
                        <Input 
                    label='Adresse Email'
                    className='ds-m-100'
                   
                    type = {ETypesInput.text} 
                    value={email} 
                    name='email' 
                    autoComplete='current-email'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail( e.target.value)}
                />
                <Text
                text='Un lien de réinitialisation sera envoyé à cette adresse email'
                className="ds-mb-10"
                type={TextType.caption}
                  />
                        </>
                    }
                     />
                
                <Container
                children = {
                    <>
                    {
                      errors['message']&&                
                      <Text
                         text={errors['message']}
                         className="ds-text-error600 ds-ml-3 ds-mb-30"
                         type={TextType['subtitle-2']} 
                    />
                     }
                <Button
                    type={Type.primary}
                    className='ds-mb-5 ds-mt-20 ds-w-100'
                    size={Size.medium}
                    text='Réinitialiser mon mot de passe'
                />
                    </>
                }
                />      
            </form>
            )
            }
        </div>
    )
}