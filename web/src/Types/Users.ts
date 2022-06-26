export interface UserAttributes {
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface UserInfo {
  id: string;
  username: string;
  attributes: UserAttributes;
}
