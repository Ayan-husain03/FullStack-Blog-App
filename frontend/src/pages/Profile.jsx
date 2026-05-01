import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";
// import profile from "../assets/profile.png";

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [passwordChanging, setPasswordChanging] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const formSchema = z.object({
    name: z.string().min(3, "name must be 3 char long"),
    email: z.string().email(),
    bio: z.string().min(3, "bio must be 3 char long"),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be at most 8 characters")
      .optional(),
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
      const id = user?.user?._id;
      const res = await api.put(`/user/update-user`, data);
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
  useEffect(() => {
    if (user?.user) {
      form.reset({
        name: user.user.name || "",
        email: user.user.email || "",
        bio: user.user.bio || "",
        password: "",
      });
    }
  }, [user]);

  const handleFileUpload = (files) => {
    const file = files[0];
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  return (
    <Card className={"mx-auto max-w-screen-md "}>
      {/* header */}
      <CardHeader>
        <Dropzone onDrop={(acceptedFiles) => handleFileUpload(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Avatar className={"w-28 h-28 mx-auto relative group"}>
                <AvatarImage
                  src={
                    avatarPreview
                      ? avatarPreview
                      : user?.user?.avatar || "src/assets/profile.png"
                  }
                />
                <div className="bg-black/50  group-hover:flex w-full h-full z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden justify-center items-center cursor-pointer">
                  <Camera className="text-white" />
                </div>
                <AvatarFallback>
                  <img src="src/assets/profile.png" alt="" />
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </Dropzone>

        <CardAction>
          <Button onClick={() => setPasswordChanging(!passwordChanging)}>
            change Password
          </Button>
        </CardAction>
      </CardHeader>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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
          {passwordChanging && (
            <>
              {/* //* old password filed  */}
              <Controller
                name="oldPassword"
                type="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Old Password</FieldLabel>
                    <Input
                      type="password"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your oldPassword"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* // ? new password field */}
              <Controller
                name="newPassword"
                type="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                    <Input
                      type="password"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your new password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </>
          )}
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
