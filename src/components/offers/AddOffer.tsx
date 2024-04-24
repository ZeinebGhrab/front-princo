import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import ComponentTitle from "../../customComponent/ComponentTitle";
import { createOffer } from "../../api/reducers/OfferReducer";
import { useNavigate } from 'react-router-dom';
import { Button, ETypesInput, Input, TextType, Text, TypeButton, NumberInput, EDisplayType, TextArea } from "@piximind/ds-p-23";
import { Offer } from "../../interfaces/Offer";
import { emptyField } from "../helpers/ErrorMsg";
import { offerFields } from './helpers/offerFields';
import NavApp from "../nav/NavApp";
import { validationOffer } from "./helpers/ValidationOffer";


export default function AddOffer () {

    const authData = useAppSelector(state => state.authentication.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errors,setErrors]=useState<{ [key: string]: string }>({});
    const [change, setChange] = useState<Offer>({} as Offer);
    const fields = offerFields(change);
    

    const handleChange = async(e : FormEvent) => {
        e.preventDefault()
        setErrors({});
        if(validationOffer(change)){
            setErrors({ message: emptyField });
            return;
        }
       
        try {
            await dispatch(createOffer({offer:{
                ...change,
                admin: authData?.id,
            }, token: authData?.token})).unwrap();
            navigate('/offers');
            
        } catch(error) {
            console.log(error);
        }
    };

    
    return (
        <>
        <NavApp/>
        <div className="ds-mt-40">
           <ComponentTitle title="Ajouter un offre" navigatePage='/offers'/>
        </div>
       <div className="ds-flex ds-justify-center ds-m-10">
       <form className="ds-w-28 ds-flex-col" onSubmit={(e)=>handleChange(e)}>
       { 
      fields.map((field, index) => (
      field.type ==="number" ? 
      <NumberInput 
      label= {field.label}
      value ={field.value}
      className= 'ds-w-100 ds-h-80'
      containerClassName = 'ds-w-100 ds-mb-15'
      allowNegative={false}
      allowLeadingZeros={false}
      displayType={ EDisplayType.input}
      onChange={(e: { value: number }) => setChange({ ...change, [field.name]: Number(e.value) })}
   /> 
      : 
      (
        field.type ==='text' ? 
        <TextArea 
        key={index}
        label={field.label}
        value={field.value}
        type={ETypesInput.text}
        name={field.name}
        autoComplete={`current-${field.name}`}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChange({ ...change, [field.name]: e.target.value })}
        rows={3}
        />
        :
        <Input
              key={index}
              label={field.label}
              value={field.value}
              type={ETypesInput.text}
              name={field.name}
              autoComplete={`current-${field.name}`}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChange({ ...change, [field.name]: e.target.value })}
              containerClassName = 'ds-w-100 ds-mb-10'    
                />
      )
    ))}

                {
                      errors['message']&&                
                     
                        <Text
                            text={errors['message']}
                            className="ds-text-error600"
                            type={TextType["body-2"]} 
                 />      
                }
     <Button 
               text="Ajouter" 
               type={TypeButton.primary}
               className="ds-text-size-16 ds-mt-30"
               />
        </form>
        </div>
        </>
    )
}