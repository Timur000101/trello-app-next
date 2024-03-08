"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"

interface FormSubmitProps {
    children: React.ReactNode
    className?: string
    disabled?: boolean
    variant?: "default" | "primary" | "secondary" | "destructive" | "outline" | "ghost" | "link"
}


export const FormSubmit = ({
    children,
    className,
    disabled,
    variant = "primary"
}: FormSubmitProps) => {
    const { pending } = useFormStatus()

    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={variant}
            size="sm"
            className={cn(className)}
        >
            {children}
        </Button>
    )
}