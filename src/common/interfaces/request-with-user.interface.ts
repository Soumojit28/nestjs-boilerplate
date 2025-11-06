import { Request } from 'express';

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName?: string;
  isVerified?: boolean;
}

export interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}
