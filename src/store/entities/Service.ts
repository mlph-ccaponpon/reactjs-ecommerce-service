export interface Service {
    id?: string,
    timestamp?: number,
    name: string,
    category: string,
    providerUid: string,
    location: string,
    description: string,
    rating?: number
}