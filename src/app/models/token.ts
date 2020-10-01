export interface Token {
  username: string;
  access_token: string;
  token_expire_time: number;
  refresh_token: string;
  refresh_token_expire_time: number;
  provider: string;
}
