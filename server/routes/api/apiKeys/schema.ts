import { z } from "zod";
import BaseSchema from "@server/routes/api/BaseSchema";

export const APIKeysCreateSchema = BaseSchema.extend({
  body: z.object({
    /** API Key name */
    name: z.string(),
  }),
});

export type APIKeysCreateReq = z.infer<typeof APIKeysCreateSchema>;

export const APIKeysDeleteSchema = BaseSchema.extend({
  body: z.object({
    /** API Key Id */
    id: z.string().uuid(),
  }),
});

export type APIKeysDeleteReq = z.infer<typeof APIKeysDeleteSchema>;
