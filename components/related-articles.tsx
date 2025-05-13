import { ArticleCard } from "@/components/article-card"
import { getAllArticles } from "@/lib/articles"

interface RelatedArticlesProps {
  currentSlug: string
}

export function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  // Récupérer l'article actuel
  const currentArticle = getAllArticles().find((article) => article.slug === currentSlug)

  if (!currentArticle) {
    return null
  }

  // Trouver des articles similaires basés sur les tags et la catégorie
  const relatedArticles = getAllArticles()
    .filter((article) => {
      // Exclure l'article actuel
      if (article.slug === currentSlug) return false

      // Vérifier si l'article partage des tags avec l'article actuel
      const sharedTags = article.tags.filter((tag) => currentArticle.tags.includes(tag))

      // Considérer comme similaire si même catégorie ou au moins un tag en commun
      return sharedTags.length > 0 || article.category === currentArticle.category
    })
    // Trier par pertinence (nombre de tags en commun)
    .sort((a, b) => {
      const aSharedTags = a.tags.filter((tag) => currentArticle.tags.includes(tag)).length
      const bSharedTags = b.tags.filter((tag) => currentArticle.tags.includes(tag)).length

      // Si même nombre de tags, trier par date (plus récent d'abord)
      if (aSharedTags === bSharedTags) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }

      return bSharedTags - aSharedTags
    })
    // Limiter à 3 articles
    .slice(0, 3)

  // Ne rien afficher s'il n'y a pas d'articles similaires
  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
      {relatedArticles.map((article) => (
        <ArticleCard
          key={article.slug}
          title={article.title}
          description={article.excerpt}
          date={article.date}
          commentCount={article.commentCount}
          likeCount={article.likeCount}
          imageUrl={article.coverImage}
          slug={article.slug}
        />
      ))}
    </div>
  )
}
