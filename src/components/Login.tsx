import { useNavigate } from 'react-router-dom';
import { Validation } from '@piximind/validation';
import { FormEvent, useState } from 'react';
import LoginUser from '../interfaces/LoginUser';
import { useAppDispatch } from '../api/hooks';
import { authenticateUser } from '../api/reducers/AuthReducer';
import { Button, Input, ETypesInput, Text, Checkbox } from '@piximind/ds-p-23';
import {  Size, TextType, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";


export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState<LoginUser>(
        {
            email: localStorage.getItem('email'),
            password :localStorage.getItem('password'),
            memorise : false
        } as LoginUser);

    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const validation = new Validation();
    const dispatch = useAppDispatch();

    const handleConnect = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
      
        if (!validation.isMail(user.email) || validation.isEmpty(user.password)) {
            setErrors({ message: "Veuillez saisir une adresse e-mail et un mot de passe valides." });
            return;
        }
        try {
             await dispatch(authenticateUser({ email: user.email, password: user.password })).unwrap();
             if (user.memorise) {
                localStorage.setItem('email', user.email);
                localStorage.setItem('password', user.password);
            }
                navigate('/'); 
        } catch (error) {
            console.log(error);
            setErrors(error as { [key: string]: string } );
        }
    };

    const handleSign = (e: React.FormEvent): void => {
        e.preventDefault();
        navigate('/sign');
    };


    return (
        <div className='ds-flex ds-center ds-p-10'>
            <form className='ds-blur4 ds-p-20 ds-border-radius-8 ds-w-35 ds-m-50' onSubmit={(e: FormEvent)=>e.preventDefault()}>
                <Text 
                    text='Connexion'
                    className='ds-flex ds-mb-30 ds-justify-around ds-text-primary'
                    type={TextType['type-4']}/>
             
                <Input 
                    label='Adresse Email'
                    containerClassName= 'ds-mb-13'
                    type = {ETypesInput.text} 
                    value={user.email} 
                    name='email' 
                    autoComplete='current-email'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user, email : e.target.value})}
                />
                
                <Input 
                    label='Mot de passe'
                    containerClassName= 'ds-mb-13'
                    type = {ETypesInput.password} 
                    value={user.password} 
                    name='password' 
                    autoComplete='current-password'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setUser({...user, password : e.target.value})}
                    />
                     {
                      errors['message']&&                
                      <Text
                         text={errors['message']}
                         className="ds-text-error600 ds-ml-3 ds-mt-2"
                         type={TextType['subtitle-2']} 
                    />
                     }
                    <Button 
                      type={Type.primaryLink}
                      className='ds-flex ds-justify-end ds-mb-13'
                      text= 'Mot de passe oublié ?'
                      disabled={false}
                      to={'/'}
                    />

                    <Checkbox 
                    label='Se souvenir de moi'
                    className='ds-bg-white'
                    checked={user.memorise}
                    disabled={false}
                    type={TypeCheck.checkbox}
                    onClick={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, memorise : e.target.checked})}
                    />
                <Button
                    type={Type.primary}
                    className='ds-mb-13 ds-mt-13 ds-w-100'
                    size={Size.medium}
                    onClick={(e: React.FormEvent) => handleConnect(e)}
                    text='Se connecter'
                />
                <Text 
                    text='Vous n’avez pas de compte'
                    className='ds-mb-13 ds-w-100 ds-text-secondaryDarker ds-flex ds-justify-center ds-align-center'
                    type={TextType['body-2']}
                     />
                <Button 
                    type={Type.secondary}
                    className='ds-w-100' 
                    size={Size.medium}
                    onClick={(e: FormEvent<Element>) => handleSign(e)}
                    text='S’inscrire'
                />
            </form>
        </div>
    );
}


       