export interface Service {
    id?: string,
    name: string,
    category: string,
    providerUid: string,
    location: string,
    description: string,
    rating?: number
}