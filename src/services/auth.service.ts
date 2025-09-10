import { IActivation, ILogin, IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const authService = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),

  authentication: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/verification`, payload),

  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),

  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default authService;
