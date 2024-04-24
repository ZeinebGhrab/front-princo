import { SizeButton, TypeButton, Button } from "@piximind/ds-p-23";
import { ReactElement } from "react";

export default function TitleButton({text,className,handle }:{text: ReactElement,className?: string,handle: ()=>void }) {
   return(
    <>
    <Button
      text ={text as unknown as string}
      type={TypeButton.secondary}
      size={SizeButton.medium}
      style={{
        backgroundColor: '#fff',
        borderColor: '#003D42',
        color: '#003D42',
      }}  
      className={className}
      onClick={handle}
      />
    </>
   )
}