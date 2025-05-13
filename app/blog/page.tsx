import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { SearchBar } from "@/components/search-bar"
import { getAllArticles } from "@/lib/articles"
import { Button } from "@/components/ui/button"
import { Filter, Grid3X3, List } from "lucide-react"
import { NewsletterSection } from "@/components/newsletter-section"

export default function BlogPage() {
  const articles = getAllArticles()
  const categories = Array.from(new Set(articles.map((article) => article.category)))

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
                        variant="ghost"
                        className="w-full justify-start text-sm font-normal hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500"
                      >
                        Tous les articles
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant="ghost"
                          className="w-full justify-start text-sm font-normal hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 mt-4">
                    <h3 className="font-medium mb-3">Tags populaires</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Expected Goals
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Tactique
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        IA
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Performance
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Recrutement
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">{articles.length} Articles</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="sm" className="h-9 px-2">
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-9 px-2">
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Trier par
                    </Button>
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      3
                    </Button>
                    <span className="mx-1">...</span>
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      8
                    </Button>
                  </div>
                </div>
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
