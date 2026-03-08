import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //   console.log(user);
  const formSchema = z.object({
    name: z.string().min(3, "name must be 3 char long"),
    email: z.string().email(),
    bio: z.string().min(3, "bio must be 3 char long"),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be at most 8 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });
  async function onSubmit(data) {
    try {
      const res = await api.post("/user/login", data);
      // console.log(res.data?.message);
      toast.success("User LogIn", {
        description: res.data?.message || "you have been login",
        duration: 2000,
      });
      dispatch(setUser(res.data?.data));
      // console.log(res.data?.data);
      // console.log("outdated", user);
      navigate(RouteIndex);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error("Login Failed", {
        description: error.response?.data?.message || "Invalid credentials",
        duration: 2000,
      });
    }
  }
  return (
    <Card className={"mx-auto max-w-screen-md "}>
      {/* header */}
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <Avatar className={"w-28 h-28 mx-auto"}>
            <AvatarImage
              src={user?.user?.avatar || "/src/assets/profile.png"}
            />
          </Avatar>
        </CardHeader>
        {/* content */}
        <CardContent>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Username"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* 2nd filed */}
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
                  placeholder="example@gmail.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* third */}
          <Controller
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Add bio"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* fourth */}
          <Controller
            name="password"
            type="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  type="password"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
        {/* footer */}
        <CardFooter>
          <Button type="submit">Save changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default Profile;
