import { Button, Checkbox, Input, Row, Text } from "@piximind/ds-p-23";
import { ETypesInput, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";
import { Validation } from "@piximind/validation";
import { useAppDispatch } from "../../api/hooks";
import { useState } from "react";
import { resetPassword } from "../../api/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";

export default function ResetPassword ({email}: {email?: string | undefined}) {

    const [change, setChange] = useState({
        password:'',
        confirmPass :'',
        confirm: false,
    });

    const validation = new Validation()
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleChange = async (e: React.FormEvent) =>{
        e.preventDefault()
        if (validation.isEmpty(change.password) 
        || validation.isEmpty(change.confirmPass) 
        || !validation.isTrue(change.confirm)
        || change.confirmPass !== change.password
        || change.password.length < 8)
         { 
            return;
         }

         try {
            await dispatch(resetPassword({email : email , password: change.password})).unwrap();
            navigate('/');
         }
         catch(error){
            console.log(error);
         }
    }


    return (
        <div className='ds-flex-col ds-center ds-m-50'>
            <form className='ds-blur4 ds-p-20 border rounded ds-w-35 ds-m-20'>
            <Text
                text='Réinitialiser mon mot de passe'
                className='ds-flex ds-mb-30 ds-mt-15 ds-text-primary ds-justify-center'
                type={TextType['type-5']}
            />
           
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
           
            <Checkbox
                label='Valider mon mot de passe'
                checked ={change.confirm}
                labelClassName="ds-text-secondaryDarker ds-text-size-10"
                className="ds-bg-white"
                disabled={false}
                type={TypeCheck.checkbox}
                onClick={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, confirm: e.target.checked})}
            />

            <Row className="ds-justify-center">
                    <Button
                        type={Type.primary}
                        text='Enregistrer'
                        size={Size.large}
                        className="ds-mt-25 ds-justify-center ds-w-35"
                        onClick={(e : React.FormEvent)=>handleChange(e)}
                    />
            </Row>
            </form>
        </div>
    )
}