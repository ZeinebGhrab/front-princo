import { NavbarPosition, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Button, Navbar, Text } from '@piximind/ds-p-23';
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

interface NavProps {
    handleModify: () => void;
}


export default function Nav({handleModify} : NavProps ) {

    const navigate  = useNavigate();
    const links =[
        {
            label :'Informations du profil',
            path : '/profile'
        },
        {
            label :'Informations de facturation',
            path : '/invoiceDetails'
        }
    ]

    return(
        <>
           <div className="ds-flex ds-justify-between ds-items-center ds-m-10 ">
                <div className="ds-flex ds-items-center ">
                    <Button 
                        icon='https://th.bing.com/th/id/R.63d9a0f0ca26a6a3da699c91132aa03d?rik=ePEGNrFG0NR84A&pid=ImgRaw&r=0'
                        type={Type.tertiary}
                        size={Size.small}
                        onClick={()=>navigate('/')} />
                    <Text
                        text='Mon profil'
                        className='ds-flex ds-justify-center ds-text-primary'
                        type={TextType['type-4']} />
                </div>
                <Button
                    type={Type.secondary}
                    text={<><FaPencilAlt className="ds-mr-2" /> Modifier</> as unknown as string}
                    className="ds-mr-20 ds-text-size-15"
                    size={Size.medium} 
                    onClick={()=>handleModify()}
                />
            </div>
            <Navbar
            className="ds-bg-white ds-p-50 ds-box-shadow2 ds-mb-30"
            links={links} 
            position={NavbarPosition.left}
            withButton={false} 
            />
        </>
    )
}