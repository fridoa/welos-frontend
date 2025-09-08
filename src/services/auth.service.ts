import { IRegister } from "@/types/Auth";
import endpoint from "./endpoint.constant";
import instance from "@/libs/axios/instance";

const authService = {
  register: (payload: IRegister) => {
    instance.post(`${endpoint.AUTH}/register`, payload);
  },
};

export default authService;
