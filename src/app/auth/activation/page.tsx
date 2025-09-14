import ActivationForm from "@/components/auth/OtpForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Activation",
  description: "Masuk ke akun Anda.",
};
const ActivationPage = () => {
  return (
    <div>
      <ActivationForm />
    </div>
  );
};

export default ActivationPage;
