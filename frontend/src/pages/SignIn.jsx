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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { signUp } from "@/helper/routesNames";
import { Link } from "react-router";
import api from "@/helper/api/api";

function SignIn() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be at most 8 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data) {
    console.log(data);
    try {
      const res = await api.post("/user/login", data);
      console.log(res.data?.message);
      toast.success("User LogIn", {
        description: res.data?.message || "you have been login",
        duration: 2000,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error("Login Failed", {
        description: error.response?.data?.message || "Invalid credentials",
        duration: 2000,
      });
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="md:w-lg w-md">
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className={`text-2xl`}>Login</CardTitle>
            {/* <CardDescription>
              Enter you email and password below to login
            </CardDescription> */}
            <CardAction>
              <span className="text-sm text-gray-500">
                Don't have an Account
              </span>
              <Link to={signUp}>
                <Button
                  variant="link"
                  className="text-blue-600 p-1 cursor-pointer"
                >
                  Signup
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default SignIn;
