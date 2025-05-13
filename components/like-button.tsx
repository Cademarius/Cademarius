"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getVisitorId } from "@/lib/visitor-id"

interface LikeButtonProps {
  articleSlug: string
  initialLikes?: number
}

export function LikeButton({ articleSlug, initialLikes = 0 }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const visitorId = getVisitorId()

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà aimé cet article
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`/api/likes?type=article&id=${articleSlug}&visitorId=${visitorId}`)
        const data = await response.json()

        if (response.ok) {
          setLikes(data.likes)
          setIsLiked(data.isLiked)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du statut de like:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLikeStatus()
  }, [articleSlug, visitorId])

  const handleLike = async () => {
    if (isLoading) return

    // Optimistic update
    const newLikeCount = isLiked ? likes - 1 : likes + 1
    setLikes(newLikeCount)
    setIsLiked(!isLiked)

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "article",
          id: articleSlug,
          visitorId,
          action: isLiked ? "unlike" : "like",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Rollback en cas d'erreur
        setLikes(likes)
        setIsLiked(isLiked)
        throw new Error(data.error || "Une erreur est survenue")
      }

      toast({
        title: isLiked ? "Like retiré" : "Article aimé",
        description: isLiked ? "Vous n'aimez plus cet article." : "Merci d'avoir aimé cet article !",
      })
    } catch (error) {
      console.error("Erreur lors du like:", error)
      toast({
        title: "Erreur",
        description: "Impossible de liker cet article. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" className="gap-1" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Chargement...</span>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`gap-1 ${isLiked ? "bg-blue-500/10 border-blue-500 text-blue-500" : ""}`}
      onClick={handleLike}
    >
      <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-blue-500" : ""}`} />
      <span>{likes}</span>
    </Button>
  )
}
