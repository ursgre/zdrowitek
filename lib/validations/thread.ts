import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().nonempty().min(4, { message: "Minimum 4 characters." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(4, { message: "Minimum 4 characters." }),
});