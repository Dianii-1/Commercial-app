import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "El título es obligatorio, debe contener minimo 5 acaracteres"),

  body: z
    .string()
    .min(
      10,
      "La descripción es obligatoria, debe contener minimo 10 acaracteres"
    ),
});

export type PostSchema = z.infer<typeof postSchema>;
