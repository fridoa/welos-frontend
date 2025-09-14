import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  otpCode: string;
}

interface IVerifyOtp {
  email: string;
  otpCode: string;
}

interface IApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type {
  IRegister,
  ILogin,
  IActivation,
  IVerifyOtp,
  IApiError,
  JWTExtended,
  SessionExtended,
  UserExtended,
};
