import { useNavigate } from 'react-router-dom';
import { Validation } from '@piximind/validation';
import { FormEvent, useState } from 'react';
import LoginUser from '../interfaces/LoginUser';
import { useAppDispatch } from '../redux/hooks';
import { authenticateUser } from '../redux/reducers/AuthReducer';
import { Button, Input, ETypesInput, Text, Checkbox } from '@piximind/ds-p-23';
import {  Size, TextType, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";


export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState<LoginUser>({email: '', password :'' } as LoginUser);
    const validation = new Validation();
    const dispatch = useAppDispatch();



    const handleConnect = (e: React.FormEvent): void => {
        e.preventDefault();
      
        if (!(validation.isMail(user.email) && validation.isNotEmpty(user.password))) {
            return;
        }
        try {
            dispatch(authenticateUser({ email: user.email, password: user.password })).unwrap();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSign = (e: React.FormEvent): void => {
        e.preventDefault();
        navigate('/sign');
    };

    return (
        <div className='ds-flex ds-flex-col ds-center p-5'>
            <form className='ds-blur4 p-4 border rounded ds-w-35 ds-m-40'>
                <Text 
                    text='Connexion'
                    className='ds-flex ds-mb-30 ds-justify-center ds-text-primary'
                    type={TextType['type-4']}/>
                <Input 
                    label='Adresse Email'
                    type = {ETypesInput.text} 
                    value={user.email} 
                    name='email' 
                    autoComplete='current-email'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user, email : e.target.value})}
                />
                <Input 
                    label='Mot de passe'
                    type = {ETypesInput.text} 
                    value={user.password} 
                    name='password' 
                    autoComplete='current-password'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setUser({...user, password : e.target.value})}
                    />
                    <Button 
                      type={Type.primaryLink}
                      className='ds-flex ds-justify-end'
                      text= 'Mot de passe oublié ?'
                    />
   
 
                <Button
                    type={Type.primary}
                    className='ds-mb-5 ds-mt-5 ds-w-100'
                    size={Size.medium}
                    onClick={(e: FormEvent<Element>) => handleConnect(e)}
                    text='Se connecter'
                />
                <Text 
                    text='Vous n’avez pas de compte'
                    className='ds-mb-5 ds-w-100 ds-text-secondaryDarker ds-flex ds-justify-center ds-align-center'
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

/*
               <Checkbox 
                    label='Se souvenir de moi'
                    className='ds-bg-white'
                    checked={user.memorise}
                    disabled={false}
                    type={TypeCheck.checkbox}
                    onClick={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, memorise : e.target.checked})}
                />
*/