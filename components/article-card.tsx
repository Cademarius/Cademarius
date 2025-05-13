import Link from "next/link"
import { Calendar, MessageSquare, ThumbsUp } from "lucide-react"

interface ArticleCardProps {
  title: string
  description: string
  date: string
  commentCount: number
  likeCount: number
  imageUrl: string
  slug: string
}

export function ArticleCard({ title, description, date, commentCount, likeCount, imageUrl, slug }: ArticleCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 bg-card">
      <Link href={`/blog/${slug}`} className="block">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime="2023-05-12">{date}</time>
          </div>
          {/* <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            <span>{commentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{likeCount}</span>
          </div> */}
        </div>
        <Link href={`/blog/${slug}`} className="block">
          <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-blue-500 transition-colors line-clamp-2 text-foreground dark:text-white">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{description}</p>
        <Link
          href={`/blog/${slug}`}
          className="text-blue-500 text-sm font-medium hover:underline inline-flex items-center group"
        >
          Lire la suite
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
            className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
