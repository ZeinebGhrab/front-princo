import { Button, TypeButton, Text, Avatar } from '@piximind/ds-p-23';
import { Size, SizeAvatar, TextType } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { ReactElement } from 'react';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { TbLogout } from 'react-icons/tb';
import { Link } from 'react-router-dom';

interface LinkItem {
  label: ReactElement;
  path?: string;
  sousLinks?: LinkItem[];
}

export default function Navbar() {
  const renderSousLinks = (sousLinks: LinkItem[] | undefined) => {
    const list: JSX.Element[] = [];
    sousLinks?.forEach(item => {
      if (item.path) {
        list.push(
          <Link
            className="ds-align-center ds-flex ds-link ds-text-line-16 ds-text-weight500 ds-text-size-16 ds-m-5"
            to={item.path}
          >
            {item.label}
          </Link>
        );
      }
    });
    return list;
  };

  const links: LinkItem[] = [
    {
      label: (
        <>
          <Avatar src="https://storage.googleapis.com/uscimages/account.png" isImage={true} size={SizeAvatar.large} />
        </>
      ),
      sousLinks: [
        {
          label: (
            <>
              <CgProfile className="ds-mr-3" /> Mon Profil
            </>
          ),
          path: '/profileDetails',
        },
        {
          label: (
            <>
              <BsFillCreditCard2BackFill className="ds-mr-3" /> Mon crédit
            </>
          ),
          path: '/credit',
        },
        {
          label: (
            <>
              <LiaFileInvoiceDollarSolid className="ds-mr-3" /> Mes factures
            </>
          ),
          path: '/invoice',
        },
        {
          label: (
            <>
              <TbLogout className="ds-mr-3" /> Déconnexion
            </>
          ),
          path: '/login',
        },
      ],
    },
  ];

  return (
    <>
      <div className="ds-flex ds-px-12 ds-hp-32 ds-align-center ds-mt-20  ds-justify-between ds-w-100">
        <Text text="Princo" className="ds-ml-20" type={TextType['type-5']} />
        <div className="ds-flex ds-align-center">
          <Button text="Acheter Crédit" type={TypeButton.primary} className="ds-mr-20" size={Size.small} />
          <div className="ds-flex-grow1 ds-flex ds-justify-start">
            {links.map((link, index) => (
              <div key={index} className="ds-dropdown-link ds-relative ds-px-10 ds-text-line-16 ds-text-weight500 ds-text-size-16 ds-text-neutral600">
                {link.sousLinks && (
                  <div>
                    <Link
                      className="ds-mr-66 ds-link ds-text-line-16 ds-text-weight500 ds-text-size-16 ds-m-5"
                      to={link.path || '#'}
                    >
                      {link.label}
                    </Link>
                    <div className="ds-dropdown-content ds-absolute ds-bg-white ds-align-start">
                      {link.sousLinks.map((sousLink, subIndex) => (
                        <div key={subIndex}>
                          {subIndex === link?.sousLinks.length - 1 && <hr/>}
                          {sousLink.path && (
                            <Link
                              className="ds-align-center ds-flex ds-link ds-text-line-16 ds-text-weight500 ds-text-size-16 ds-m-13"
                              to={sousLink.path}
                            >
                              {sousLink.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
