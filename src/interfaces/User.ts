export default interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    gander?: string,
    tel?: string,
    birthDate: Date,
    country: string,
    profile: string,
    password: string,
}