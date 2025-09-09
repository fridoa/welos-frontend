"use client";

import authService from "@/services/auth.service";
import { IActivation, IVerifyOtp } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const verifySchema = yup.object().shape({
  otpCode: yup
    .string()
    .min(6, "Kode OTP minimal 6 karakter")
    .required("Kode OTP wajib diisi"),
});

const useVerify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<IActivation>({
    resolver: yupResolver(verifySchema),
  });

  const { mutate: mutateVerify, isPending: isPendingVerify } = useMutation({
    mutationFn: (payload: IVerifyOtp) => authService.authentication(payload),
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },

    onSuccess: () => {
      router.push("/auth/activation/success?status=activation_success");
      reset();
    },
  });

  const onSubmit: SubmitHandler<IActivation> = (formData) => {
    if (!email) {
      setError("root", {
        message: "Email tidak ditemukan. Silakan coba registrasi ulang.",
      });
      return;
    }
    const payload: IVerifyOtp = {
      ...formData,
      email: email,
    };

    mutateVerify(payload);
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    isPendingVerify,
    email,
  };
};

export default useVerify;
