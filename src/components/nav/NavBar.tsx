import { Button, TypeButton, Text, Avatar } from '@piximind/ds-p-23';
import { Size, SizeAvatar, TextType } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { ReactElement } from 'react';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { TbLogout } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

interface LinkItem {
  label: ReactElement;
  path?: string;
  sousLinks?: LinkItem[];
}

export default function Navbar ()  {
  
  const renderSousLinks = (sousLinks: LinkItem[] | undefined) => {
    const list: JSX.Element[] = [];
    sousLinks?.forEach(item => {
      if (item.path) {
        list.push(
        <Link 
            className="ds-align-center ds-flex ds-justify-center ds-link ds-text-line-16 ds-text-weight500 ds-text-size-16 ds-m-5" 
            to={item.path}>
                {item.label}
        </Link>);
      }
    });
    return list;
  };

  const links: LinkItem[] = [
    {
      label: <><Avatar src="https://storage.googleapis.com/uscimages/account.png" isImage={true} size={SizeAvatar.large}/></>,
      sousLinks: [
        {
          label: <><CgProfile /> Mon Profil</>,
          path: '/profile',
        },
        {
          label: <><BsFillCreditCard2BackFill /> Mon crédit</>,
          path: '/credit',
        },
        {
          label: <> <LiaFileInvoiceDollarSolid /> Mes factures</>,
          path: '/invoice'
        },
        {
          label: <><hr/> <TbLogout /> Déconnexion</>,
          path: '/login'
        }
      ]
    }
  ];

  return (
    <div className="ds-flex ds-px-12 ds-hp-32 ds-align-center ds-py-33 ds-justify-between">
      <Text 
      text='Princo' 
      className="ds-ml-20"
      type={TextType['type-5']}/>
      <div className="ds-flex ds-align-center ds-justify-end">
        <Button 
        text="Acheter Crédit" 
        type={TypeButton.primary} 
        className='ds-mr-15'
        size={Size.small}
        />
        <div className="ds-flex-grow1 ds-flex ds-justify-start">
          {links.map((link, index) => (
            <div key={index} className="ds-dropdown-link ds-relative ds-px-10 ds-text-line-16 ds-text-weight500 ds-text-size-16 ds-text-neutral600">
              {link.sousLinks && (
                <div>
                  <Link className="ds-align-center ds-flex ds-justify-center ds-link ds-text-line-16 ds-text-weight500 ds-text-size-16 ds-m-5" to={link.path || '#'}>
                    {link.label}
                  </Link>
                  <div className="ds-dropdown-content ds-absolute ds-bg-white ds-px-16 ds-py-12">
                    {renderSousLinks(link.sousLinks)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
