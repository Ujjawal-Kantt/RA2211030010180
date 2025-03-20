"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="p-4 bg-destructive/10 rounded-full text-destructive mb-4">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      <Button onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  )
}

