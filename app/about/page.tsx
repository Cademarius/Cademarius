import Link from "next/link"
import {
  Github,
  Linkedin,
  Twitter,
  BarChart3,
  Database,
  LineChart,
  Award,
  BookOpen,
  Briefcase,
  Code,
  GraduationCap,
  PenTool,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-900 to-black text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-500/10 px-4 py-1 text-sm text-blue-400 backdrop-blur-sm">
                  À propos de moi
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                      Ma passion pour les données et le football
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Data Analyst et IA Engineer en formation, je partage mes analyses et insights sur le football à travers le prisme des données.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/contact">
                    <Button className="bg-blue-500 hover:bg-blue-600">Me contacter</Button>
                  </Link>
                  <div className="flex gap-4">
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </Link>
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-30 animate-pulse"></div>
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Ma photo de profil"
                  className="relative mx-auto aspect-square overflow-hidden rounded-full object-cover border-4 border-blue-500 sm:w-full lg:order-last"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mon parcours */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500">
                  Mon parcours
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">De la passion à l'expertise</h2>
                <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                  Comment j'ai fusionné ma passion pour le football avec le monde des données.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Passionné de football depuis mon enfance, j'ai toujours été fasciné par les statistiques et les données derrière ce sport. Ce qui a commencé comme une simple curiosité s'est transformé en véritable vocation.
                </p>
                <p className="text-muted-foreground">
                  Après des études en informatique, j'ai décidé de me spécialiser dans l'analyse de données, convaincu que cette discipline pouvait apporter un éclairage nouveau sur le football. Aujourd'hui, je poursuis ma formation en intelligence artificielle pour pousser encore plus loin l'analyse du jeu.
                </p>
                <p className="text-muted-foreground">
                  À travers ce blog, je partage mes analyses, découvertes et apprentissages, en combinant rigueur analytique et passion pour le football. Mon objectif : rendre les concepts complexes de data science accessibles et démontrer leur valeur dans la compréhension du jeu.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-4">
                    <Award className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Rigueur</h3>
                  <p className="text-sm text-muted-foreground">
                    J'applique une méthodologie rigoureuse dans chaque analyse, avec un souci constant de précision et d'objectivité.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-4">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Pédagogie</h3>
                  <p className="text-sm text-muted-foreground">
                    Je m'efforce de rendre accessibles des concepts complexes pour partager ma passion avec le plus grand nombre.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-4">
                    <PenTool className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Créativité</h3>
                  <p className="text-sm text-muted-foreground">
                    J'explore constamment de nouvelles approches et visualisations pour révéler des insights inédits sur le football.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mes compétences */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500">
                  Mes compétences
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Mon expertise</h2>
                <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                  Un mélange de compétences techniques et de connaissances footballistiques.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg border p-6 bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <Database className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg">Data Analysis</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Python (pandas, numpy, matplotlib)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      SQL et gestion de bases de données
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Excel et analyse statistique
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Tableau et visualisation de données
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-6 bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <Code className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg">IA & Machine Learning</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Scikit-learn et TensorFlow
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Modèles prédictifs et classification
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      NLP pour l'analyse de texte sportif
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      En formation continue
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-6 bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg">Analyse Football</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Métriques avancées (xG, PPDA, etc.)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Analyse tactique et patterns de jeu
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Évaluation de performance des joueurs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Sources de données sportives
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-6 bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg">Communication</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Rédaction technique et vulgarisation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Data storytelling
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Visualisations interactives
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      Présentations et articles de blog
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formation et parcours */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500">
                  Formation
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Mon parcours académique et professionnel</h2>
                <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                  Une évolution constante vers la maîtrise des données dans le contexte sportif.
                </p>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border p-6 bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <GraduationCap className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg">Formation actuelle</h3>
                  </div>
                  <p className="text-sm text-blue-500 mb-2">2023 - Aujourd'hui</p>
                  <p className="text-muted-foreground">
                    Formation en Intelligence Artificielle - Spécialisation en modèles prédictifs appliqués au sport
                  </p>
                </div>

                <div className="rounded-lg border p-6 bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg">Expérience professionnelle</h3>
                  </div>
                  <p className="text-sm text-blue-500 mb-2">2021 - Aujourd'hui</p>
                  <p className="text-muted-foreground mb-4">
                    Data Analyst - Analyse de données sportives et développement de visualisations interactives pour présenter des insights footballistiques.
                  </p>
                  
                  <p className="text-sm text-blue-500 mb-2">2018 - 2021</p>
                  <p className="text-muted-foreground">
                    Analyste junior - Première expérience dans l'analyse de données et la préparation de rapports.
                  </p>
                </div>

                <div className="rounded-lg border p-6 bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
                      <GraduationCap className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-lg">Formation initiale</h3>
                  </div>
                  <p className="text-sm text-blue-500 mb-2">2014 - 2018</p>
                  <p className="text-muted-foreground">
                    Diplôme en Informatique avec spécialisation en science des données - Introduction aux concepts fondamentaux de l'analyse de données et programmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projets */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500">
                  Projets
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Mes analyses et projets récents</h2>
                <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
                  Découvrez quelques-uns de mes travaux à l'intersection du football et de la data science.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 pt-4">
                <div className="rounded-lg border overflow-hidden flex flex-col">
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-blue-500 opacity-70" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2">Analyse xG Premier League</h3>
                    <p className="text-sm text-muted-foreground flex-1">
                      Étude approfondie des expected goals et leur corrélation avec les résultats sur une saison complète.
                    </p>
                    <Link href="/blog/xg-analysis">
                      <Button variant="outline" className="mt-4 w-full">Lire l'article</Button>
                    </Link>
                  </div>
                </div>
                
                <div className="rounded-lg border overflow-hidden flex flex-col">
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-blue-500 opacity-70" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2">Détection de talents</h3>
                    <p className="text-sm text-muted-foreground flex-1">
                      Modèle de machine learning pour identifier les jeunes talents basé sur des indicateurs de performance clés.
                    </p>
                    <Link href="/blog/talent-detection">
                      <Button variant="outline" className="mt-4 w-full">Voir le projet</Button>
                    </Link>
                  </div>
                </div>
                
                <div className="rounded-lg border overflow-hidden flex flex-col">
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Database className="h-16 w-16 text-blue-500 opacity-70" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2">Dashboard tactique</h3>
                    <p className="text-sm text-muted-foreground flex-1">
                      Visualisation interactive des patterns tactiques et des zones d'influence des joueurs.
                    </p>
                    <Link href="/projects/tactical-dashboard">
                      <Button variant="outline" className="mt-4 w-full">Explorer</Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-bold mb-4">Envie de collaborer ?</h3>
                <p className="text-muted-foreground mb-6">
                  Je suis ouvert aux collaborations sur des projets d'analyse de données dans le football. N'hésitez pas à me contacter pour échanger des idées.
                </p>
                <Link href="/contact">
                  <Button className="bg-blue-500 hover:bg-blue-600">Me contacter</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}