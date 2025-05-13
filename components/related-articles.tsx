import { ArticleCard } from "@/components/article-card"

interface RelatedArticlesProps {
  currentSlug: string
}

export function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  // Dans un vrai projet, vous récupéreriez les articles liés en fonction du slug actuel
  const relatedArticles = [
    {
      title: "Comment les données GPS transforment l'entraînement des joueurs",
      description:
        "Analyse de l'utilisation des données GPS pour optimiser les performances et prévenir les blessures.",
      date: "5 Mai 2023",
      commentCount: 18,
      likeCount: 87,
      imageUrl: "/placeholder.svg?height=200&width=300",
      slug: "donnees-gps-transformation-entrainement-joueurs",
    },
    {
      title: "Les modèles prédictifs appliqués au recrutement footballistique",
      description: "Comment les clubs utilisent le machine learning pour identifier les talents de demain.",
      date: "28 Avril 2023",
      commentCount: 32,
      likeCount: 124,
      imageUrl: "/placeholder.svg?height=200&width=300",
      slug: "modeles-predictifs-recrutement-footballistique",
    },
    {
      title: "Analyse tactique : le pressing haut à travers les données",
      description: "Décryptage des systèmes de pressing des meilleures équipes européennes.",
      date: "15 Avril 2023",
      commentCount: 27,
      likeCount: 98,
      imageUrl: "/placeholder.svg?height=200&width=300",
      slug: "analyse-tactique-pressing-haut-donnees",
    },
  ].filter((article) => article.slug !== currentSlug)

  return (
    <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
      {relatedArticles.map((article) => (
        <ArticleCard
          key={article.slug}
          title={article.title}
          description={article.description}
          date={article.date}
          commentCount={article.commentCount}
          likeCount={article.likeCount}
          imageUrl={article.imageUrl}
          slug={article.slug}
        />
      ))}
    </div>
  )
}
