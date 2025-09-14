import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
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
