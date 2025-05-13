"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { SearchBar } from "@/components/search-bar"
import { getAllArticles, getAllCategories, getPopularTags, getArticlesByCategory } from "@/lib/articles"
import { Button } from "@/components/ui/button"
import { Filter, Grid3X3, List } from "lucide-react"
import { NewsletterSection } from "@/components/newsletter-section"
import { useSearchParams, useRouter } from "next/navigation"

export default function BlogPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [articles, setArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [popularTags, setPopularTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "popularity">("date")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })

  // Récupérer les paramètres de l'URL
  const pageParam = searchParams.get("page")
  const categoryParam = searchParams.get("category")
  const tagParam = searchParams.get("tag")
  const sortParam = searchParams.get("sort")

  useEffect(() => {
    // Initialiser les états à partir des paramètres d'URL
    if (pageParam) {
      setCurrentPage(Number.parseInt(pageParam))
    }
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
    if (tagParam) {
      setActiveTag(tagParam)
    }
    if (sortParam === "popularity") {
      setSortBy("popularity")
    }

    // Charger les catégories et tags
    setCategories(getAllCategories())
    setPopularTags(getPopularTags())

    // Charger les articles
    loadArticles()
  }, [pageParam, categoryParam, tagParam, sortParam])

  const loadArticles = () => {
    setIsLoading(true)

    let filteredArticles = getAllArticles()

    // Filtrer par catégorie si nécessaire
    if (activeCategory && activeCategory !== "all") {
      filteredArticles = getArticlesByCategory(activeCategory)
    }

    // Filtrer par tag si nécessaire
    if (activeTag) {
      filteredArticles = filteredArticles.filter((article) => article.tags.includes(activeTag))
    }

    // Trier les articles
    if (sortBy === "popularity") {
      filteredArticles = [...filteredArticles].sort((a, b) => b.likeCount - a.likeCount)
    } else {
      // Par défaut, trier par date (du plus récent au plus ancien)
      filteredArticles = [...filteredArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    // Paginer les résultats
    const page = currentPage || 1
    const perPage = 6
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    setArticles(paginatedArticles)
    setPagination({
      currentPage: page,
      totalPages: Math.ceil(filteredArticles.length / perPage),
      totalArticles: filteredArticles.length,
      hasNextPage: endIndex < filteredArticles.length,
      hasPrevPage: page > 1,
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadArticles()
  }, [currentPage, activeCategory, activeTag, sortBy])

  // Mettre à jour l'URL lorsque les filtres changent
  useEffect(() => {
    const params = new URLSearchParams()

    if (currentPage > 1) {
      params.set("page", currentPage.toString())
    }

    if (activeCategory && activeCategory !== "all") {
      params.set("category", activeCategory)
    }

    if (activeTag) {
      params.set("tag", activeTag)
    }

    if (sortBy === "popularity") {
      params.set("sort", "popularity")
    }

    const newUrl = params.toString() ? `/blog?${params.toString()}` : "/blog"
    window.history.replaceState({}, "", newUrl)
  }, [currentPage, activeCategory, activeTag, sortBy])

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    setActiveTag(null)
    setCurrentPage(1)
  }

  const handleTagClick = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag)
    setCurrentPage(1)
  }

  const handleSortChange = (sort: "date" | "popularity") => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-900 to-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-500/10 px-4 py-1 text-sm text-blue-400 backdrop-blur-sm">
                Blog
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                    Analyses & Insights
                  </span>
                </h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Explorez l'ensemble de nos analyses et articles sur le football et la data science.
                </p>
              </div>
              <div className="w-full max-w-2xl mt-6">
                <SearchBar />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar with filters */}
              <div className="w-full md:w-64 space-y-6">
                <div className="sticky top-24">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-3">Catégories</h3>
                    <div className="space-y-2">
                      <Button
                        variant={activeCategory === "all" ? "default" : "ghost"}
                        className="w-full justify-start text-sm font-normal hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500"
                        onClick={() => handleCategoryClick("all")}
                      >
                        Tous les articles
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={activeCategory === category ? "default" : "ghost"}
                          className="w-full justify-start text-sm font-normal hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500"
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 mt-4">
                    <h3 className="font-medium mb-3">Tags populaires</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={activeTag === tag ? "default" : "outline"}
                          size="sm"
                          className="text-xs"
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">{pagination.totalArticles} Articles</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        className="h-9 px-2"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        className="h-9 px-2"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="relative">
                      {/* <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => handleSortChange(sortBy === "date" ? "popularity" : "date")}
                      >
                        <Filter className="h-4 w-4" />
                        Trier par: {sortBy === "date" ? "Date" : "Popularité"}
                      </Button> */}
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`grid gap-8 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
                    >
                      {articles.map((article) => (
                        <ArticleCard
                          key={article.slug}
                          title={article.title}
                          description={article.excerpt}
                          date={article.date}
                          commentCount={article.commentCount}
                          likeCount={article.likeCount}
                          imageUrl={article.coverImage}
                          slug={article.slug}
                          layout={viewMode === "list" ? "horizontal" : "vertical"}
                        />
                      ))}
                    </div>

                    {articles.length === 0 && (
                      <div className="text-center py-20">
                        <h3 className="text-xl font-medium mb-2">Aucun article trouvé</h3>
                        <p className="text-muted-foreground">
                          Aucun article ne correspond à vos critères de recherche.
                        </p>
                      </div>
                    )}

                    {pagination.totalPages > 1 && (
                      <div className="flex justify-center mt-12">
                        <div className="flex items-center gap-1">
                          {pagination.hasPrevPage && (
                            <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)}>
                              Précédent
                            </Button>
                          )}

                          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => {
                            // Afficher seulement les pages proches de la page actuelle
                            if (
                              page === 1 ||
                              page === pagination.totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <Button
                                  key={page}
                                  variant={page === currentPage ? "default" : "outline"}
                                  size="sm"
                                  className="h-9 w-9 p-0"
                                  onClick={() => handlePageChange(page)}
                                >
                                  {page}
                                </Button>
                              )
                            } else if (
                              (page === currentPage - 2 && currentPage > 3) ||
                              (page === currentPage + 2 && currentPage < pagination.totalPages - 2)
                            ) {
                              return (
                                <span key={page} className="mx-1">
                                  ...
                                </span>
                              )
                            }
                            return null
                          })}

                          {pagination.hasNextPage && (
                            <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)}>
                              Suivant
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
