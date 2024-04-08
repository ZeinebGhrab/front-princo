import { Button, Container, Text, TypeButton } from "@piximind/ds-p-23"
import { Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { useState, useRef } from "react";
import { Card } from "react-bootstrap";
import { FcLinux } from "react-icons/fc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { SiApple, SiNestjs, SiPhp, SiPython, SiWindows10 } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Navbar from "../nav/Navbar";

export default function Guide({ exportGuide }: { exportGuide: boolean }) {

    const codeRef = useRef(null);
    const code = {
        "php": "php",
        "python": "python",
        "nest": "nest"
      };

    const [changeCode, setChangeCode] = useState<{ [key: string]: string }>({ "php": code.php });
    const navigate = useNavigate();

      const handleCopy = () => {
        const cardContent =  (codeRef?.current as unknown as HTMLElement)?.innerText;
        navigator.clipboard.writeText(cardContent);
      };
    
    return(
        <>
       {
        exportGuide ? (
            
            <Container className="ds-mt-30">
                <b>
                <Text
                text="Guide de mise en marche : "
                className="ds-text-size-23" 
                style ={{color:'#195054'}}
                />
                </b>
                </Container>
        ) :
        (  
            <>
            <Navbar />
            <Container
            children = {
                <div className="ds-flex ds-align-center ds-mt-40">
                    <Button
                    text = {<IoIosArrowRoundBack /> as unknown as string}
                    type = {Type.tertiary}
                    className="ds-text-size-55 ds-ml-50"
                    style = {{color : '#003D42'}}
                    size = {Size.small}
                    onClick={()=>navigate('/')}
                    />
                    <Text
                    text = "Guide de mise en marche"
                    className="ds-text-size-30"
                    style = {{color : '#003D42'}}
                    />
                </div>
            }
            />
            </>
        )
       }
       <div className={exportGuide ?  "" : "ds-ml-80 ds-w-50"}>
       <Container className="ds-mt-18"> 
        <>
        <b className="ds-text-primary">Etape 1 : </b> <span className="ds-text-neutral700">Télécharger l'application desktop de votre imprimante</span>
        <div className="ds-flex ds-align-center ds-mt-13">
      <div>
      <Button
      text={<SiWindows10 /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#0073CD',
        borderColor: '#eaeeeb'
      }}
      size = {Size.large}
      className="ds-text-size-30 ds-mr-25"
      />
      <Text text='Windows' type={TextType.caption} className="ds-ml-13 ds-text-neutral500"/>
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
      <Text text='MacOs' type={TextType.caption} className="ds-ml-17 ds-text-neutral500"/>
      </div>
      <div>
      <Button
      text={<FcLinux /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#000',
        borderColor: '#eaeeeb'
      }}
      size = {Size.large}
      className="ds-text-size-30"
      />
      <Text text='Linux' type={TextType.caption} className="ds-ml-21 ds-text-neutral500"/>
      </div>
        </div>
        </>
    </Container>
    <Container> 
      <>
        <b className="ds-text-primary">Etape 2 : </b> <span className='ds-text-neutral700'>Connectez l'imprimante à votre ordinateur</span>
        <Text
          text="Assurez-vous que l'imprimante est connectée à votre ordinateur. L'application peut utiliser plusieurs imprimantes à la fois."
          type={TextType["body-2"]}
          className="ds-mt-5 ds-text-neutral800" 
        />
      </>
    </Container>

    <Container className="ds-mt-18"> 
      <>
        <b className="ds-text-primary">Etape 3 : </b> <span className="ds-text-neutral700">Associer le site à votre ordinateur</span>
        <Text
          text="Copier le token du connecteur dans votre espace manager et mettez le dans l'application. Choisissez l'imprimante dans laquelle vous allez imprimer votre ticket de caisse ou vos factures."
          type={TextType["body-2"]}
          className="ds-mt-5 ds-text-neutral800" 
        />
      </>
    </Container>

    <Container className="ds-mt-27 ds-mb-25"> 
        <b className="ds-text-neutral900">Vous êtes dans le cas d'un développement spécifique ? Vous pouvez utiliser directement le code suivant :</b>
      <div className="ds-flex ds-align-center ds-mt-13">
      <div>
      <Button
      text={<SiPhp /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#33417B',
        borderColor: '#eaeeeb'
      }}
      className="ds-text-size-35 ds-mr-25"
      size = {Size.large}
      onClick={()=>setChangeCode({ "php": code.php })}
      />
      <Text text='PHP' type={TextType.caption} className="ds-ml-27 ds-text-neutral500"/>
      </div>
      <div>
      <Button
      text={<SiPython /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#407CAB',
        borderColor: '#eaeeeb'
      }}
      className="ds-text-size-30 ds-mr-30"
      size = {Size.large}
      onClick={()=>setChangeCode({ "python": code.python })}
      />
      <Text text='Python' type={TextType.caption} className="ds-ml-16 ds-text-neutral500"/>
      </div>
      <div>
      <Button
      text={<SiNestjs /> as unknown as string}
      type={TypeButton.primary}
      style={{
        backgroundColor : '#eaeeeb',
        color :'#E0234E',
        borderColor: '#eaeeeb'
      }}
      className="ds-text-size-30"
      size = {Size.large}
      onClick={()=>setChangeCode({ "nest": code.nest })}
      />
      <Text text='JS' type={TextType.caption} className="ds-ml-30 ds-text-neutral500"/>
      </div>
      </div>
      <Card style={{ width: '40rem', height:'15rem', background: 'black' }}>
      <div  className="ds-flex ds-justify-end ds-m-3">
      <Button 
      text={<><MdContentCopy /> Copier</> as unknown as string}
       className="ds-flex ds-justify-end  ds-bg-dark ds-text-white ds-mt-8"
        size={Size.xSmall}
        type={TypeButton.tertiary}
        onClick={handleCopy}
        />
      </div>
                <Card.Body>
                  <div className = "ds-mb-7 ds-text-white ds-text-size-12" ref={codeRef}>
                  {changeCode[Object.keys(changeCode)[0]]}
                  </div>
                </Card.Body>
              </Card>
    </Container>
       </div>

   
        </>
    )
}