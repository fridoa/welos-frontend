"use client";

import { ILogin } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Email atau username wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(true);
  const toogleVisibility = () => setIsVisible(!isVisible);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    if (result?.error && result?.status === 401) {
      throw new Error("Email atau username salah");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },

    onSuccess: () => {
      toast.success("Registrasi berhasil", {
        position: "top-right",
        autoClose: 1400,
        theme: "light",
        transition: Bounce,
      });
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
    isVisible,
    toogleVisibility,
  };
};

export default useLogin;
