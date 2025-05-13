"use client"

import { useEffect, useState } from "react"
import { RelatedArticles } from "@/components/related-articles"
import { getAllArticles } from "@/lib/articles"

interface RelatedArticlesSectionProps {
  currentSlug: string
}

export function RelatedArticlesSection({ currentSlug }: RelatedArticlesSectionProps) {
  const [hasRelatedArticles, setHasRelatedArticles] = useState(false)

  useEffect(() => {
    // Vérifier s'il y a des articles similaires
    const currentArticle = getAllArticles().find((article) => article.slug === currentSlug)

    if (!currentArticle) {
      setHasRelatedArticles(false)
      return
    }

    // Trouver des articles similaires basés sur les tags et la catégorie
    const relatedArticles = getAllArticles().filter((article) => {
      // Exclure l'article actuel
      if (article.slug === currentSlug) return false

      // Vérifier si l'article partage des tags avec l'article actuel
      const sharedTags = article.tags.filter((tag) => currentArticle.tags.includes(tag))

      // Considérer comme similaire si même catégorie ou au moins un tag en commun
      return sharedTags.length > 0 || article.category === currentArticle.category
    })

    setHasRelatedArticles(relatedArticles.length > 0)
  }, [currentSlug])

  // Ne rien afficher s'il n'y a pas d'articles similaires
  if (!hasRelatedArticles) {
    return null
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Articles similaires</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl">
            Découvrez d'autres analyses qui pourraient vous intéresser.
          </p>
        </div>
      </div>
      <RelatedArticles currentSlug={currentSlug} />
    </>
  )
}
