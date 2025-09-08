import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "sign up",
  description: "Daftar akun",
};
const SignupPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default SignupPage;
