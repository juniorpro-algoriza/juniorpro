import { z } from 'zod';
import { modalPaths } from '../lib/modalPaths';

export const modalNames = Object.keys(modalPaths) as [keyof typeof modalPaths];

export const modalNameSchema = z.enum(modalNames);
