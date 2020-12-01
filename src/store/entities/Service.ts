import { ServiceReview } from "./ServiceReview";

export interface Service {
    id?: string,
    timestamp?: number,
    name: string,
    category: string,
    providerUid: string,
    providerName: string,
    imageUrl: string,
    location: string,
    description: string,
    rating: number,
    reviews?: ServiceReview[]
}

export const RATING_MIN = 1;
export const RATING_MAX = 5;