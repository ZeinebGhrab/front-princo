import { Button, TypeButton, Text, Avatar } from '@piximind/ds-p-23';
import { Size, SizeAvatar } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { useState } from 'react';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { TbLogout } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import userLogo from '../../assets/user.png';
import { Dropdown,  NavDropdown } from 'react-bootstrap';
import { useAppDispatch } from '../../api/hooks';
import { logOut } from '../../api/reducers/AuthReducer';


export default function Navbar() {


   const dispatch = useAppDispatch();
   const [showDropdown, setShowDropdown] = useState(false);
   const navigate = useNavigate();

  return (
    <>
      <div className="ds-flex ds-px-12 ds-hp-65 ds-align-center ds-mt-10  ds-justify-between ds-w-100 ds-box-shadow3">
        <b><Text text="Princo" className="ds-ml-20 ds-text-primary ds-text-size-33" /></b>
        <div className="ds-flex ds-align-center">
          <Button text="Acheter Crédit"
           type={TypeButton.primary} 
           className="ds-mr-20" 
           size={Size.medium} 
           onClick={()=>navigate('/credit')}
           />
          <div className="ds-flex-grow1 ds-flex ds-justify-start">
            <NavDropdown 
              title={
              <Avatar  src= {userLogo}
              isImage={true}
              size={SizeAvatar.large}
              />}
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)} 
              id="basic-nav-dropdown"
              >
            <Dropdown.Item eventKey="1" as={Link} to='/profileDetails'>
                <CgProfile className="ds-mr-3" /> Mon Profil
                </Dropdown.Item>
              <Dropdown.Item eventKey="2"  as={Link}  to='/credit'> 
                <BsFillCreditCard2BackFill className="ds-mr-3" /> Mon crédit</Dropdown.Item>
              <Dropdown.Item eventKey="3" as={Link}  to='/invoices'>
                <LiaFileInvoiceDollarSolid className="ds-mr-3" /> Mes factures
                </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" as={Link}  to='login' onClick={()=>dispatch(logOut())}>
                <TbLogout className="ds-mr-3" /> Déconnexion
                 </Dropdown.Item>
            </NavDropdown>  
          </div>
        </div>
      </div>
    </>
  );
}
