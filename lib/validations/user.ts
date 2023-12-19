import * as z from "zod";

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z
      .string()
      .min(2, { message: "Minimum 2 characters." })
      .max(20, { message: "Maximum 20 caracters." }),
    username: z
      .string()
      .min(2, { message: "Minimum 2 characters." })
      .max(20, { message: "Maximum 20 caracters." }),
    bio: z
      .string()
      .min(0, { message: "Minimum 0 characters." })
      .max(1000, { message: "Maximum 1000 caracters." }),
  });