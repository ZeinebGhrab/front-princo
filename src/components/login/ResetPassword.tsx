import { Button, Checkbox, Container, Input, Text } from "@piximind/ds-p-23";
import { ETypesInput, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";
import { Validation } from "@piximind/validation";
import { useAppDispatch } from "../../api/hooks";
import { useState } from "react";
import { resetPassword } from "../../api/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import { emptyField } from "../helpers/ErrorMsg";

export default function ResetPassword ({email}: {email?: string | undefined}) {

    const [change, setChange] = useState({
        password:'',
        confirmPass :'',
        confirm: false,
    });

    const validation = new Validation()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errors,setErrors]=useState<{ [key: string]: string }>({});

    const handleChange = async (e: React.FormEvent) =>{
        e.preventDefault()
        setErrors({});
        if (validation.isEmpty(change.password) 
        || validation.isEmpty(change.confirmPass) 
        )
         { 
            setErrors({message :  emptyField});
            return;
         }
         if (
        change.confirmPass !== change.password
        || change.password.length < 8
         )
         { 
            setErrors({message : "Veuillez saisir des champs identiques."});
            return ; 
         }

         if(!validation.isTrue(change.confirm)){
            setErrors({message : "Veuillez confirmer la réinitialisation de votre mot de passe."});
            return ; 
         }

         try {
            await dispatch(resetPassword({email : email , password: change.password})).unwrap();
            navigate('/');
         }
         catch(error){
            console.log(error);
            setErrors(error as { [key: string]: string });
         }
    }


    return (
        <div className='ds-flex-col ds-center ds-m-50'>
            <form className='ds-blur4 ds-p-20 border rounded ds-w-40 ds-m-20'>
            <Text
                text='Réinitialiser mon mot de passe'
                className='ds-flex ds-mb-40 ds-mt-15 ds-text-primary ds-justify-center ds-text-size-30'
            />

            <Container
            children = {
                <>
                 <Input
                label='Nouveau mot de passe'
                type={ETypesInput.password}
                value={change.password}
                name='password'
                autoComplete='current-password'
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, password: e.target.value})}
            />

            <Text
                text='Minimum 8 caractères'
                className="ds-text-error600"
                type={TextType.caption}
            />
                </>
            }
            />

            <Container
            children = {
                <>
                <Input
                label='Confirmer le mot de passe'
                type={ETypesInput.password}
                value ={change.confirmPass}
                name='confirmPass'
                autoComplete='current-confirmPass'
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, confirmPass: e.target.value})}
                
            />
            <Text
                text='Minimum 8 caractères'
                className="ds-text-error600"
                type={TextType.caption} 
            />
                </>
            }
            />

            <Container 
            children = {
                <>
                <Checkbox
                label='Valider mon mot de passe'
                checked ={change.confirm}
                labelClassName="ds-text-secondaryDarker ds-text-size-10"
                className="ds-bg-white"
                disabled={false}
                type={TypeCheck.checkbox}
                onClick={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, confirm: e.target.checked})}
            />
               {
                      errors['message'] &&                
                    
                        <Text
                         text={errors['message']}
                         className="ds-text-error600 ds-mt-10"
                         type={TextType['subtitle-1']} 
                    />
                      
                     }


                <Button
                        type={Type.primary}
                        text='Enregistrer'
                        size={Size.medium}
                        className="ds-mt-25 ds-justify-center ds-w-100"
                        onClick={(e : React.FormEvent)=>handleChange(e)}
                    />
                </>
            }
            />
            </form>
        </div>
    )
}