import { Avatar, Button } from '@piximind/ds-p-23';
import { Size } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { Size as SizeAvatar } from '@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomAvatar/IAtomAvatar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { useAppDispatch } from '../../api/hooks';
import { logOut } from '../../api/reducers/AuthReducer';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';


export default function Nav9() {

  const dispatch = useAppDispatch();
  const handleLogout = ()=>{
    dispatch(logOut());
  }


  return (
    <Navbar className="ds-p-10 ds-w-100 ds-hv-10" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Princo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Container className="ds-flex ds-justify-end">
            <Nav className="mr-auto" navbarScroll>
              <Button text="Acheter crédit" size={Size.medium} className='ds-mt-13 ds-text-size-15'/>
            </Nav>
            <Nav>
              <NavDropdown 
                title={<Avatar 
                          size={SizeAvatar.medium}
                          isActive={true} 
                          isImage={true} 
                          src='https://storage.googleapis.com/uscimages/account.png'
                        />} 
                className='ds-p-9 ds-hv-10'
                id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/profileDetails" > <CgProfile /> Mon Profil</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/credit">
                  <BsFillCreditCard2BackFill /> Mon crédit
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/credit">
                  <LiaFileInvoiceDollarSolid /> Mes factures
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to='/login' onClick={handleLogout}>
                  <TbLogout /> Déconnexion
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}