import React, { useState } from 'react';
import {  Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { Validation } from '@piximind/validation';
import { ETypesInput, Size, TextType, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { Button, Input, Text } from '@piximind/ds-p-23';
import { updateConnector } from '../../api/reducers/ConnectorsReducer';
import Props from '../../interfaces/Props';


export default function EditConnector({ data ,show, handleClose }: Props) {
    const [change, setChange] = useState(data || {
        connectorName :"",
        webSite:"",
    });

    console.log(data)

    const validation = new Validation();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.auth.data?.token);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});

    const handleChange = async() => {
        setErrors({});
        if (
            validation.isEmpty(change.connectorName) || validation.isEmpty(change.webSite) ) {
            setErrors({message : 'Veuillez remplir tous les champs!'});
            return;
        }
        if(!validation.isUrl(change.webSite)) {
            setErrors({message : 'Veuillez saisir une URL valide!'});
            return;
        }

        try {
            await dispatch(updateConnector({id : data?._id, updateConnector: change,token})).unwrap();
            handleClose();
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title ><Text
                text='Changer les informations du connecteur'
                className='ds-flex ds-mb-2 ds-text-primary '
            /></Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Input
                label='Nouveau nom de connecteur'
                type={ETypesInput.text}
                value={change.connectorName}
                name='connectorName'
                autoComplete='current-connectorName'
                containerClassName='ds-mb-15 ds-mt-10'
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, connectorName: e.target.value})}
            />
           
           
            <Input
                label='Nouveau site web'
                type={ETypesInput.text}
                value ={change.webSite}
                name='webSite'
                autoComplete='current-webSite'
                containerClassName='ds-mb-10'
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=>setChange({...change, webSite: e.target.value})}
                
            />

                {
                      errors['message']&&                
                     
                        <Text
                         text={errors['message']}
                         className="ds-text-error600"
                         type={TextType["body-2"]} 
                    />
                    
                 }
                
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

