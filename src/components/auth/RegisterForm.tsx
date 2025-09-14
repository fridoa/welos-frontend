"use client";

import { usePasswordVisible } from "@/hooks/usePasswordVisible";
import useRegister from "@/hooks/useRegister";
import { cn } from "@/utils/cn";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const RegisterForm = () => {
  const { control, errors, handleRegister, handleSubmit, isPendingRegsiter } =
    useRegister();

  const { handleVisiblePassword, visiblePassword } = usePasswordVisible();
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/illustrations/login.png"
          alt="logo"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-6">
          <h2 className="mb-6 text-3xl font-bold text-emerald-600">
            Create Account
          </h2>

          {errors.root && (
            <p className="text-danger-500 mb-2 font-medium">
              {errors?.root?.message}
            </p>
          )}

          <form
            action=""
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Fullname"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "password" : "text"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="flex h-full items-center justify-center focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                      ) : (
                        <FaEye className="text-default-400 pointer-events-none text-xl" />
                      )}
                    </button>
                  }
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.confirmPassword ? "password" : "text"}
                  label="Confirm Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                  endContent={
                    <button
                      className="flex h-full items-center justify-center focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                      ) : (
                        <FaEye className="text-default-400 pointer-events-none text-xl" />
                      )}
                    </button>
                  }
                />
              )}
            />

            <Button
              className="mt-4 bg-emerald-600 text-white"
              size="lg"
              type="submit"
            >
              {isPendingRegsiter ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
            <p className="text-small mt-2 flex items-center justify-center">
              Have an account?&nbsp;
              <Link
                href="/auth/login"
                className="font-semibold text-emerald-600"
              >
                Login
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterForm;
