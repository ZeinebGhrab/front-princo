import {  Text } from '@piximind/ds-p-23';
import { TextType } from '@piximind/ds-p-23/lib/esn/Interfaces';

export default function PageNotFound() {

    return(
        <div className="ds-flex ds-justify-center ds-h-full ds-m-100">
        <div className="ds-center">
            <Text text='404' type={TextType['type-2']} />
            <Text text='Page non trouvée !' type={TextType['type-3']} />
        </div>
        </div>
    )
}