import { useNavigate } from 'react-router-dom';
import '@piximind/ds-p-23/lib/main.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createUser } from '../redux/reducers/ProfileReducer';
import { Button, Checkbox, ETypesInput, Input, TextType } from '@piximind/ds-p-23';
import {  Text } from '@piximind/ds-p-23';
import { Size, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { FormEvent, useState } from 'react';
import SignUser from '../interfaces/SignUser';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";


export default function SignUp() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.auth.data?.accessToken);
    const [user,setUser] = useState<SignUser>({} as SignUser)
   
    const handleSign = (e: React.FormEvent) : void => {
        e.preventDefault();
        console.log(user);
    
        try {
            dispatch(createUser({ user: user, token })).unwrap();
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
        <form className='ds-blur4 p-4 border rounded ds-w-35 ds-m-30'>
        <Text 
            text='Inscription'
            className='ds-flex ds-mb-25 ds-justify-center ds-text-primary'
            type={TextType['type-4']}/>
        <Input 
            label='Nom'
            type = {ETypesInput.text} 
            value={user.firstName} 
            name='firstName'
            autoComplete='current-firstname'
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, firstName : e.target.value})}
        />
        <Input 
            label='Prénom'
            type = {ETypesInput.text} 
            value={user.lastName} 
            name='lastName'
            autoComplete='current-lastname'
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, lastName : e.target.value})}
        />
        <Input 
            label='Adresse email'
            type = {ETypesInput.text} 
            value={user.email} 
            name='email'
            autoComplete='current-email'
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, email : e.target.value})}
        />
        <Input 
            label='Mot de passe'
            type = {ETypesInput.password} 
            value={user.password} 
            name='password'
            autoComplete='current-password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, password : e.target.value})}
        />
        <Input 
            label='Confirmation de Mot de passe'
            type = {ETypesInput.password} 
            value={user.confirmPassword} 
            name='confirmPassword'
            autoComplete='current-confirm-password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, confirmPassword : e.target.value})}
        />
            <Checkbox 
                    label={"J'accepte les conditions d'utilisation"}
                    className='ds-mt-7' 
                    labelClassName ='ds-mt-7'
                    checked={user.confirm}
                    type={TypeCheck.checkbox}
                    onClick={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, confirm : e.target.checked})}
            />
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