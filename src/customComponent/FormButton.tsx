import { Button } from "@piximind/ds-p-23";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { FormEvent } from "react";

export default function FormButton ({text, type, handle}: {text: string, type: Type,handle: (e: FormEvent<Element>)=> void}) {
    return (
        <>
        <Button 
                type={type}
                className='ds-w-100' 
                size={Size.large}
                onClick={(e: FormEvent<Element>) => handle(e)}
                text={text}
            />
        </>
    )
}