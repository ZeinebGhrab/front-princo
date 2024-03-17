import NavBar from "./NavBar";
import { ETypesInput, Size,  TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";
import { Button, Text, Avatar, Col, Row, Radio, Modal, ModalRefType, Input, Checkbox } from '@piximind/ds-p-23';
import { useRef, useState } from "react";
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";
import Nav from "./Nav";

export default function Profile() {

    const modalRef = useRef<ModalRefType>(null);
    const [password,setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleOpenModal = () => {
        if (modalRef.current) {
          modalRef.current.onOpen();
        }
      };
    
    const cancel =()=>{
        modalRef.current?.onClose();

    }
    

    return (
        <>
            <NavBar />
            <Nav/>
            <div className="ds-ml-100 ds-mt-10">
                <Row>
                    <Col>
                        <Avatar isActive={true} isImage={true} src='https://storage.googleapis.com/uscimages/account.png' />
                    </Col>
                    <Col className="ds-ml-20">
                        <Text
                            text='Nom et Prénom'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Ghrab Zeineb'
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Adresse Mail'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='zeinebghrab@gmail.com'
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Radio
                            label='Identité de genre'
                            name='gender'
                            className="ds-ml-5 ds-text-primary500 ds-text-size-18"
                            disabled={false}
                            data={[{ label: 'Homme', value: 'Homme' }, { label: 'Femme', value: 'Femme' }]}
                        />
                        <Text
                            text='Date de naissance'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='18/06/2002'
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='N° de téléphone '
                            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='+21626938118'
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Pays / Région'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Tunisie'
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Profil'
                            className='ds-mb-5 ds-text-primary500 ds-text-size-18'
                            type={TextType["subtitle-1"]}
                        />
                        <Text
                            text='Business'
                            className='ds-mb-5 ds-ml-5'
                            type={TextType["subtitle-1"]}
                        />
                    </Col>
                </Row>
                <Row className="ds-mt-10">
                    <Button 
                    text='Changer mon mot de passe'
                    size={Size.small} 
                    onClick={handleOpenModal} />
                </Row>
            </div>
            <Modal ref={modalRef}  withCloseIcon={true} contentClassName="ds-m-200">
                <Text
                    text='Changer mon mot de passe'
                    className='ds-flex ds-mb-2 ds-text-primary '
                    type={TextType['type-5']} />
                <hr/>
                <Input 
                    label='Nouveau mot de passe'
                    type = {ETypesInput.text} 
                    value={password} 
                    name='password' 
                    autoComplete='current-password'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword( e.target.value)}
                />
                <Text
                    text='Minimum 8 caractères'
                    className="ds-text-error600"
                    type={TextType.caption} />
                <Input 
                    label='Confirmer le mot de passe'
                    type = {ETypesInput.text} 
                    value={confirmPass} 
                    name='confirmPass' 
                    autoComplete='current-confirmPass'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPass( e.target.value)}
                />
                <Text
                    text='Minimum 8 caractères'
                    className="ds-text-error600"
                    type={TextType.caption} />
                <Checkbox 
                    label='Générer un mot de passe'
                    checked={isChecked}
                    disabled={false}
                    type={TypeCheck.checkbox}
                    onClick={()=>setIsChecked(!isChecked)}
                    />
                <Row className="ds-mt-10">
                    <Col>
                    <Button
                    type={Type.secondary}
                    text='Annuler'
                    size={Size.small} 
                    onClick={cancel}/>
                    </Col>
                    <Col>
                    <Button
                    type={Type.primary}
                    text='Enregistrer'
                    size={Size.small} 
                    />
                    </Col>
                </Row>
            </Modal>
        </>
    )
}