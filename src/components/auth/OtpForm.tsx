"use client";

import useVerify from "@/hooks/useVerify";
import { cn } from "@/utils/cn";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";

const ActivationForm = () => {
  const { control, errors, handleSubmit, isPendingVerify, onSubmit, email } =
    useVerify();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/illustrations/activation.png"
          alt="OTP Illustration"
          className="w-2/3 lg:w-full"
          width={500}
          height={500}
        />
      </div>

      <Card className="w-full max-w-sm rounded-2xl p-6 shadow-lg">
        <CardBody>
          <div className="text-left">
            <h2 className="mb-2 text-3xl font-bold text-emerald-600">
              Authentication Code
            </h2>
            <p className="text-default-500">
              Silakan masukkan kode verifikasi yang dikirim ke: &nbsp;
              <span className="text-default-700 font-semibold">{email}</span>
            </p>
          </div>

          {errors.root && (
            <p className="text-danger-500 mb-2 font-medium">
              {errors?.root?.message}
            </p>
          )}

          <form
            className={cn(
              "mt-6 flex w-full flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="otpCode"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Kode OTP"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.otpCode !== undefined}
                  errorMessage={errors.otpCode?.message}
                />
              )}
            />

            <Button
              className="mt-4 w-full bg-emerald-600 text-white"
              size="lg"
              type="submit"
            >
              {isPendingVerify ? <Spinner color="white" size="sm" /> : "Verify"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ActivationForm;