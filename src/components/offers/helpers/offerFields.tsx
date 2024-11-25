import { Offer } from "../../../interfaces/Offer";

export const offerFields = (change: Offer) => [
    {
      label: 'Titre',
      value: change?.title,
      name: 'title',
    },
    {
      label: 'Description',
      value: change?.description,
      name: 'description',
      type:'text',
    },
    {
        label: 'Nombre de tickets',
        value: change?.ticketsNumber,
        name: 'ticketsNumber',
        type: 'number',
      },
    {
        label: 'Période de validité',
        value: change?.validityPeriod,
        name: 'validityPeriod',
        type: 'number',
      },
    {
      label: 'Prix unitaire',
      value: change?.unitPrice,
      name: 'unitPrice',
      type: 'number',
    },
    {
      label: 'Remise',
      value: change?.discount,
      name: 'discount',
      type: 'number',
    },
    {
      label: 'TVA',
      value: change?.tva,
      name: 'tva',
      type: 'number',
    },
];
