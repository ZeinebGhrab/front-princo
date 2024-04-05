import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { Validation } from '@piximind/validation';
import { Size, TextType, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { Button, Container, Input, Text, TypeButton } from '@piximind/ds-p-23';
import { getConnector, updateConnector } from '../../api/reducers/ConnectorsReducer';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../nav/Navbar';
import { SlPrinter } from 'react-icons/sl';
import Connector from '../../interfaces/Connector';


export default function EditConnector() {

    const navigate = useNavigate();
    const data = useAppSelector(state=>state.connectors.data);
    const [change, setChange] = useState<Connector>(Array.isArray(data) ? data[0]: data || {
        connectorName :"",
        webSite:"",
    });

    const validation = new Validation();
    const dispatch = useAppDispatch();
    const authData= useAppSelector(state=>state.authentication.data);
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const  {id} = useParams();

    const fetchData = async ()=>{
        try {
            await dispatch(getConnector({id, token: authData?.token})).unwrap();
        }
        catch(error){
            console.log(error);
        }
    }

    const handleChange = async(e : FormEvent) => {
        e.preventDefault()
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
            await dispatch(updateConnector({
                id : Array.isArray(data) ? data[0]?._id : data?._id ,
                updateConnector: {...change, userId: authData?.id},
                token: authData?.token
            })).unwrap();
            navigate(`/connectorDetails/${id}`)
        } catch(error) {
            console.log(error);
            setErrors(error as { [key: string]: string });
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <>
        <Navbar/>
        <Container
        children = {
            <div className="ds-flex ds-align-center ds-mt-40">
                <Button
                text = {<IoIosArrowRoundBack /> as unknown as string}
                type = {Type.tertiary}
                className="ds-text-size-55 ds-ml-50"
                style = {{color : '#003D42'}}
                size = {Size.small}
                onClick={()=>navigate(`/connectorDetails/${id}`)}
                />
                <Text
                text = "Modifier connecteur"
                className="ds-text-size-30"
                style = {{color : '#003D42'}}
                />
            </div>
        }
        />
        <div className="ds-flex ds-justify-center ds-m-50">
        <form className="ds-w-28 ds-flex-col ds-mt-10" onSubmit={(e: FormEvent)=>handleChange(e)}>
            <div className="ds-flex ds-justify-center">
            <SlPrinter className="ds-text-size-60 ds-mb-25 ds-flex ds-justify-center ds-text-primary700" />
            </div>
                <Input
                label = "Nom du connecteur"
                containerClassName="ds-mb-20"
                name='connectorName'
                value = {change.connectorName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setChange({...change, 'connectorName': e.target.value})}
                />
                <Input
                label = "Site web de l'application"
                containerClassName="ds-mb-24"
                name='webSite'
                value = {change.webSite}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setChange({...change, 'webSite': e.target.value})}
                />
                 {
                      errors['message']&&                
                     
                        <Text
                         text={errors['message']}
                         className="ds-text-error600"
                         type={TextType["body-2"]} 
                    />
                    
                 }
                <Button 
               text="Modifier" 
               type={TypeButton.primary}
               className="ds-text-size-16"
               />
        </form>
        </div>
        </>
    );
}

