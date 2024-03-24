import { Button, Row, Text,  } from "@piximind/ds-p-23";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../api/hooks";
import { validate } from "../api/reducers/AuthReducer";

export default function Verify({ token }: { token?: string | undefined }) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const verify=async()=>{
        try {
            await dispatch(validate({token})).unwrap();
            navigate('/');
        }
        catch(error) {
            console.log(error);
        }
    }

    return(

        <div className='ds-m-120 ds-justify-center ds-p-20'>
            <Row className="ds-justify-center">
            <Text
               text="Votre compte a été créé avec succès et votre adresse e-mail a été vérifiée."
               className="ds-text-neutral700 ds-text-size-24 ds-mb-20"
            />      
            </Row>
            <Row className="ds-justify-center">
            <Text
                text="Veuillez cliquer sur le bouton ci-dessous pour valider votre compte et accéder à l'application."
                className="ds-text-neutral600 ds-text-size-20 ds-mb-20"
            />
            </Row>
            <Row className="ds-justify-center">
            <Button
                text="Accéder à la page d'accueil"
                type={Type.tertiary}
                className="ds-bg-neutral400 ds-text-white"
                size={Size.medium}
                onClick={()=>verify()}
              />

            </Row>
            
        </div>
    )
}