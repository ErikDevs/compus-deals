"use server";
import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import * as bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) return { success: false, error: result.error };

    return { success: true };
  } catch (error) {
    console.error(error, "Signup error");
    return {
      success: false,
      error: "an error occured when trying to create the user",
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const {
    fullName,
    email,
    password,
    campusName,
    location,
    profilePhoto,
    phoneNumber,
  } = params;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser.length > 0)
    return { success: false, error: "there exists a user with that email" };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(usersTable).values({
      fullName,
      email,
      phoneNumber,
      campusName,
      password: hashedPassword,
      profilePhoto,
      location,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.error(error, "Signup error");
    return {
      success: false,
      error: "an error occured when trying to create the user",
    };
  }
};
