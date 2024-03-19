import { EListFunction } from "@piximind/custom-hook";

export const EditProfileList = [
  {
    key: 'firstName',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isNotEmpty,
        messageError: 'Veuillez saisir un prénom.'
      },
    ],
  },
  {
    key: 'lastName',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isNotEmpty,
        messageError: 'Veuillez saisir un nom.'
      },
    ],
  },
  {
    key: 'email',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isMail,
        messageError: 'Veuillez saisir un adresse email valide.'
      },
    ],
  },
  {
    key: 'password',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isNotEmpty,
        messageError: 'Veuillez saisir un mot de passe.'
      },
    ],
  },
  {
    key: 'confirmPassword',
    value: '',
    isRealTimeValidation: true,
    rules: [
      {
        priority: 1,
        function: EListFunction.isNotEmpty,
        messageError: ''
      },
    ],
  },

];

