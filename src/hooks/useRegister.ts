"use client";

import authService from "@/services/auth.service";
import { IApiError, IRegister } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import * as yup from "yup";

interface IRegisterResponse {
  message: string;
  data: {
    email: string;
  };
}

const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Fullname wajib diisi")
    .min(3, "Fullname minimal 3 karakter"),
  username: yup
    .string()
    .required("Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
  email: yup
    .string()
    .required("Email wajib diisi")
    .email("Format email tidak valid"),
  password: yup
    .string()
    .required("Password wajib diisi")
    .min(6, "Pasword minimal 6 karakter"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), " "], "Konfirmasi password tidak sesuai")
    .required("Konfirmasi pasword wajib diisi"),
});

const useRegister = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const response = await authService.register(payload);
    return response.data;
  };

  const { mutate: mutateRegister, isPending: isPendingRegsiter } = useMutation<
    IRegisterResponse,
    IApiError,
    IRegister
  >({
    mutationFn: registerService,

    onError(error) {
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan";

      if (errorMessage.toLowerCase().includes("email")) {
        toast.warning("Email ini sudah terdaftar", {
          position: "top-right",
          autoClose: 1400,
          theme: "light",
          transition: Bounce,
        });
        setError("email", { type: "server", message: errorMessage });
      } else if (errorMessage.toLowerCase().includes("username")) {
        toast.warning("Username ini sudah digunakan", {
          position: "top-right",
          autoClose: 1400,
          theme: "light",
          transition: Bounce,
        });
        setError("username", { type: "server", message: errorMessage });
      } else {
        setError("root", { type: "server", message: errorMessage });
      }
    },

    onSuccess: (response) => {
      toast.success("Registrasi berhasil", {
        position: "top-right",
        autoClose: 1400,
        theme: "light",
        transition: Bounce,
      });
      const userEmail = response?.data?.email;

      router.push(`/auth/activation?email=${userEmail}`);

      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    control,
    handleSubmit,
    handleRegister,
    errors,
    isPendingRegsiter,
  };
};

export default useRegister;
