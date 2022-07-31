export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}

export interface AccessTokenPayload {
  userId: number;
  userName: string;
}
