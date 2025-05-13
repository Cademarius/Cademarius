import Link from "next/link"
import { Calendar, MessageSquare, ThumbsUp } from "lucide-react"

interface FeaturedArticleProps {
  title: string
  description: string
  date: string
  commentCount: number
  likeCount: number
  imageUrl: string
  slug: string
}

export function FeaturedArticle({
  title,
  description,
  date,
  commentCount,
  likeCount,
  imageUrl,
  slug,
}: FeaturedArticleProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border transition-all duration-500 hover:shadow-xl">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 p-6 text-white w-full">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime="2023-05-12" className="text-sm">
              {date}
            </time>
          </div>
          {/* <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">{commentCount}</span>
          </div> */}
          {/* <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm">{likeCount}</span>
          </div> */}
        </div>
        <h3 className="text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-x-1">
          {title}
        </h3>
        <p className="text-sm text-gray-200 mb-4 line-clamp-2">{description}</p>
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-all duration-300 transform group-hover:translate-x-1"
        >
          Lire l'article
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
