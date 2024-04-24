export interface Offer {
    _id?: string,
    title: string,
    description: string,
    unitPrice: number,
    tva: number,
    discount: number,
    ticketsNumber: number,
    validityPeriod: number,
    admin: string | null | undefined,
}