// Système de gestion des articles sans backend

// Type pour les articles
export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: {
    name: string
    image: string
    initials: string
    role: string
  }
  category: string
  tags: string[]
  coverImage: string
  commentCount: number
  likeCount: number
}

// Articles de démonstration
const articles: Article[] = [
  {
    slug: "impact-expected-goals-analyse-moderne-football",
    title: "L'impact des Expected Goals (xG) sur l'analyse moderne du football",
    excerpt: "Une plongée approfondie dans la métrique qui a révolutionné l'analyse des performances en football.",
    content: `
      <p class="lead">Les Expected Goals (xG) ont révolutionné la façon dont nous analysons les performances en football. Cette métrique statistique offre une perspective plus nuancée que le simple comptage des buts.</p>
      
      <h2 id="definition-xg">Qu'est-ce que les Expected Goals?</h2>
      
      <p>Les Expected Goals (xG) sont une métrique statistique qui attribue à chaque occasion de but une probabilité (entre 0 et 1) qu'elle se termine par un but, en fonction de diverses caractéristiques comme:</p>
      
      <ul>
        <li>La distance du tir</li>
        <li>L'angle du tir</li>
        <li>La partie du corps utilisée</li>
        <li>Le type d'action (phase arrêtée, action construite, contre-attaque)</li>
        <li>La pression défensive</li>
      </ul>
      
      <figure>
        <img src="/placeholder.svg?height=400&width=800" alt="Visualisation des Expected Goals" class="rounded-lg w-full" />
        <figcaption class="text-sm text-center mt-2 text-muted-foreground">Visualisation des zones de tir et leur valeur xG associée</figcaption>
      </figure>
      
      <h2 id="importance-xg">Pourquoi les xG sont importants?</h2>
      
      <p>Les xG permettent d'évaluer la qualité des occasions créées et concédées, au-delà du simple résultat final. Un match peut se terminer sur un score de 1-0 alors que l'équipe perdante avait généré 2.5 xG contre 0.3 xG pour l'équipe gagnante.</p>
      
      <p>Cette métrique aide à:</p>
      
      <ul>
        <li>Évaluer la performance réelle d'une équipe au-delà du résultat</li>
        <li>Identifier les joueurs sous-performants ou sur-performants par rapport à leur xG</li>
        <li>Prédire les performances futures avec plus de précision</li>
      </ul>
      
      <blockquote>
        <p>"Les Expected Goals nous permettent de voir au-delà des résultats et de comprendre le processus qui mène à ces résultats."</p>
        <cite>— Arsène Wenger</cite>
      </blockquote>
      
      <h2 id="utilisation-clubs">Comment les clubs utilisent les xG</h2>
      
      <p>Les clubs professionnels utilisent désormais les xG comme un outil essentiel dans leur analyse:</p>
      
      <ul>
        <li>Pour évaluer les performances de l'équipe au-delà des résultats</li>
        <li>Pour identifier les joueurs efficaces dans la finition</li>
        <li>Pour repérer les talents sous-évalués sur le marché des transferts</li>
      </ul>
      
      <figure>
        <img src="/placeholder.svg?height=400&width=800" alt="Tableau de bord d'analyse xG" class="rounded-lg w-full" />
        <figcaption class="text-sm text-center mt-2 text-muted-foreground">Exemple de tableau de bord d'analyse xG utilisé par les clubs professionnels</figcaption>
      </figure>
      
      <h2 id="limites-xg">Limites des xG</h2>
      
      <p>Malgré leur utilité, les xG présentent certaines limites:</p>
      
      <ul>
        <li>Ils ne prennent pas en compte la qualité individuelle des finisseurs</li>
        <li>Les modèles varient selon les fournisseurs de données</li>
        <li>Ils ne capturent pas toutes les nuances du jeu (fatigue, conditions météo, etc.)</li>
      </ul>
      
      <h2 id="conclusion">Conclusion</h2>
      
      <p>Les Expected Goals ont transformé l'analyse du football en offrant une mesure objective de la qualité des occasions. Bien qu'imparfaits, ils constituent un outil précieux pour comprendre les performances au-delà des simples résultats et statistiques traditionnelles.</p>
      
      <p>Dans mes prochains articles, j'explorerai comment combiner les xG avec d'autres métriques avancées pour obtenir une vision encore plus complète du jeu.</p>
    `,
    date: "12 Mai 2023",
    author: {
      name: "Jean Dupont",
      image: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      role: "Data Analyst & Football Enthusiast",
    },
    category: "Analyse Statistique",
    tags: ["Expected Goals", "Performance", "Data Science", "Statistiques"],
    coverImage: "/placeholder.svg?height=400&width=800",
    commentCount: 24,
    likeCount: 156,
  },
]

// Fonction pour récupérer tous les articles
export function getAllArticles() {
  return articles
}

// Fonction pour récupérer un article par son slug
export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}

// Fonction pour rechercher des articles
export function searchArticles(query: string) {
  const lowerCaseQuery = query.toLowerCase()

  return articles.filter((article) => {
    // Recherche dans le titre
    if (article.title.toLowerCase().includes(lowerCaseQuery)) {
      return true
    }

    // Recherche dans l'extrait
    if (article.excerpt.toLowerCase().includes(lowerCaseQuery)) {
      return true
    }

    // Recherche dans le contenu
    if (article.content.toLowerCase().includes(lowerCaseQuery)) {
      return true
    }

    // Recherche dans les tags
    if (article.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))) {
      return true
    }

    // Recherche dans la catégorie
    if (article.category.toLowerCase().includes(lowerCaseQuery)) {
      return true
    }

    return false
  })
}

// Fonction pour récupérer tous les articles d'une catégorie
export function getArticlesByCategory(category: string) {
  return articles.filter((article) => article.category === category)
}

// Fonction pour récupérer tous les articles avec un tag spécifique
export function getArticlesByTag(tag: string) {
  return articles.filter((article) => article.tags.includes(tag))
}

// Fonction pour récupérer toutes les catégories uniques
export function getAllCategories() {
  return Array.from(new Set(articles.map((article) => article.category)))
}

// Fonction pour récupérer tous les tags uniques
export function getAllTags() {
  const allTags = articles.flatMap((article) => article.tags)
  return Array.from(new Set(allTags))
}

// Fonction pour récupérer les tags les plus populaires
export function getPopularTags(limit = 5) {
  const allTags = articles.flatMap((article) => article.tags)
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag)
}

// Fonction pour paginer les articles
export function getPaginatedArticles(page = 1, perPage = 6) {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedArticles = articles.slice(startIndex, endIndex)

  return {
    articles: paginatedArticles,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(articles.length / perPage),
      totalArticles: articles.length,
      hasNextPage: endIndex < articles.length,
      hasPrevPage: page > 1,
    },
  }
}
