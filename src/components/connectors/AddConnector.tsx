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

export default function AddConnector () {

    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authData = useAppSelector(state => state.auth.data)
    const [connector, setConnector] = useState<Connector>({} as Connector)
    


    const handleGenerate = async (e : FormEvent) => {
        e.preventDefault();
        try {
            const response = await dispatch(createConnector({id: authData?.id, token : authData?.token, createConnector: connector})).unwrap();
            navigate(`/connectorDetails&id=${response.data.id}`)
        }
        catch(error) {
            console.log(error);
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
                className="ds-text-size-50 ds-ml-50"
                size = {Size.small}
                onClick={()=>navigate('/')}
                />
                <Text
                text = "Nouveau connecteur"
                type={TextType["type-5"]}
                className="ds-mt-9"
                />
            </div>
        }
        />
        <div className="ds-flex ds-justify-center ds-m-50">
        <form className="ds-w-25 ds-flex-col" onSubmit={(e: FormEvent)=>handleGenerate(e)}>
            <div className="ds-flex ds-justify-center">
            <SlPrinter className="ds-text-size-50 ds-text-neutral800 ds-mb-25 ds-flex ds-justify-center" />
            </div>
                <Input
                label = "Nom du connecteur"
                containerClassName="ds-mb-20"
                name='connectorName'
                value = {connector.connectorName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setConnector({...connector, 'connectorName': e.target.value})}
                />
                <Input
                label = "Site web de l'application "
                containerClassName="ds-mb-20"
                name='webSite'
                value = {connector.webSite}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setConnector({...connector, 'webSite': e.target.value})}
                />
                <Button 
               text="Générer l'API"
               style={{
                borderColor: '#283c53',
                backgroundColor: '#212529',
                color: '#fff',
              }}
              
               type={TypeButton.primary}
               />
        </form>
        </div>
        </>
    )
}