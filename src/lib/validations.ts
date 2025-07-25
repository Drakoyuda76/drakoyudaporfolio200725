import { z } from 'zod';

export const solutionSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  subtitle: z.string().max(300, 'Subtítulo muito longo').optional(),
  description: z.string().min(1, 'Descrição é obrigatória').max(2000, 'Descrição muito longa'),
  problemSolution: z.string().max(2000, 'Solução muito longa').optional(),
  humanImpact: z.string().max(1000, 'Impacto humano muito longo').optional(),
  sustainabilityImpact: z.string().max(1000, 'Impacto de sustentabilidade muito longo').optional(),
  timesSaved: z.string().max(100, 'Tempo economizado muito longo').optional(),
  usersImpacted: z.string().max(100, 'Usuários impactados muito longo').optional(),
  businessAreaImpact: z.array(z.string()).default([]),
  sdgGoals: z.array(z.number()).default([]),
  status: z.enum(['draft', 'active', 'archived']).default('active'),
  images: z.array(z.string().url('URL de imagem inválida')).default([]),
});

export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Arquivo deve ter no máximo 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Apenas imagens JPEG, PNG e WebP são permitidas'
    ),
});

export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '');
};

export type SolutionFormData = z.infer<typeof solutionSchema>;