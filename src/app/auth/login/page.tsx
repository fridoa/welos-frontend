import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Masuk ke akun Anda.",
};
const SigninPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default SigninPage;
