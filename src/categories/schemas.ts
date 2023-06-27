import { z } from "zod"

export const CreateCategorySchema = z.object({
  name: z.string(),
  color: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateCategorySchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteCategorySchema = z.object({
  id: z.number(),
})
