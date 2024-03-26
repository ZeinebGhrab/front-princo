import { Button, Text } from '@piximind/ds-p-23';
import { Size, TextType, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import Nav from 'react-bootstrap/Nav';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../nav/Navbar';
import { FaPencilAlt } from 'react-icons/fa';


interface Props {
    handleOpenModal : () => void,
}




export default function ProfileNav({handleOpenModal} :Props) {

    const navigate  = useNavigate();
    
  return (
    <>
    <Navbar/>
           <div className="ds-flex ds-justify-between ds-items-center ds-mt-10">
                <div className="ds-flex ds-items-center ">
                    <Button 
                        icon='https://th.bing.com/th/id/R.63d9a0f0ca26a6a3da699c91132aa03d?rik=ePEGNrFG0NR84A&pid=ImgRaw&r=0'
                        type={Type.tertiary}
                        size={Size.small}
                        text = {<IoMdArrowRoundBack /> as unknown as string}
                        className="ds-text-size-30 ds-mt-3 ds-text-primary ds-ml-50"
                        onClick={()=>navigate('/')} />
                    <Text
                        text='Mon profil'
                        className='ds-flex ds-justify-center ds-text-primary'
                        type={TextType["type-5"]} />
                </div>
                <Button
                    type={Type.secondary}
                    text={<><FaPencilAlt className="ds-mr-2" /> Modifier</> as unknown as string}
                    className="ds-mr-160 ds-text-size-15"
                    size={Size.small}
                    onClick={handleOpenModal}
                />
            </div>
    <Nav variant="underline" className="ds-ml-70">
      <Nav.Item>
        <Nav.Link as={Link} to="/profileDetails" style={{ color: 'grey' }}>Informations du profil</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/invoiceDetails" style={{ color: 'grey' }}>Informations de facturation</Nav.Link>
      </Nav.Item>
    </Nav>
    </>
  );
}
