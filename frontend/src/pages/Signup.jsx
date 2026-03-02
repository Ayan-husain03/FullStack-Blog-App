import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { signIn } from "@/helper/routesNames";
import { Link, useNavigate } from "react-router";
import api from "@/helper/api/api";
import GoogleLogin from "@/components/GoogleLogin";

function Signup() {
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(4, "name must be 4 char long"),
    email: z.string().email(),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be at most 8 characters"),
    confirmPassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmPassword,
        "password and confirm password must be same",
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data) {
    try {
      const response = await api.post("/user/register", data);
      toast.success("Create successful", {
        description: response.data?.message || "Your account has been created",
        duration: 2000,
      });
      form.reset();
      navigate(signIn);
    } catch (error) {
      console.log(error.response?.data?.message);

      toast.error("Something went wrong", {
        description: error.response?.data?.message,
        duration: 2000,
      });
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="md:w-lg w-md">
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-center sm:hidden font-semibold text-2xl">
            Create your account
          </h1>

          <CardHeader className="space-y-4">
            <CardTitle className="hidden sm:block text-2xl font-semibold">
              Create your account
            </CardTitle>

            <CardAction className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Already have an account?
              </span>

              <Link to={signIn}>
                <Button
                  variant="link"
                  className="p-1 cursor-pointer text-blue-600 h-auto font-medium"
                >
                  Login
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            {/* user name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="enter your username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="enter your email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="enter your password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>confirm password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="confirm password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Create account
            </Button>
            {/* Divider */}
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <GoogleLogin />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
