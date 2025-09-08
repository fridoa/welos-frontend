"use client"

import authService from "@/services/auth.service";
import { IRegister } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
    return await authService.register(payload);
  };

  const { mutate: mutateRegister, isPending: isPendingRegsiter } = useMutation({
    mutationFn: registerService,

    onError(error) {
      setError("root", {
        message: error.message,
      });
    },

    onSuccess: () => {
      router.push("/auth/activation");
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
