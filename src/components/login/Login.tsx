import { Link, useNavigate } from 'react-router-dom';
import { Validation } from '@piximind/validation';
import { FormEvent, useState } from 'react';
import LoginUser from '../../interfaces/user/LoginUser';
import { useAppDispatch } from '../../api/hooks';
import { authenticateUser } from '../../api/reducers/AuthReducer';
import { Input, ETypesInput, Text, Checkbox, Container } from '@piximind/ds-p-23';
import {  ESizeInput, TextType } from '@piximind/ds-p-23/lib/esn/Interfaces';
import { Type as TypeCheck } from "@piximind/ds-p-23/lib/esn/Interfaces/Atoms/IAtomCheckbox/IAtomCheckbox";
import Cookies from 'js-cookie';
import { FormFooter } from '../../customComponent/FormFooter';
import { loginFields } from './helpers/loginFields';


export default function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState<LoginUser>({
        email: Cookies.get('rememberedEmail') || '',
        password: Cookies.get('rememberedPassword') || '',
        rememberMe: Cookies.get('rememberedMe') === 'true',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const validation = new Validation();
    const dispatch = useAppDispatch();
    const fields = loginFields(user);

    const handleConnect = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validation.isMail(user.email) || validation.isEmpty(user.password)) {
            setErrors({ message: "Veuillez saisir une adresse e-mail et un mot de passe valides." });
            return;
        }
        
        try {
            await dispatch(authenticateUser({ email: user.email, password: user.password, rememberMe: user.rememberMe })).unwrap();
            
            if (user.rememberMe) {
                Cookies.set('rememberedEmail', user.email, { expires: 7 });
                Cookies.set('rememberedPassword', user.password, { expires: 7 });
                Cookies.set('rememberedMe', 'true', { expires: 7 });
            } else {
                Cookies.remove('rememberedEmail');
                Cookies.remove('rememberedPassword');
                Cookies.remove('rememberedMe');
            }
            
            navigate('/');
        } catch (error) {
            console.log(error);
            setErrors(error as { [key: string]: string });
        }
    };

    const handleSign = (e: React.FormEvent): void => {
        e.preventDefault();
        navigate('/sign');
    };

    return (
        <div className='ds-flex ds-center ds-mt-30'>
            <form className='ds-blur4 ds-p-20 ds-border-radius-8 ds-w-35 ds-m-50 ds-box-shadow2' onSubmit={(e: FormEvent)=>e.preventDefault()}>
                <Text 
                    text='Connexion'
                    className='ds-flex ds-mb-30 ds-justify-around ds-text-primary'
                    type={TextType['type-4']}
                />
                {
  fields.map((field, index) => (
    <>
      {
        field.type === "check" ? (
          <>
            <Container key={index}>
              <Link to='/forgetPassword' className='ds-text-size-17 ds-flex ds-justify-end ds-mb-13 ds-text-primary'>
                Mot de passe oublié ?
              </Link>
            </Container>
            <Container>
              <Checkbox 
                label={field.label}
                className='ds-bg-white'
                labelClassName='ds-text-size-17'
                checked={field.value}
                disabled={false}
                type={TypeCheck.checkbox}
                onClick={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user,[field.name]: e.target.checked})}
              />
            </Container>
          </>
        ) : (
          <Container key={index}>
            <Input 
              label={field.label}
              containerClassName='ds-mb-13'
              type={field.name ==='password' ?  ETypesInput.password : ETypesInput.text}
              inputSize={ESizeInput.large}
              value={field.value as string}
              autoComplete={`current-${field.name}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({...user,[field.name]: e.target.value})}
            />
          </Container>
        )
      }
    </>
  ))
}
                      <FormFooter
                           errors ={errors}
                           text = 'Vous n’avez pas de compte'
                           button1= {{ text: 'Se connecter', handleButton1: (e: FormEvent<Element>) => handleConnect(e)}}
                           button2= {{ text: 'S’inscrire', handleButton2: (e: FormEvent<Element>) => handleSign(e) }}
                       />

                  
            </form>
        </div>
    );
}


       