import { Button, Row, Text,  } from "@piximind/ds-p-23";
import { Size, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../api/hooks";
import { validate } from "../../api/reducers/AuthReducer";
import { FaUserCheck } from "react-icons/fa";

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

        <div className='ds-m-100'>
            <div className='ds-flex ds-justify-center ds-text-size-80 ds-mb-20'>
            <FaUserCheck className='ds-text-success700'/>
            </div>
            <Row className="ds-justify-center">
            <Text
               text="Votre compte a été créé avec succès et votre adresse e-mail a été vérifiée."
               className="ds-text-success700 ds-text-size-24 ds-mb-20"
            />      
            </Row>
            <Row className="ds-justify-center">
            <Text
                text="Veuillez cliquer sur le bouton ci-dessous pour valider votre compte et accéder à l'application."
                className="ds-text-neutral700 ds-text-size-20 ds-mb-30"
            />
            </Row>
            <Row className="ds-justify-center">
            <Button
                text="Accéder à la page d'accueil"
                type={Type.primary}
                size={Size.medium}
                onClick={()=>verify()}
                style={{
                backgroundColor : '#15803d'
                }}
              />
            </Row>  
        </div>
    )
}