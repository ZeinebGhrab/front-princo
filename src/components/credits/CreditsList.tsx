import { Button, Container, Text } from "@piximind/ds-p-23";
import { IoIosArrowRoundBack } from "react-icons/io";
import Navbar from "../nav/Navbar";
import { Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useNavigate } from "react-router-dom";

export default function CreditsList() {

    const navigate = useNavigate();
    
    return(
        <>
         <Navbar/>
        <Container
        children = {
            <div className="ds-flex ds-align-center ds-justify-between ds-mt-40 ds-mr-40">
                <div className="ds-flex ds-align-center">
                <Button
                text = {<IoIosArrowRoundBack /> as unknown as string}
                type = {Type.tertiary}
                className="ds-text-size-55 ds-ml-50"
                style = {{color : '#003D42'}}
                size = {Size.small}
                onClick={()=>navigate('/')}
                />
                <Text
                text = "Achat crédit"
                className="ds-text-size-30"
                style = {{color : '#003D42'}}
                />
                </div>
              <b>
                <Text
                text='Mon crédit actuel : '
                type={TextType["body-1"]}
                className="ds-text-neutral700"
                />
                </b>
            </div>
        }
        />
        <div className="ds-flex ds-justify-center ds-m-50">
            
        </div>
        </>
    )

}