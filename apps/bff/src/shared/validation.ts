import { ZodError, type ZodType } from 'zod';
import { BadRequestError } from './errors.js';

export function parseWithSchema<T>(schema: ZodType<T>, input: unknown): T {
  try {
    return schema.parse(input);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw new BadRequestError(error.issues.map((issue) => issue.message).join('; '));
    }

    throw error;
  }
}
