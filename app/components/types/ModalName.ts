import { z } from "zod"
import { modalNameSchema } from '../schemas/modalNameSchema'

export type ModalName = z.infer<typeof modalNameSchema>
