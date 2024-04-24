import { Container, TextType, Text  } from "@piximind/ds-p-23";
import FormButton from "./FormButton";
import { Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { FormEvent } from "react";

interface PropsFormFooter {
    errors: { [key: string]: string }, 
    text: string,
    button1 :
     {
        text: string,
        handleButton1 : (e: FormEvent<Element>)=> void,
     }
     , 
     button2 : 
     {
        text: string,
        handleButton2: (e: FormEvent<Element>)=> void ,
     }
}

export function FormFooter(

    {errors, text, button1, button2}: PropsFormFooter ) {
    return (
        <>
        
                {
                      errors['message']&&                
                      <Container 
                      children = {
                        <Text
                         text={errors['message']}
                         className="ds-text-error600 ds-ml-3 ds-mt-20"
                         type={TextType['subtitle-2']} 
                    />
                      }/>
                    }

        <Container
        className='ds-mt-20'
        children = {
            <>
            <FormButton
                handle ={(e: FormEvent<Element>) => button1.handleButton1(e)}
                text =  {button1.text}
                type={Type.primary}
            />
            <Text 
                text={text}
                className='ds-mb-13 ds-mt-13 ds-w-100 ds-text-secondaryDarker ds-flex ds-justify-center ds-align-center'
                type={TextType['body-2']}
            />
            <FormButton
                handle ={(e: FormEvent<Element>) => button2.handleButton2(e)}
                text = {button2.text}
                type={Type.secondary}
            />
            </>
        }
        />
        </>

    )
}