export  type  UserRoleType =  'Admin' | 'Visitor'

export interface UserAccount {
    firstName: string;
    lastName: string;
    password?: string;
    email: string;
    role:UserRoleType;
    id: string;
}