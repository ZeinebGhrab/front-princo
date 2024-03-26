import { Button, Checkbox, Container, Input, Text, TypeButton, TypeCheckbox } from "@piximind/ds-p-23";
import Navbar from "../nav/Navbar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SiApple, SiLinux, SiNestjs, SiPhp, SiPython, SiWindows10 } from "react-icons/si";
import { Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getConnector } from "../../api/reducers/ConnectorsReducer";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { MdContentCopy } from "react-icons/md";


export default function ConnectorDetails() {

    
    const code = {
        "php": "php",
        "python": "python",
        "nest": "nest"
      };
      
    
    
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const dispatch = useAppDispatch();
    const token = useAppSelector(state=>state.auth.data?.token);

    const [changeCode, setChangeCode] = useState<{ [key: string]: string }>({ "php": code.php });
    const [active, setActive] = useState<boolean>(true)

    const fetchData = async () =>{
        try{
            await dispatch(getConnector({id: id, token: token})).unwrap()
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])



    return (
        <>
        <Navbar/> 
  <Container className="ds-flex ds-align-center ds-justify-between  ds-ml-58 ds-mt-30">
    <div className="ds-flex ds-justify-center">
    <Button
      text={<IoIosArrowRoundBack /> as unknown as string}
      type={Type.tertiary}
      className="ds-text-size-50 ds-mt-4"
      size={Size.small}
      onClick={() => navigate('/')}
    />
    <Text
      text="Imprimante"
      type={TextType["type-5"]}
      className="ds-ml-3"
    />
    </div>
     <Checkbox
      checked = {active}
      onClick={()=>setActive(!active)}
      type={TypeCheckbox.switch}  
      label="Activé" 
      containerClassName="ds-mb-14 ds-mr-100"
      />
  </Container>
  <div className="ds-ml-80"> 
  <div className="ds-w-50 ds-mt-5"> 
    <Container className="ds-mt-3">
    <b>Site web</b> 
    <Text text="..." />
    </Container>
   
    <Container className="ds-flex ds-align-center ds-mt-3"> 
      <Input
        label="API key"
        className="ds-text-primary"
      />
      <Button 
      text="Copier" 
      size = {Size.medium}
      type = {TypeButton.secondary}
      className="ds-ml-15 ds-mt-24"
      />
    </Container>

    <Container className="ds-mt-20">
      <b>
        <Text
          text="Guide de mise en marche : "
          className="ds-text-size-20 ds-text-neutral800 "
        />
      </b>
    </Container>

    <Container className="ds-mt-18"> 
        <>
        <b className="ds-text-primary">Etape 1 : </b> Télécharger l'application desktop de votre imprimante
        <div className="ds-flex ds-align-center ds-mt-10">
      <div>
      <Button
      text={<SiWindows10 /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#000',
        borderColor: '#eaeeeb'
      }}
      size = {Size.large}
      className="ds-text-size-30 ds-mr-25"
      />
      <Text text='Windows' type={TextType.caption} className="ds-ml-13"/>
      </div>
      <div>
      <Button
      text={<SiApple /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#000',
        borderColor: '#eaeeeb'
      }}
      size = {Size.large}
      className="ds-text-size-30 ds-mr-25"
      />
      <Text text='MacOs' type={TextType.caption} className="ds-ml-17"/>
      </div>
      <div>
      <Button
      text={<SiLinux /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#000',
        borderColor: '#eaeeeb'
      }}
      size = {Size.large}
      className="ds-text-size-30"
      />
      <Text text='Linux' type={TextType.caption} className="ds-ml-21"/>
      </div>
        </div>
        </>
    </Container>

    <Container> 
      <>
        <b className="ds-text-primary">Etape 2 : </b> Connectez l'imprimante à votre ordinateur
        <Text
          text="Assurez-vous que l'imprimante est connectée à votre ordinateur. L'application peut utiliser plusieurs imprimantes à la fois."
          type={TextType["body-2"]}
          className="ds-mt-2" 
        />
      </>
    </Container>

    <Container className="ds-mt-18"> 
      <>
        <b className="ds-text-primary">Etape 3 : </b> Associer le site à votre ordinateur
        <Text
          text="Copier le token du connecteur dans votre espace manager et mettez le dans l'application. Choisissez l'imprimante dans laquelle vous allez imprimer votre ticket de caisse ou vos factures."
          type={TextType["body-2"]}
          className="ds-mt-2" 
        />
      </>
    </Container>

    <Container className="ds-mt-18 ds-mb-25"> 
        <b className="ds-text-neutral900">Vous êtes dans le cas d'un développement spécifique ? Vous pouvez utiliser directement le code suivant :</b>
      <div className="ds-flex ds-align-center ds-mt-10">
      <div>
      <Button
      text={<SiPhp /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#000',
        borderColor: '#eaeeeb'
      }}
      className="ds-text-size-30 ds-mr-25"
      size = {Size.large}
      onClick={()=>setChangeCode({ "php": code.php })}
      />
      <Text text='PHP' type={TextType.caption} className="ds-ml-27"/>
      </div>
      <div>
      <Button
      text={<SiPython /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#000',
        borderColor: '#eaeeeb'
      }}
      className="ds-text-size-25 ds-mr-30"
      size = {Size.large}
      onClick={()=>setChangeCode({ "python": code.python })}
      />
      <Text text='Python' type={TextType.caption} className="ds-ml-16"/>
      </div>
      <div>
      <Button
      text={<SiNestjs /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#000',
        borderColor: '#eaeeeb'
      }}
      className="ds-text-size-30"
      size = {Size.large}
      onClick={()=>setChangeCode({ "nest": code.nest })}
      />
      <Text text='JS' type={TextType.caption} className="ds-ml-30"/>
      </div>
      </div>
      <Card style={{ width: '40rem', height:'15rem', background: 'black' }}>
      <div  className="ds-flex ds-justify-end ds-m-3">
      <Button 
      text={<><MdContentCopy /> Copier</> as unknown as string}
       className="ds-flex ds-justify-end  ds-bg-dark ds-text-white ds-mt-8"
        size={Size.xSmall}
        type={TypeButton.tertiary}
        />
      </div>
                <Card.Body>
                  <div className = "ds-mb-7 ds-text-white ds-text-size-12">
                  {changeCode[Object.keys(changeCode)[0]]}
                  </div>
                </Card.Body>
              </Card>
    </Container>
  </div>
</div>
         </>

     
    )

}