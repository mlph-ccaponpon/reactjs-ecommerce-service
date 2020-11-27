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
    PROVIDER: "PROVIDER"
}

export const UserRoleOptions = [
    {
        label: "Customer",
        value: Role.CUSTOMER
    },
    {
        label: "Service Provider",
        value: Role.PROVIDER
    }

]

