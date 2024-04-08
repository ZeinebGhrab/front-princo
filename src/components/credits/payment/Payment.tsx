import { Stripe, loadStripe } from '@stripe/stripe-js';
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import { useEffect, useState } from 'react';
import { payment } from '../../../api/reducers/PaymentReducer';
import { Button, SizeButton, TypeButton } from '@piximind/ds-p-23';

export default function Payment({offerId} : {offerId : string}) {

    const dispatch = useAppDispatch();
    const dataAuth = useAppSelector(state => state.authentication.data);
    const [stripe, setStripe] = useState<Stripe | null>(null);

    const handlepayment = async () => {
            try {
                const session = await dispatch(payment({
                    cardPayment: {
                        userId: dataAuth?.id,
                        offerId,
                    },
                    token: dataAuth?.token
                })).unwrap();

                if (session && stripe) {
                    const { error } = await stripe.redirectToCheckout({
                        sessionId: session.id
                    });
                    if (error) {
                        console.error('Erreur lors de la redirection vers la page de paiement :', error);
                    }
                }
    
            } catch (error) {
                console.log(error)
            }
    };

    useEffect(() => {
        const fetchStripe = async () => {
                const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
                setStripe(stripe);
        };
        fetchStripe();
    }, []);

    return (
        <>            
        <Button
         text="Achat"
            className="ds-mt-5"
            size={SizeButton.small}
            type={TypeButton.secondary}
         onClick={() => handlepayment()}
          />
            
        </>
    )
}
