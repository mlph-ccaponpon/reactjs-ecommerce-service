import { BaseResponse } from "./BaseResponse";

export interface User {
    uid?: string,
    name: string,
    email: string,
    password: string,
    role?: string
}

export const Role = {
    ADMIN: "ADMIN",
    CUSTOMER: "CUSTOMER",
    SERVICE: "PROVIDER"
}

