"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getVisitorId } from "@/lib/visitor-id"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Comment {
  id: string
  author: {
    name: string
    image: string
    initials: string
    visitorId: string
  }
  content: string
  date: string
  likes: number
  likedBy: string[]
}

interface CommentSectionProps {
  articleSlug: string
}

export function CommentSection({ articleSlug }: CommentSectionProps) {
  const { toast } = useToast()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [commentLikes, setCommentLikes] = useState<Record<string, { count: number; isLiked: boolean }>>({})
  const visitorId = getVisitorId()

  // Charger les commentaires au chargement du composant
  useEffect(() => {
    fetchComments()
  }, [articleSlug])

  // Récupérer les commentaires depuis l'API
  const fetchComments = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/comments?articleSlug=${articleSlug}&visitorId=${visitorId}`)
      const data = await response.json()

      if (response.ok) {
        setComments(data.comments)

        // Initialiser l'état des likes pour chaque commentaire
        const likesState: Record<string, { count: number; isLiked: boolean }> = {}
        data.comments.forEach((comment: Comment) => {
          likesState[comment.id] = {
            count: comment.likes,
            isLiked: comment.likedBy.includes(visitorId),
          }
        })
        setCommentLikes(likesState)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les commentaires. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Gérer le like d'un commentaire
  const handleLike = async (commentId: string) => {
    const currentLikeState = commentLikes[commentId] || { count: 0, isLiked: false }
    const action = currentLikeState.isLiked ? "unlike" : "like"

    // Optimistic update
    setCommentLikes({
      ...commentLikes,
      [commentId]: {
        count: action === "like" ? currentLikeState.count + 1 : currentLikeState.count - 1,
        isLiked: !currentLikeState.isLiked,
      },
    })

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "comment",
          id: commentId,
          visitorId,
          action,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Rollback en cas d'erreur
        setCommentLikes({
          ...commentLikes,
          [commentId]: currentLikeState,
        })
        throw new Error(data.error || "Une erreur est survenue")
      }
    } catch (error) {
      console.error("Erreur lors du like:", error)
      toast({
        title: "Erreur",
        description: "Impossible de liker ce commentaire. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  // Soumettre un nouveau commentaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleSlug,
          author: {
            name: authorName,
            image: "/placeholder.svg?height=40&width=40",
            initials: authorName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase(),
          },
          content: newComment,
          visitorId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue")
      }

      // Ajouter le nouveau commentaire à la liste
      setComments([data.comment, ...comments])
      setCommentLikes({
        ...commentLikes,
        [data.comment.id]: { count: 0, isLiked: false },
      })

      setNewComment("")

      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter votre commentaire. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Commentaires ({comments.length})</h2>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-medium mb-4">Ajouter un commentaire</h3>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="author-name">Votre nom</Label>
            <Input
              id="author-name"
              placeholder="Votre nom"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="comment-content">Votre commentaire</Label>
            <Textarea
              id="comment-content"
              placeholder="Partagez votre avis..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>
        </div>

        <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publication...
            </>
          ) : (
            "Publier le commentaire"
          )}
        </Button>

        <p className="text-xs text-muted-foreground mt-2">
          Votre commentaire sera visible par tous les visiteurs. Aucun compte n'est nécessaire.
        </p>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">Soyez le premier à commenter cet article !</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src={comment.author.image || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">{comment.date}</span>
                    </div>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 gap-1 px-2" onClick={() => handleLike(comment.id)}>
                      <ThumbsUp
                        className={`h-4 w-4 ${commentLikes[comment.id]?.isLiked ? "fill-blue-500 text-blue-500" : ""}`}
                      />
                      <span className={`text-xs ${commentLikes[comment.id]?.isLiked ? "text-blue-500" : ""}`}>
                        {commentLikes[comment.id]?.count || 0}
                      </span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <span className="text-xs">Répondre</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
