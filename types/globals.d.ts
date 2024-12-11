export {}
declare global {
    interface CustomJwtSessionclaims {
        fullName?: string;
        email?: string;
        image?: string;
    }
}