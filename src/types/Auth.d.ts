interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

export type { IRegister, IActivation, IVerifyOtp, IApiError };
