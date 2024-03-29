import { Button, Text } from '@piximind/ds-p-23';
import { Size, Type } from '@piximind/ds-p-23/lib/esn/Interfaces';
import Nav from 'react-bootstrap/Nav';
import { IoIosArrowRoundBack } from 'react-icons/io';
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
           <div className="ds-flex ds-justify-between ds-mt-38 ">
                <div className="ds-flex ds-align-center ds-ml-50">
                    <Button 
                        type={Type.tertiary}
                        size={Size.small}
                        text = {<IoIosArrowRoundBack />  as unknown as string}
                        className="ds-text-size-55"
                        onClick={()=>navigate('/')} />
                    <Text
                        text='Mon profil'
                        className="ds-flex ds-justify-center ds-text-size-30"
                        style = {{color : '#003D42'}}
                         />
                </div>
                <Button
                    type={Type.secondary}
                    text={<><FaPencilAlt className="ds-mr-2" /> Modifier</> as unknown as string}
                    className="ds-mr-160 ds-text-size-15"
                    size={Size.medium}
                    onClick={handleOpenModal}
                    style={{
                      backgroundColor: '#fff',
                      borderColor: '#003D42',
                      color: '#003D42',
                    }}    
                />
            </div>
    <Nav variant="tabs" className="ds-ml-80 ds-text-size-18 ds-mt-11 ds-mr-150">
      <Nav.Item>
        <Nav.Link as={Link} to="/profileDetails" className='ds-mr-20' style={{ color: '#567388' }}>Informations du profil</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/invoiceDetails" style={{ color: '#567388' }}>Informations de facturation</Nav.Link>
      </Nav.Item>
    </Nav>
    </>
  );
}
