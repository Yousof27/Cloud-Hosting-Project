import z, { ZodError } from "zod";

// Create New Article
export const createArticleSchema = z.object({
  title: z.string().min(2, "يجب أن لا يقل العنوان عن حرفان").max(200),
  description: z.string().min(10),
});

export type CreateArticleDto = z.infer<typeof createArticleSchema>;

// Update Article
export const updateArticleSchema = z.object({
  title: z.string().min(2, "يجب أن لا يقل العنوان عن حرفان").max(200).optional(),
  description: z.string().min(10).optional(),
});

export type UpdateArticleDto = z.infer<typeof updateArticleSchema>;

// Register A New User
export const registerSchema = z.object({
  username: z.string().min(2).max(20),
  email: z.email(),
  password: z.string().min(6),
});

export type RegisterDto = z.infer<typeof registerSchema>;

// Login User
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof loginSchema>;

// Update User Profile
export const updateProfileSchema = z.object({
  username: z.string().min(2).max(20).optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

// Create Comment
export const createCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;

// Update Comment
export const updateCommentSchema = z.object({
  text: z.string().min(2).max(500).optional(),
});

export type UpdateCommentDto = z.infer<typeof updateCommentSchema>;

// Format Zod Error Function
export function zodErrorFormater(error: ZodError) {
  const messages = error.issues.map((err) => `${err.path.join(".")}: ${err.message}`);
  return messages.join("\n");
}
