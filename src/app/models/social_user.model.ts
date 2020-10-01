export interface OAuthSocialUser{
    id: string;
    email: string;
    name: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    authToken: string;
    idToken?: string;
    authorizationCode?: string;
    provider?: string;
    clientId?:string;
    clientSecret?:string;
    realm?:string;
}