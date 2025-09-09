import { IActivation, IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const authService = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),

  authentication: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/verification`, payload),
};

export default authService;
