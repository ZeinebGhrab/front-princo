import React, { useState } from 'react';
import {  Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { updateUser } from '../../api/reducers/ProfileReducer';
import { Validation } from '@piximind/validation';
import { ETypesInput, Size, TextType, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { Button, Checkbox, Container, Input, Text } from '@piximind/ds-p-23';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";

interface Props {
    show: boolean;
    handleClose: () => void;
}

export default function PasswordModal({ show, handleClose }: Props) {
    const [change, setChange] = useState({
        password:'',
        confirmPass :'',
        confirm: false,
    });

    const validation = new Validation();
    const dispatch = useAppDispatch();
    const data = useAppSelector(state=>state.auth.data);

    const handleChange = async() => {
        if (
            validation.isEmpty(change.password) ||
            validation.isEmpty(change.confirmPass) ||
            !validation.isTrue(change.confirm) ||
            change.password !== change.confirmPass ||
            change.password.length < 8
        ) {
            return;
        }

        try {
            await dispatch(updateUser({id: data?.id , updateUser: {password : change.password} , token : data?.token})).unwrap();
            handleClose();
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title ><Text
                text='Changer mon mot de passe'
                className='ds-flex ds-mb-2 ds-text-primary ds-ml-14'
                type={TextType['type-5']}
            /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container
            children={
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
            children= {
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
            children ={
                <>
                <Checkbox
                label='Générer un mot de passe'
                checked ={change.confirm}
                labelClassName="ds-text-secondaryDarker ds-text-size-10"
                disabled={false}
                type={TypeCheck.checkbox}
                onClick={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, confirm: e.target.checked})}
            />
                </>  
            }
            />
            </Modal.Body>
            <Modal.Footer>
                 <Button
                        type={Type.secondary}
                        text='Annuler'
                        size={Size.medium}
                        className='ds-w-48'
                        onClick={handleClose} 
                        />
                    <Button
                        type={Type.primary}
                        text='Enregistrer'
                        size={Size.medium}
                        className='ds-w-48 '
                        onClick={()=>handleChange()}
                    />
                
            </Modal.Footer>
        </Modal>
    );
}

