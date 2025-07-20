import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Status variants para as soluções
        teste: "border-status-teste/30 bg-status-teste/20 text-status-teste",
        prototipo: "border-status-prototipo/30 bg-status-prototipo/20 text-status-prototipo", 
        parceria: "border-status-parceria/30 bg-status-parceria/20 text-status-parceria",
        live: "border-status-live/30 bg-status-live/20 text-status-live",
        conceito: "border-status-conceito/30 bg-status-conceito/20 text-status-conceito",
        usuarios: "border-status-usuarios/30 bg-status-usuarios/20 text-status-usuarios",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
