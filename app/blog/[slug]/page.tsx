"use client"

import { useEffect, useState } from "react"
import { Calendar, MessageSquare, ThumbsUp, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CommentSection } from "@/components/comment-section"
import { SocialShare } from "@/components/social-share"
import { NewsletterForm } from "@/components/newsletter-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getArticleBySlug } from "@/lib/articles"
import { TableOfContents } from "@/components/table-of-contents"
import { ProgressBar } from "@/components/progress-bar"
import { LikeButton } from "@/components/like-button"
import { RelatedArticlesSection } from "@/components/related-articles-section"
import { NewsletterSection } from "@/components/newsletter-section"

export default function BlogPost() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

  const [article, setArticle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer l'article en fonction du slug
    if (slug) {
      const fetchedArticle = getArticleBySlug(slug)
      setArticle(fetchedArticle)
      setIsLoading(false)

      // Effet de défilement fluide pour les ancres
      const handleHashChange = () => {
        const hash = window.location.hash
        if (hash) {
          const element = document.getElementById(hash.substring(1))
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }

      window.addEventListener("hashchange", handleHashChange)
      if (window.location.hash) {
        setTimeout(handleHashChange, 500)
      }

      return () => {
        window.removeEventListener("hashchange", handleHashChange)
      }
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article introuvable</h1>
            <p className="mb-6">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
            <Link href="/blog">
              <Button>Retour aux articles</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ProgressBar />
      <main className="flex-1">
        <article className="container max-w-4xl py-6 lg:py-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 group transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux articles
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-500/10 px-4 py-1 text-sm text-blue-500">
              {article.category}
            </div>
            <h1 className="text-3xl font-bold lg:text-4xl animate-fade-in">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <time dateTime={article.date} className="text-muted-foreground">
                  {article.date}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">{article.commentCount} commentaires</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-blue-500" />
                <span className="text-muted-foreground">{article.likeCount} likes</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={article.author.image || "/placeholder.svg"} alt={article.author.name} />
                <AvatarFallback>{article.author.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{article.author.name}</div>
                <div className="text-sm text-muted-foreground">{article.author.role}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <img
              src={article.coverImage || "/placeholder.svg"}
              alt="Article hero image"
              className="relative aspect-video w-full rounded-lg object-cover shadow-lg transform transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          <div className="mt-8 lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
            <div
              className="prose prose-lg dark:prose-invert max-w-none article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents />

                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border dark:border-gray-800">
                  <h3 className="font-medium mb-2">Partager l'article</h3>
                  <SocialShare url={`https://datafoot.com/blog/${slug}`} title={article.title} />

                  {/* <div className="mt-4">
                    <LikeButton articleSlug={slug || ""} initialLikes={article.likeCount} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
              >
                {tag}
              </Link>
            ))}
          </div>

          <Separator className="my-8" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 lg:hidden">
              <LikeButton articleSlug={slug || ""} initialLikes={article.likeCount} />
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MessageSquare className="h-4 w-4" />
                Commenter
              </Button>
            </div>
            <div className="lg:hidden">
              <SocialShare url={`https://datafoot.com/blog/${slug}`} title={article.title} />
            </div>
          </div>

          <Separator className="my-8" />

          <div id="comments">
            {slug && <CommentSection articleSlug={slug} />}
          </div>
        </article>

        {/* Section Articles similaires - conditionnelle */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            {/* Nous utilisons un composant qui vérifie s'il y a des articles similaires */}
            <RelatedArticlesSection currentSlug={slug || ""} />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-500/10 px-4 py-1 text-sm text-blue-500">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Newsletter
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Restez informé</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Abonnez-vous à ma newsletter pour recevoir mes dernières analyses et articles.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-md py-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
