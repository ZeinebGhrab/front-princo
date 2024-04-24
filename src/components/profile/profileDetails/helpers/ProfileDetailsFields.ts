import ProfileField from "../../../../interfaces/ProfileFields";
import EditUser from "../../../../interfaces/user/EditUser";
import moment from 'moment';

export const profileDetailsFields = (data: EditUser | undefined, edit: boolean): ProfileField[] => {
  let profileFields: ProfileField[] = [
    {
      label: 'Adresse mail',
      value: data?.email,
      name:'email',
      className: 'ds-text-size-15'
    },
    {
      label: 'Identité de genre',
      type: 'radio',
      name:'gender',
      value: data?.gender,
      options: [
        { label: 'Homme', value: 'Homme' },
        { label: 'Femme', value: 'Femme' }
      ],
      className: 'ds-text-size-15'
    },
    {
      label: 'Date de naissance',
      type: 'date',
      name:'birthDate',
      value: moment(data?.birthDate as Date).format("DD/MM/YYYY"),
      className: 'ds-text-size-15'
    },
    {
      label: 'N° de téléphone',
      type: 'number',
      name:'tel',
      value: data?.tel,
      className: 'ds-text-size-15'
    },
    {
      label: 'Pays / Région',
      value: data?.country,
      name:'country',
      className: 'ds-text-size-15'
    },
    {
      label: 'Profil',
      value: data?.profile,
      name:'profile',
      className: 'ds-text-size-15'
    }
  ];

  const nameFields = [
    {
      label: 'Prénom',
      value: `${data?.firstName}`,
      name: 'firstName',
      className: 'ds-text-size-15'
    },
    {
      label: 'Nom',
      value: `${data?.lastName}`,
      name :'lastName',
      className: 'ds-text-size-15'
    }
  ];

  const fullNameField = [
    {
      label: 'Nom et prénom',
      value: `${data?.firstName} ${data?.lastName}`,
      className: 'ds-text-size-15'
    }
  ];

  if (edit) {
    profileFields = [...nameFields, ...profileFields];
  } else {
    profileFields = [...fullNameField, ...profileFields];
  }

  return profileFields;
};

