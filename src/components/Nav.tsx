import { NavbarPosition, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Button, Navbar, Text } from '@piximind/ds-p-23';
import { useNavigate } from "react-router-dom";

export default function Nav() {

    const navigate  = useNavigate();
    const links =[
        {
            label :'Informations du profil',
            path : '/profile'
        },
        {
            label :'Information de facturation',
            path : '/invoiceDetails'
        }
    ]

    return(
        <>
           <div className="ds-flex ds-justify-between ds-items-center ds-m-10">
                <div className="ds-flex ds-items-center">
                    <Button 
                        icon='https://cdn-icons-png.flaticon.com/512/3114/3114883.png'
                        text='<-'
                        type={Type.tertiary}
                        size={Size.small}
                        onClick={()=>navigate('/')} />
                    <Text
                        text='Mon Profil'
                        className='ds-flex ds-justify-center ds-text-primary'
                        type={TextType['type-4']} />
                </div>
                <Button
                    type={Type.secondary}
                    text='Modifier'
                    className="ds-mr-20"
                    size={Size.small} />
            </div>
            <Navbar
            className="ds-bg-white p-4"
            links={links} 
            position={NavbarPosition.left}
            withButton={false} 
            withIcon= {false}/>
        </>
    )
}