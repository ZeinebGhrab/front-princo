import {  Row, Text } from '@piximind/ds-p-23';
import { TextType } from '@piximind/ds-p-23/lib/esn/Interfaces';

export default function PageNotFound() {

    return(
        <div className='ds-m-120 ds-text-error600'>
        <Row className='ds-justify-center'>
        <Text text='404' type={TextType['type-2']}  />
        </Row>
        <Row className='ds-justify-center'>
        <Text text='Page non trouvée !' type={TextType['type-3']} />
        </Row>
        </div>
    )
}