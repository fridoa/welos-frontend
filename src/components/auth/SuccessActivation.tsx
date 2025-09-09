"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessActivation = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/illustrations/success.png"
          alt="logo"
          width={400}
          height={400}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-emerald-600">
          Akun berhasil diaktifkan
        </h1>
        <p className="text-default-500 text-xl font-bold">
          Masuk sekarang dan temukan kendaraan terbaik bersama Welos Rental.
        </p>
        <Button
          className="mt-4 w-fit bg-emerald-600 font-semibold text-white"
          variant="bordered"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SuccessActivation;
