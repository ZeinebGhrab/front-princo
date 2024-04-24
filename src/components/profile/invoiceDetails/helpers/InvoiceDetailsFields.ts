import ProfileInvoiceDetails from "../../../../interfaces/user/InvoiceDetails";

export const InvoiceDetailsFields = (data:  ProfileInvoiceDetails | undefined) => [
    {
        label: 'Raison Sociale',
        value: `${data?.legalName}`,
        name: 'legalName',
        className: 'ds-text-size-15'
      },
      {
        label: 'Matricule fiscale',
        value: `${data?.fiscalId}`,
        name:'fiscalId',
        className: 'ds-text-size-15'
      },
      {
        label: 'Adresse du siège social',
        value: `${data?.adress}`,
        name: 'adress',
        className: 'ds-text-size-15'
      },
      {
        label: 'Pays',
        value: `${data?.country}`,
        name: 'country',
        className: 'ds-text-size-15'
      },
      {
        label: 'Ville',
        value: `${data?.city}`,
        name: 'city',
        className: 'ds-text-size-15'
      },
      {
        label: 'Code Postal',
        value: `${data?.postalCode}`,
        name: 'postalCode',
        className: 'ds-text-size-15'
      },
]