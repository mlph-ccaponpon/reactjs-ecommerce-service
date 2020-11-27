export interface User {
    uid?: string,
    timestamp?: number,
    name: string,
    email?: string,
    password?: string,
    role?: string
}

export const Role = {
    GUEST: {value: "GUEST", label: "Guest"},
    ADMIN: {value: "ADMIN", label: "Admin"},
    CUSTOMER: {value: "CUSTOMER", label: "Customer"},
    PROVIDER: {value: "PROVIDER", label: "Service Provider"}
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

