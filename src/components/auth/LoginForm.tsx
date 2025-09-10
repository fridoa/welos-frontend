"use client";

import useLogin from "@/hooks/useLogin";
import { cn } from "@/utils/cn";
import { Button, Spinner, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginForm = () => {
  const {
    control,
    errors,
    handleLogin,
    handleSubmit,
    isPendingLogin,
    isVisible,
    toogleVisibility,
  } = useLogin();

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
          <h2 className="mb-6 text-3xl font-bold text-emerald-600">Login</h2>

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
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Fullname"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisible ? "password" : "text"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className="flex h-full items-center justify-center focus:outline-none"
                      type="button"
                      onClick={toogleVisibility}
                    >
                      {isVisible ? (
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
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
            <p className="text-small mt-2 flex items-center justify-center">
              Don{"'"}t have an account?&nbsp;
              <Link
                href="/auth/login"
                className="font-semibold text-emerald-600"
              >
                Register
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
