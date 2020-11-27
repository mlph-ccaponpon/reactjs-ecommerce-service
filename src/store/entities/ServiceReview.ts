import { User } from "./User";

export interface ServiceReview {
    timestamp?: number,
    comment: string,
    rating: number,
    user: User
}