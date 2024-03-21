import ProfileInvoiceDetails from "./InvoiceDetails";

export default interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender?: string,
    tel?: string,
    birthDate?: string,
    country?: string,
    profile?: string,
    password: string,
    invoiceDetails? : ProfileInvoiceDetails
}