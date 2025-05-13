"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Loader2, Mail } from "lucide-react"

export function NewsletterForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      toast({
        title: "Inscription réussie",
        description: "Merci de vous être abonné à notre newsletter !",
      })
      setEmail("")
      setIsSubmitting(false)
      setIsSubscribed(true)

      // Réinitialiser l'état après 3 secondes
      setTimeout(() => {
        setIsSubscribed(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
          <Mail className="h-5 w-5 text-blue-500" />
        </div>
        <h3 className="text-lg font-medium">Newsletter</h3>
      </div>

      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pr-10 h-11 border-blue-200 focus-visible:ring-blue-500"
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 h-11 px-6" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscription...
                </>
              ) : (
                "S'abonner"
              )}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="consent" className="rounded text-blue-500" required />
            <label htmlFor="consent" className="text-xs text-muted-foreground">
              J'accepte de recevoir des emails concernant les nouveaux articles et analyses.
            </label>
          </div>
        </form>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <p className="text-sm font-medium text-green-700 dark:text-green-300">
            Merci pour votre inscription ! Vous recevrez bientôt nos prochains articles.
          </p>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Nous respectons votre vie privée. Vous pourrez vous désabonner à tout moment.
        <br />
        Fréquence d'envoi : 1-2 emails par semaine.
      </p>
    </div>
  )
}
