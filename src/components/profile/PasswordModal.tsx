import { Modal, Text, Input, Checkbox, Button, Row, Col, TextType, ETypesInput } from '@piximind/ds-p-23';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";
import { Size, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import Props from '../../interfaces/Props';
import { useState } from 'react';
import { Validation } from '@piximind/validation';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { updateUser } from '../../api/reducers/ProfileReducer';


export default function PasswordModal({ modalRef, cancel }: Props ) {

    const [change, setChange] = useState({
        password:'',
        confirmPass :'',
        confirm: false,
    })
    
    const validation = new Validation()
    const dispatch = useAppDispatch();
    const data = useAppSelector(state=>state.auth.data);

    const handleChange = () =>{
        if (validation.isEmpty(change.password) 
        || validation.isEmpty(change.confirmPass) 
        || !validation.isTrue(change.confirm)
        || change.confirmPass !== change.password
        || change.password.length < 8)
         { 
            return;
         }

         try {
            dispatch(updateUser({id: data?.id , updateUser: {password : change.password} , token : data?.token})).unwrap();
            cancel();
         }
         catch(error){
            console.log(error);
         }
    }

    return (
        <Modal ref={modalRef} withCloseIcon={true} contentClassName="ds-flex ds-m-200" containerClassName="ds-blur0 ds-center ds-p-100">
            <Text
                text='Changer mon mot de passe'
                className='ds-flex ds-mb-2 ds-text-primary '
                type={TextType['type-5']}
            />
            <hr />

            <Col>
            <Input
                label='Nouveau mot de passe'
                type={ETypesInput.password}
                value={change.password}
                name='password'
                autoComplete='current-password'
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, password: e.target.value})}
            />
            </Col>
            <Col>
            <Text
                text='Minimum 8 caractères'
                className="ds-text-error600"
                type={TextType.caption}
            />
            </Col>
            <Col>
            <Input
                label='Confirmer le mot de passe'
                type={ETypesInput.password}
                value ={change.confirmPass}
                name='confirmPass'
                autoComplete='current-confirmPass'
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, confirmPass: e.target.value})}
                
            />
            </Col>
            <Col>
            <Text
                text='Minimum 8 caractères'
                className="ds-text-error600"
                type={TextType.caption} 
            />
            </Col>
            <Col>
            <Checkbox
                label='Générer un mot de passe'
                checked ={change.confirm}
                labelClassName="ds-text-secondaryDarker ds-text-size-10"
                disabled={false}
                type={TypeCheck.checkbox}
                onClick={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, confirm: e.target.checked})}
            />
            </Col>

            <Row className="ds-mt-10 ds-ml-5">
                <Col>
                    <Button
                        type={Type.secondary}
                        text='Annuler'
                        size={Size.small}
                        onClick={cancel} />
                </Col>
                <Col>
                    <Button
                        type={Type.primary}
                        text='Enregistrer'
                        size={Size.small}
                        onClick={()=>handleChange()}
                    />
                </Col>
            </Row>
        </Modal>
    );
}
