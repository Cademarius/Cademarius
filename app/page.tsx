import Link from "next/link"
import { ArrowRight, BarChart3, Database, LineChart, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedArticle } from "@/components/featured-article"
import { ArticleCard } from "@/components/article-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroAnimation } from "@/components/hero-animation"
import { getAllArticles } from "@/lib/articles"
import { NewsletterSection } from "@/components/newsletter-section"

export default function Home() {
  const articles = getAllArticles()
  const featuredArticle = articles[0] // Premier article comme article à la une
  const recentArticles = articles.slice(1, 4) // Les 3 articles suivants

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <HeroAnimation />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-500/10 px-4 py-1 text-sm text-blue-400 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
                    </span>
                    Data Science & Football
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                      Cadem Arius
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl font-semibold text-blue-300 mb-2">
                    Explorez le football à travers les données
                  </p>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Bienvenue sur mon blog personnel où je partage mes analyses data, mes projets d'IA et ma passion pour comprendre le football par les chiffres.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/20 p-1">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300">Analyses tactiques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/20 p-1">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300">Visualisations de données</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/20 p-1">
                      <Database className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300">Projets d'IA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/20 p-1">
                      <LineChart className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300">Insights personnels</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                 <Link href="/blog" passHref>
                  <Button className="bg-blue-500 hover:bg-blue-600 group transition-all duration-300 transform hover:-translate-y-1">
                    Découvrir mes articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/about" passHref>
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    À propos de moi
                  </Button>
                </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-30 animate-pulse"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="/Cadem.png?height=550&width=800"
                    alt="Football data visualization"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                      Mon dernier projet de visualisation
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="rounded-full bg-blue-500/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Analyses tactiques</h3>
                <p className="text-gray-300 text-sm">
                  Je décortique les systèmes de jeu et les tendances tactiques à travers mes analyses de données.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="rounded-full bg-blue-500/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Évaluations de joueurs</h3>
                <p className="text-gray-300 text-sm">
                  J'explore les performances individuelles au-delà des statistiques traditionnelles.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="rounded-full bg-blue-500/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Projets d'IA appliqués</h3>
                <p className="text-gray-300 text-sm">
                  Je développe des modèles d'intelligence artificielle pour mieux comprendre et prédire les performances.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Articles Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500">
                Mes dernières publications
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Entre Passion & Expertise</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explorez mes analyses où je combine ma passion pour le football avec mes compétences en data science et intelligence artificielle.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl items-start gap-6 py-6 lg:grid-cols-1">
              {featuredArticle && (
                <FeaturedArticle
                  title={featuredArticle.title}
                  description={featuredArticle.excerpt}
                  date={featuredArticle.date}
                  commentCount={featuredArticle.commentCount}
                  likeCount={featuredArticle.likeCount}
                  imageUrl={featuredArticle.coverImage}
                  slug={featuredArticle.slug}
                />
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentArticles.map((article) => (
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

            <div className="flex justify-center mt-10">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500/10 group transition-all duration-300 transform hover:-translate-y-1"
                >
                  Explorer tous mes articles
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Testimonials Section */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500">
                Témoignages
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ce que nos clients disent</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Découvrez comment nos analyses aident les professionnels du football.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="Avatar"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Thomas Laurent</h3>
                    <p className="text-sm text-muted-foreground">Directeur Sportif, FC Montpellier</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Les analyses de CademData nous ont permis d'optimiser notre stratégie de recrutement et d'identifier
                  des talents qui correspondent parfaitement à notre style de jeu."
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="Avatar"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Sophie Martin</h3>
                    <p className="text-sm text-muted-foreground">Analyste Performance, PSG</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "La profondeur des analyses et la qualité des visualisations nous offrent des insights précieux pour
                  améliorer les performances de notre équipe."
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt="Avatar"
                    className="rounded-full h-12 w-12 object-cover"
                  />
                  <div>
                    <h3 className="font-medium">Marc Dubois</h3>
                    <p className="text-sm text-muted-foreground">Journaliste, L'Équipe</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "CademData a révolutionné ma façon d'analyser et de présenter les matchs à mes lecteurs. Une ressource
                  inestimable pour tout journaliste sportif."
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  )
}
