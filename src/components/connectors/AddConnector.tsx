import { Button, Input, Text, TypeButton } from "@piximind/ds-p-23";
import { TextType } from "@piximind/ds-p-23/lib/esn/Interfaces";
import NavApp from "../nav/NavApp";
import { SlPrinter } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { createConnector } from "../../api/reducers/ConnectorsReducer";
import { FormEvent, useState } from "react";
import Connector from "../../interfaces/Connector";
import ComponentTitle from "../../customComponent/ComponentTitle";
import { connectorValidation } from "./helpers/ConnectorValidation";
import { connectorFields } from "./helpers/ConnectorFields";

export default function AddConnector () {

    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authData = useAppSelector(state => state.authentication.data)
    const [connector, setConnector] = useState<Connector>({} as Connector)
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const fields = connectorFields(connector);
    

    const handleGenerate = async (e : FormEvent) => {
        setErrors({})
        e.preventDefault();

        const validateConnector = connectorValidation(connector);

        if (validateConnector !== true) {
            setErrors({ message: validateConnector });
            return;
        }
        
        try {
            const response = await dispatch(createConnector(
                {
                 token : authData?.token, 
                 createConnector: {...connector, userId:authData?.id },
                }
                )).unwrap();
            navigate(`/connectorDetails/${response}`);
        }
        catch(error) {
            console.log(error);
            setErrors(error as { [key: string]: string });
        }
    }

    return (
        <>
        <NavApp/>
        <div className="ds-mt-40">
            <ComponentTitle title="Nouveau connecteur" navigatePage='/'/>
        </div>
       
        <div className="ds-flex ds-justify-center ds-m-50">
        <form className="ds-w-28 ds-flex-col ds-mt-10" onSubmit={(e: FormEvent)=>handleGenerate(e)}>
            <div className="ds-flex ds-justify-center">
            <SlPrinter className="ds-text-size-60 ds-mb-25 ds-flex ds-justify-center ds-text-primary700" />
            </div>
               {
                fields.map((field, index)=>(
                <Input
                key={index}
                label = {field.label}
                containerClassName="ds-mb-20"
                value = {field.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setConnector({...connector, [field.name]: e.target.value})}
                />

                ))
               }
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