import { z } from "zod";
import { BaseSchema, ProsemirrorSchema } from "@server/routes/api/schema";

const BaseIdSchema = z.object({
  /** Comment Id */
  id: z.string().uuid(),
});

const CommentsSortParamsSchema = z.object({
  /** Specifies the attributes by which comments will be sorted in the list */
  sort: z
    .string()
    .refine((val) => ["createdAt", "updatedAt"].includes(val))
    .default("createdAt"),

  /** Specifies the sort order with respect to sort field */
  direction: z
    .string()
    .optional()
    .transform((val) => (val !== "ASC" ? "DESC" : val)),
});

export const CommentsCreateSchema = BaseSchema.extend({
  body: z.object({
    /** Allow creation with a specific ID */
    id: z.string().uuid().optional(),

    /** Create comment for this document */
    documentId: z.string(),

    /** Create comment under this parent */
    parentCommentId: z.string().uuid().optional(),

    /** Create comment with this data */
    data: ProsemirrorSchema,
  }),
});

export type CommentsCreateReq = z.infer<typeof CommentsCreateSchema>;

export const CommentsUpdateSchema = BaseSchema.extend({
  body: BaseIdSchema.extend({
    /** Update comment with this data */
    data: ProsemirrorSchema,
  }),
});

export type CommentsUpdateReq = z.infer<typeof CommentsUpdateSchema>;

export const CommentsDeleteSchema = BaseSchema.extend({
  body: BaseIdSchema,
});

export type CommentsDeleteReq = z.infer<typeof CommentsDeleteSchema>;

export const CommentsListSchema = BaseSchema.extend({
  body: CommentsSortParamsSchema.extend({
    /** Id of a document to list comments for */
    documentId: z.string().optional(),
    collectionId: z.string().uuid().optional(),
  }),
});

export type CommentsListReq = z.infer<typeof CommentsListSchema>;

export const CommentsInfoSchema = z.object({
  body: BaseIdSchema,
});

export type CommentsInfoReq = z.infer<typeof CommentsInfoSchema>;
