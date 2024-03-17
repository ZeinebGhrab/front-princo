import { Button, Col, Input, Modal, Row, Text } from "@piximind/ds-p-23";
import { ETypesInput, Size, TextType, Type } from "@piximind/ds-p-23/lib/esn/Interfaces";

export default function EditProfile () {
    return(
        <>
        <Modal  withCloseIcon={true} contentClassName="ds-m-200">
                <Text
                    text='Changer mon profil'
                    className='ds-flex ds-mb-2 ds-text-primary '
                    type={TextType['type-5']} />
                <hr/>
                <Input 
                    label='Nom'
                    type = {ETypesInput.text}  
                    name='password' 
                    autoComplete='current-password'
                  
                />
                <Input 
                    label='Prénom'
                    type = {ETypesInput.text} 
                    
                    name='confirmPass' 
                    autoComplete='current-confirmPass'
                    
                />
                <Input 
                    label='Adresse mail'
                    type = {ETypesInput.text} 
                    name='confirmPass' 
                    autoComplete='current-confirmPass'
                    
                />
                <Input 
                    label='Pays / Région'
                    type = {ETypesInput.text} 
                    name='confirmPass' 
                    autoComplete='current-confirmPass'
                    
                />
                <Input 
                    label='Profil'
                    type = {ETypesInput.text} 
                    name='confirmPass' 
                    autoComplete='current-confirmPass'
                 
                />

                <Row className="ds-mt-10">
                    <Col>
                    <Button
                    type={Type.secondary}
                    text='Annuler'
                    size={Size.small} 
                   />
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