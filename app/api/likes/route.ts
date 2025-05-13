import { NextResponse } from "next/server"

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

// Simuler une base de données pour les likes de commentaires
const commentLikes: Record<string, string[]> = {
  "1": ["visitor-456", "visitor-789"],
  "2": ["visitor-123"],
  "3": ["visitor-123", "visitor-456"],
}

// POST pour gérer les likes d'articles et de commentaires
export async function POST(request: Request) {
  const body = await request.json()
  const { type, id, visitorId, action } = body

  if (!type || !id || !visitorId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (type === "article") {
    // Initialiser l'article s'il n'existe pas
    if (!articleLikes[id]) {
      articleLikes[id] = { count: 0, likedBy: [] }
    }

    const article = articleLikes[id]
    const hasLiked = article.likedBy.includes(visitorId)

    if (action === "like" && !hasLiked) {
      // Ajouter un like
      article.count += 1
      article.likedBy.push(visitorId)
    } else if (action === "unlike" && hasLiked) {
      // Retirer un like
      article.count -= 1
      article.likedBy = article.likedBy.filter((id) => id !== visitorId)
    }

    return NextResponse.json({
      success: true,
      likes: article.count,
      isLiked: article.likedBy.includes(visitorId),
    })
  } else if (type === "comment") {
    // Initialiser le commentaire s'il n'existe pas
    if (!commentLikes[id]) {
      commentLikes[id] = []
    }

    const hasLiked = commentLikes[id].includes(visitorId)

    if (action === "like" && !hasLiked) {
      // Ajouter un like
      commentLikes[id].push(visitorId)
    } else if (action === "unlike" && hasLiked) {
      // Retirer un like
      commentLikes[id] = commentLikes[id].filter((vid) => vid !== visitorId)
    }

    return NextResponse.json({
      success: true,
      likes: commentLikes[id].length,
      isLiked: commentLikes[id].includes(visitorId),
    })
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 })
}

// GET pour récupérer les likes
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const id = searchParams.get("id")
  const visitorId = searchParams.get("visitorId")

  if (!type || !id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (type === "article") {
    const article = articleLikes[id] || { count: 0, likedBy: [] }
    return NextResponse.json({
      likes: article.count,
      isLiked: visitorId ? article.likedBy.includes(visitorId) : false,
    })
  } else if (type === "comment") {
    const likes = commentLikes[id] || []
    return NextResponse.json({
      likes: likes.length,
      isLiked: visitorId ? likes.includes(visitorId) : false,
    })
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 })
}
