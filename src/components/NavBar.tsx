import { Navbar, NavbarPosition } from "@piximind/ds-p-23";

export default function NavBar () {

  const links = [
    {
      label:'Princo',
      path:'/'
    }
  ]


    return(
        <>
         <Navbar 
         position={NavbarPosition.left}
         className="ds-blur1 p-4"  
         links={links}
         withButton={true}  
         btnText='Acheter crédit' 
         onClick={()=>console.log('ee')}
         withIcon={true}
         icons= {[{isAvatar:true , img:'https://storage.googleapis.com/uscimages/account.png'}]}
         
         />
        </>
    )
}