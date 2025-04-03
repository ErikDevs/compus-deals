"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      fullName: "",
      email: "",
      phoneNumber: "",
      campusName: "",
      location: "",
      password: "",
      profilePhoto: "",
    }}
    onSubmit={signUp}
    campusName={""}
    phoneNumber={""}
    location={""}
    profilePhoto={""}
  />
);

export default page;
