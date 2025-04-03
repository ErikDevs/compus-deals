import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .nonempty(),
  email: z.string().email("Invalid email format"),
  campusName: z.string().min(2, "Campus Name is required"),
  location: z.string().nonempty("Location is required"),
  phoneNumber: z.string().refine(
    (value) => {
      const phoneNumber = parsePhoneNumberFromString(value, "KE"); // Set country code (change "KE" if needed)
      return phoneNumber ? phoneNumber.isValid() : false;
    },
    {
      message: "Invalid phone number format",
    }
  ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  profilePhoto: z.string(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
