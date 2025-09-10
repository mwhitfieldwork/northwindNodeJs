
export interface AuthUser {
    UserName: string;
    PKID: number;
    admin: number;
}

export interface AuthDetail{
    user: AuthUser;
}
export interface Authentication {
    data: AuthDetail;
    success: string;
}