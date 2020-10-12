export interface Realm {
  name: string;
  displayName: string;
  enabled: boolean;
  userRegistration: boolean;
  editUsername: boolean;
  forgotPassword: boolean;
  rememberMe: boolean;
  verifyEmail: boolean;
  loginWithEmail: boolean;
}
