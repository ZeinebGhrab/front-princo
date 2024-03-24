import { Row, Text } from '@piximind/ds-p-23';
import { TextType } from '@piximind/ds-p-23/lib/esn/Interfaces';

export default function PageNotFound() {


    return (
        <div className='ds-m-120'>
            <Row className='ds-justify-center'>
                <Text text='404' className='ds-text-error700' type={TextType['type-2']} />
            </Row>
            <Row className='ds-justify-center'>
                <Text text='Page non trouvée !' type={TextType['type-3']} />
            </Row>
            <Row className='ds-justify-center ds-mt-4'>
                <Text
                    text="La page que vous tentez d'afficher n'existe pas ou un autre erreur s'est produite"
                    type={TextType['type-5']} />
            </Row>
        </div>
    )
}
