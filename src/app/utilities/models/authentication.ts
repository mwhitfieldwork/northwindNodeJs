
export interface AuthUser {
    UserName: string;
    PKID: number;
    admin: boolean;
}

export interface AuthDetail{
    user: AuthUser;
}
export interface Authentication {
    data: AuthDetail;
    success: string;
}