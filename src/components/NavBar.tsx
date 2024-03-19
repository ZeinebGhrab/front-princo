import { Navbar, NavbarPosition } from "@piximind/ds-p-23";



export default function NavBar () {

  const links = [
    {
      label:'',
      path:'/',
      sousLinks : [
        {
          label : 'Mon profil',
          path:'/profile'
        },
        {
          label : 'Mon crèdit',
          path : '/credit'
        },
        {
          label : 'Mes factures',
          path : '/invoices'
        },
        {
          label:'Déconnexion',
          path : '/login'
        }
    ]
    }
  ]


    return(
        <>  
        <div className="ds-flex ds-justify-end ds-blur1">
            <Navbar 
                position={NavbarPosition.right}
                className="ds-box-shadow1"  
                links={links}
                isLogout={false}
                withButton ={false}
            />
        </div>
        </>
    )
}