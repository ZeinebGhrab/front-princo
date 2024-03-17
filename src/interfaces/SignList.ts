export const SignList = [
  {
    key: 'firstName',
    Validations: [
      {
        error: 'le prénom ne peut pas être vide', type: 'isNotEmpty'
      },
    ],
  },
  {
    key: 'lastName',
    validations: [
      {
        error: 'le nom ne peut pas être vide', type: 'isNotEmpty'
      },
    ],
  },
  {
    key: 'email',
    validations: [
      {
       error: 'Adresse e-mail invalide', type: 'isMail'
      },
    ],
  },
  {
    key: 'password',
    validations: [
      {
        error: 'le mot de passe ne peut pas être vide', type: 'isNotEmpty'
      },
    ],
  },
  {
    key: 'confirmPassword',
    validations: [
      {
        error: 'le mot de passe ne correspond pas', type: 'isNotEmpty'
      },
    ],
  },
  {
    key: 'confirm',
    validations: [
      {
        error: 'confirmer !', type: 'isNotEmpty'
      },
    ],
  },
];

