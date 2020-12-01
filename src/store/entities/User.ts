export interface User {
    uid?: string,
    timestamp?: number,
    name: string,
    email?: string,
    password?: string,
    role?: string,
    disabled: boolean
}

export const Role = {
    GUEST: {value: "GUEST", label: "GUEST"},
    ADMIN: {value: "ADMIN", label: "ADMIN"},
    CUSTOMER: {value: "CUSTOMER", label: "CUSTOMER"},
    PROVIDER: {value: "PROVIDER", label: "PROVIDER"}
}

export const GuestUserRoleOptions = [
    Role.CUSTOMER,
    Role.PROVIDER
]

export const AdminUserRoleOptions = [
    Role.ADMIN,
    Role.CUSTOMER,
    Role.PROVIDER
]

