import { z } from "zod"

export const CreateThreadSchema = z.object({
  creator: z.string(),
  title: z.string(),
  postCount: z.number(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateThreadSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteThreadSchema = z.object({
  id: z.number(),
})
