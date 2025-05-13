"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { SearchBar } from "@/components/search-bar"
import { searchArticles } from "@/lib/articles"
import { Button } from "@/components/ui/button"
import { X, Loader2 } from "lucide-react"
import { NewsletterSection } from "@/components/newsletter-section"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      // Simuler un délai de chargement pour une meilleure UX
      const timer = setTimeout(() => {
        const searchResults = searchArticles(query)
        setResults(searchResults)

        // Extraire tous les tags uniques des résultats
        const tags = Array.from(new Set(searchResults.flatMap((article) => article.tags)))
        setAvailableTags(tags as string[])

        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setIsLoading(false)
    }
  }, [query])

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const filteredResults =
    activeFilters.length > 0
      ? results.filter((article) => article.tags.some((tag: string) => activeFilters.includes(tag)))
      : results

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-900 to-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-500/10 px-4 py-1 text-sm text-blue-400 backdrop-blur-sm">
                Recherche
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                    {query ? `Résultats pour "${query}"` : "Rechercher des articles"}
                  </span>
                </h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  {query
                    ? `Découvrez nos analyses et articles correspondant à votre recherche`
                    : "Utilisez la barre de recherche pour trouver des articles spécifiques"}
                </p>
              </div>
              <div className="w-full max-w-2xl mt-4">
                <SearchBar initialQuery={query} />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
                <p className="text-muted-foreground">Recherche en cours...</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <h2 className="text-2xl font-bold">
                    {filteredResults.length} {filteredResults.length === 1 ? "Résultat" : "Résultats"}
                  </h2>

                  {availableTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-muted-foreground">Filtrer par:</span>
                      {availableTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={activeFilters.includes(tag) ? "default" : "outline"}
                          size="sm"
                          className={`text-xs ${activeFilters.includes(tag) ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                          onClick={() => toggleFilter(tag)}
                        >
                          {tag}
                          {activeFilters.includes(tag) && <X className="ml-1 h-3 w-3" />}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {filteredResults.length > 0 ? (
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredResults.map((article) => (
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
                ) : (
                  <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Aucun résultat trouvé</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Nous n'avons trouvé aucun article correspondant à "{query}".
                      <br />
                      Essayez avec d'autres termes ou parcourez tous nos articles.
                    </p>
                    <Button asChild>
                      <Link href="/blog">Voir tous les articles</Link>
                    </Button>
                  </div>
                )}

                {filteredResults.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <div className="inline-flex items-center rounded-md border border-gray-200 dark:border-gray-800">
                      <Button variant="outline" size="sm" className="rounded-r-none border-0">
                        Précédent
                      </Button>
                      <div className="flex border-x border-gray-200 dark:border-gray-800">
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 font-medium text-blue-500">
                          1
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                          2
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                          3
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-l-none border-0">
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function Link({ href, children, ...props }) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
