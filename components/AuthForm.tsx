"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ImageUpload from "./ImageUpload";

import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  defaultValues: T;
  campusName: string;
  phoneNumber: string;
  location: string;
  profilePhoto: string;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const router = useRouter();
  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      if (isSignIn) {
        toast.success(
          <div className="text-green-500">You have successfully signed in.</div>
        );
      } else {
        toast.success(
          <div className="text-green-500">You have succesffully signed up.</div>
        );
      }
    } else {
      toast.error(`${result.error}`);
    }

    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        {isSignIn ? "Welcome back to My Campus Home" : "Create an account"}
      </h1>
      <p className="font-light">
        {isSignIn
          ? "Login to see what students near you would like to sell"
          : "Please ensure you provide valid information to gain access to the platform"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "profilePhoto" ? (
                      <ImageUpload className="" onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button className="w-full p-5" type="submit">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-base font-medium">
          {isSignIn ? "New to My Campus Home? " : "Already have an account? "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold "
          >
            {isSignIn ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default AuthForm;
