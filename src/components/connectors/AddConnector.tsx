import { Button, Container, Input, Text, TypeButton } from "@piximind/ds-p-23";
import { Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { IoIosArrowRoundBack } from "react-icons/io";
import Navbar from "../nav/Navbar";
import { SlPrinter } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { createConnector } from "../../api/reducers/ConnectorsReducer";
import { FormEvent, useState } from "react";
import Connector from "../../interfaces/Connector";
import { Validation } from "@piximind/validation";

export default function AddConnector () {

    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authData = useAppSelector(state => state.auth.data)
    const [connector, setConnector] = useState<Connector>({} as Connector)
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const validation = new Validation();
    


    const handleGenerate = async (e : FormEvent) => {
        setErrors({})
        e.preventDefault();
        if (validation.isEmpty(connector.connectorName) || validation.isEmpty(connector.webSite)) {
            setErrors({message : 'Veuillez remplir tous les champs!'});
            return;
        }
        if(!validation.isUrl(connector.webSite)) {
            setErrors({message : 'Veuillez saisir une URL valide!'});
            return;
        }
        try {
            const response = await dispatch(createConnector({token : authData?.token, createConnector: connector})).unwrap();
            console.log("...",response.connector)
            navigate(`/connectorDetails/${response.connector._id}`);
        }
        catch(error) {
            console.log(error);
            setErrors(error as { [key: string]: string } );
        }

    }

    return (
        <>
        <Navbar/>
        <Container
        children = {
            <div className="ds-flex ds-align-center ds-mt-30">
                <Button
                text = {<IoIosArrowRoundBack /> as unknown as string}
                type = {Type.tertiary}
                className="ds-text-size-50 ds-ml-50 ds-text-neutral500"
                size = {Size.small}
                onClick={()=>navigate('/')}
                />
                <Text
                text = "Nouveau connecteur"
                type={TextType["type-5"]}
                className="ds-mt-9 ds-text-neutral500"
                />
            </div>
        }
        />
        <div className="ds-flex ds-justify-center ds-m-50">
        <form className="ds-w-25 ds-flex-col" onSubmit={(e: FormEvent)=>handleGenerate(e)}>
            <div className="ds-flex ds-justify-center">
            <SlPrinter className="ds-text-size-50 ds-mb-25 ds-flex ds-justify-center ds-text-primary700" />
            </div>
                <Input
                label = "Nom du connecteur"
                containerClassName="ds-mb-20"
                name='connectorName'
                value = {connector.connectorName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setConnector({...connector, 'connectorName': e.target.value})}
                />
                <Input
                label = "Site web de l'application"
                containerClassName="ds-mb-20"
                name='webSite'
                value = {connector.webSite}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setConnector({...connector, 'webSite': e.target.value})}
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
               text="Générer l'API" 
               type={TypeButton.primary}
               className="ds-text-size-16"
               />
        </form>
        </div>
        </>
    )
}