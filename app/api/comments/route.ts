import { NextResponse } from "next/server"

// Simuler une base de données pour les commentaires
let comments: any[] = [
  {
    id: "1",
    articleSlug: "impact-expected-goals-analyse-moderne-football",
    author: {
      name: "Sophie Martin",
      image: "/placeholder.svg?height=40&width=40",
      initials: "SM",
      visitorId: "visitor-123",
    },
    content:
      "Excellente analyse ! J'utilise les xG depuis quelques années et je trouve que c'est vraiment un outil puissant pour comprendre les performances au-delà des simples résultats.",
    date: "Il y a 2 jours",
    likes: 12,
    likedBy: ["visitor-456", "visitor-789"],
  },
  {
    id: "2",
    articleSlug: "impact-expected-goals-analyse-moderne-football",
    author: {
      name: "Thomas Dubois",
      image: "/placeholder.svg?height=40&width=40",
      initials: "TD",
      visitorId: "visitor-456",
    },
    content:
      "Je serais curieux de savoir quel modèle d'xG vous trouvez le plus fiable ? J'hésite entre StatsBomb et Opta...",
    date: "Il y a 3 jours",
    likes: 8,
    likedBy: ["visitor-123"],
  },
  {
    id: "3",
    articleSlug: "impact-expected-goals-analyse-moderne-football",
    author: {
      name: "Léa Bernard",
      image: "/placeholder.svg?height=40&width=40",
      initials: "LB",
      visitorId: "visitor-789",
    },
    content:
      "Super article ! Est-ce que vous pourriez faire un article similaire sur les Expected Assists (xA) ? Je trouve que c'est une métrique tout aussi intéressante mais moins connue.",
    date: "Il y a 5 jours",
    likes: 15,
    likedBy: ["visitor-123", "visitor-456"],
  },
]

// Simuler une base de données pour les likes d'articles
const articleLikes: Record<string, { count: number; likedBy: string[] }> = {
  "impact-expected-goals-analyse-moderne-football": {
    count: 156,
    likedBy: ["visitor-123", "visitor-456"],
  },
  "donnees-gps-transformation-entrainement-joueurs": {
    count: 87,
    likedBy: ["visitor-789"],
  },
  "modeles-predictifs-recrutement-footballistique": {
    count: 124,
    likedBy: ["visitor-123"],
  },
  "analyse-tactique-pressing-haut-donnees": {
    count: 98,
    likedBy: ["visitor-456"],
  },
  "intelligence-artificielle-revolution-analyse-football": {
    count: 135,
    likedBy: ["visitor-789", "visitor-123"],
  },
}

// Générer un ID unique pour un commentaire
function generateCommentId() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9)
}

// Formater la date relative
function formatRelativeDate() {
  return "À l'instant"
}

// GET pour récupérer les commentaires d'un article
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const articleSlug = searchParams.get("articleSlug")
  const visitorId = searchParams.get("visitorId")

  if (!articleSlug) {
    return NextResponse.json({ error: "Article slug is required" }, { status: 400 })
  }

  // Filtrer les commentaires par article
  const articleComments = comments.filter((comment) => comment.articleSlug === articleSlug)

  // Récupérer les likes de l'article
  const articleLikeInfo = articleLikes[articleSlug] || { count: 0, likedBy: [] }
  const isLiked = visitorId ? articleLikeInfo.likedBy.includes(visitorId) : false

  return NextResponse.json({
    comments: articleComments,
    articleLikes: articleLikeInfo.count,
    isLiked,
  })
}

// POST pour ajouter un commentaire
export async function POST(request: Request) {
  const body = await request.json()
  const { articleSlug, author, content, visitorId } = body

  if (!articleSlug || !author || !content || !visitorId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Créer un nouveau commentaire
  const newComment = {
    id: generateCommentId(),
    articleSlug,
    author: {
      ...author,
      visitorId,
    },
    content,
    date: formatRelativeDate(),
    likes: 0,
    likedBy: [],
  }

  // Ajouter le commentaire à la "base de données"
  comments = [newComment, ...comments]

  return NextResponse.json({ success: true, comment: newComment })
}
