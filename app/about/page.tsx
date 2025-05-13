"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ChevronRight,
  Lightbulb,
  Users,
  MessageSquare,
  Clock,
  Zap,
  ExternalLink,
  BookOpen,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Refs for sections
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const collaborationRef = useRef(null)


  // Projects data
  const projects = [
    {
      id: 1,
      title: "CademData - Analyse de Football",
      description:
        "Plateforme d'analyse de données footballistiques utilisant des techniques avancées de data science pour fournir des insights tactiques et statistiques.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Data Visualization", "API Integration"],
      category: "web",
      link: "https://cademdata.com",
      github: "https://github.com/cadem/football-analytics",
    },
    // {
    //   id: 2,
    //   title: "AI Player Performance Predictor",
    //   description:
    //     "Modèle d'IA qui prédit les performances futures des joueurs de football basé sur l'historique des données et des métriques avancées.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   tags: ["Python", "Machine Learning", "Data Analysis"],
    //   category: "ai",
    //   link: "https://ai-predictor.demo.com",
    //   github: "https://github.com/cadem/ai-predictor",
    // },
    // {
    //   id: 3,
    //   title: "Dashboard Tactique Interactif",
    //   description:
    //     "Interface interactive permettant aux entraîneurs et analystes d'explorer les données tactiques et de créer des visualisations personnalisées.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   tags: ["React", "D3.js", "Firebase"],
    //   category: "web",
    //   link: "https://tactical-dashboard.demo.com",
    //   github: "https://github.com/cadem/tactical-dashboard",
    // },
    // {
    //   id: 4,
    //   title: "Big Data Pipeline pour Statistiques Sportives",
    //   description:
    //     "Architecture de traitement de données à grande échelle pour l'ingestion, le traitement et l'analyse de données sportives en temps réel.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   tags: ["Apache Spark", "Kafka", "AWS"],
    //   category: "data",
    //   link: "https://data-pipeline.demo.com",
    //   github: "https://github.com/cadem/sports-data-pipeline",
    // },
    // {
    //   id: 5,
    //   title: "Application Mobile de Suivi d'Entraînement",
    //   description:
    //     "Application mobile permettant aux athlètes de suivre leurs performances, de recevoir des recommandations personnalisées et d'analyser leurs progrès.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   tags: ["React Native", "Redux", "Node.js"],
    //   category: "mobile",
    //   link: "https://training-app.demo.com",
    //   github: "https://github.com/cadem/training-tracker-app",
    // },
    // {
    //   id: 6,
    //   title: "Système de Recommandation pour Recruteurs",
    //   description:
    //     "Système de recommandation basé sur l'IA qui aide les recruteurs sportifs à identifier les talents correspondant à des critères spécifiques.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   tags: ["Python", "TensorFlow", "NLP"],
    //   category: "ai",
    //   link: "https://recruiter-ai.demo.com",
    //   github: "https://github.com/cadem/recruiter-recommendation",
    // },
  ]

  // Filter projects based on active tab
  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* About Me Section (Merged with Hero) */}
        <section id="about" ref={aboutRef} className="w-full py-16 md:py-24 bg-white dark:bg-gray-950 scroll-mt-32">
          <div className="container px-4 md:px-6">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mx-auto max-w-4xl space-y-12">
              <div className="grid md:grid-cols-[1fr_300px] gap-8 md:gap-12 items-start">
                <div className="space-y-6">
                  <Badge
                    className="inline-flex items-center rounded-full border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500"
                    variant="outline"
                  >
                    Développeur Front-End & Data Scientist
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Cadem ADANGNITODE</h1>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Passionné par la création d'expériences web innovantes et l'exploitation des données pour résoudre
                    des problèmes complexes.
                  </p>

                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Développeur front-end avec une solide expertise en création d'interfaces utilisateur modernes et
                      réactives. Actuellement en formation en Big Data et Intelligence Artificielle, je combine ces
                      domaines pour développer des solutions innovantes.
                    </p>
                    <p>
                      Ma passion pour le football m'a conduit à explorer comment les données et l'analyse peuvent
                      transformer notre compréhension du sport. Ce projet, CademData, est né de cette intersection entre
                      ma passion pour le développement, les données et le football.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger mon CV
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Me contacter
                      </Link>
                    </Button>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Link
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  </div>
                </div>

                <div className="relative mx-auto md:mx-0 max-w-[250px] md:max-w-none">
                  <div className="rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-lg">
                    <img
                      src="/profile.jpg?height=300&width=300"
                      alt="Cadem ADANGNITODE"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mx-auto max-w-4xl space-y-12"
            >
              <div className="space-y-4">
                <Badge
                  className="inline-flex items-center rounded-full border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500"
                  variant="outline"
                >
                  Compétences
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Mes expertises</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-[800px]">
                  Un ensemble de compétences techniques et humaines pour créer des solutions innovantes.
                </p>
              </div>

              <div className="space-y-16">
                {/* Technical Skills */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Compétences Techniques</h3>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                  >
                    {[
                      { name: "NextJs", image: "/nextdotjs.svg?height=60&width=60&text=HTML5" },
                      { name: "React Native", image: "/react-color.svg?height=60&width=60&text=CSS3" },
                      { name: "Tailwind CSS", image: "/tailwindcss-color.svg?height=60&width=60&text=JS" },
                      { name: "TypeScript", image: "/typescript-color.svg?height=60&width=60&text=TS" },
                      { name: "ShadCN UI", image: "/shadcnui.svg?height=60&width=60&text=React" },
                      { name: "Framer Motion", image: "/framer-color.svg?height=60&width=60&text=Next.js" },
                      { name: "Bootstrap", image: "/bootstrap-color.svg?height=60&width=60&text=Tailwind" },
                      { name: "GitHub", image: "/github-color.svg?height=60&width=60&text=Python" },
                      { name: "GitLab", image: "/gitlab-color.svg?height=60&width=60&text=SQL" },
                      { name: "Apache Cordova", image: "/apachecordova-color.svg?height=60&width=60&text=SQL" },
                    ].map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemFadeIn}
                        className="flex flex-col items-center justify-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="mb-2 md:mb-3 w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden">
                          <img
                            src={skill.image || "/placeholder.svg"}
                            alt={skill.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-center group-hover:text-blue-500 transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Soft Skills</h3>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-4 md:gap-6"
                  >
                    {[
                      {
                        title: "Résolution de problèmes",
                        description:
                          "Capacité à analyser les problèmes complexes et à développer des solutions efficaces.",
                        icon: Lightbulb,
                      },
                      {
                        title: "Travail d'équipe",
                        description:
                          "Collaboration efficace avec des équipes multidisciplinaires pour atteindre des objectifs communs.",
                        icon: Users,
                      },
                      {
                        title: "Communication",
                        description:
                          "Expression claire des idées techniques à des publics techniques et non techniques.",
                        icon: MessageSquare,
                      },
                      {
                        title: "Gestion du temps",
                        description:
                          "Organisation efficace des tâches et respect des délais dans des environnements dynamiques.",
                        icon: Clock,
                      },
                      {
                        title: "Adaptabilité",
                        description:
                          "Flexibilité face aux nouvelles technologies et méthodologies dans un domaine en constante évolution.",
                        icon: Zap,
                      },
                      {
                        title: "Apprentissage continu",
                        description:
                          "Passion pour l'acquisition de nouvelles compétences et le perfectionnement des connaissances existantes.",
                        icon: BookOpen,
                      },
                    ].map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemFadeIn}
                        className="flex gap-4 p-4 md:p-5 bg-white dark:bg-gray-800 rounded-lg border shadow-sm"
                      >
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex-shrink-0 flex items-center justify-center text-blue-500">
                          <skill.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-medium mb-1">{skill.title}</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">{skill.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="w-full py-16 md:py-24 scroll-mt-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mx-auto max-w-4xl space-y-8"
            >
              <div className="space-y-4">
                <Badge
                  className="inline-flex items-center rounded-full border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500"
                  variant="outline"
                >
                  Portfolio
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Mes projets</h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-[800px]">
                  Découvrez une sélection de mes projets dans le développement web, la data science et l'intelligence
                  artificielle.
                </p>
              </div>

              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-start mb-6 md:mb-8 overflow-x-auto pb-2 md:pb-0">
                  <TabsList className="grid grid-cols-5 w-full max-w-md">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="web">Web</TabsTrigger>
                    <TabsTrigger value="ai">IA</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="mobile">Mobile</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid gap-6 md:gap-8 md:grid-cols-2"
                  >
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="web" className="mt-0">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid gap-6 md:gap-8 md:grid-cols-2"
                  >
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="ai" className="mt-0">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid gap-6 md:gap-8 md:grid-cols-2"
                  >
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="data" className="mt-0">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid gap-6 md:gap-8 md:grid-cols-2"
                  >
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid gap-6 md:gap-8 md:grid-cols-2"
                  >
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Collaboration Section - Redesigned */}
        <section
          id="collaboration"
          ref={collaborationRef}
          className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-32"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mx-auto max-w-4xl"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                    <Badge
                      className="inline-flex items-center rounded-full border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500 mb-4 w-fit"
                      variant="outline"
                    >
                      Collaboration
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Travaillons ensemble</h2>
                    <p className="text-sm md:text-base text-muted-foreground mb-6">
                      Je suis ouvert aux opportunités de collaboration sur des projets innovants. Que vous ayez besoin
                      d'une expertise en développement front-end, en data science ou en IA, je serais ravi d'échanger
                      sur votre projet.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-500"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <p className="text-xs md:text-sm">
                          <span className="font-medium">Développement web</span> - Sites et applications modernes avec
                          React, Next.js et TypeScript
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-500"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <p className="text-xs md:text-sm">
                          <span className="font-medium">Analyse de données</span> - Extraction d'insights et
                          visualisations pour la prise de décision
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-500"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <p className="text-xs md:text-sm">
                          <span className="font-medium">Solutions IA</span> - Intégration de modèles d'IA pour
                          automatiser et optimiser vos processus
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-8">
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 group transition-all duration-300 w-full md:w-auto"
                        size="lg"
                        asChild
                      >
                        <Link href="/contact">
                          Discuter de votre projet
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative hidden md:block">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-90"></div>
                    <img
                      src="/placeholder.svg?height=600&width=400"
                      alt="Collaboration"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                      <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Pourquoi collaborer avec moi ?</h3>
                      <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                          </div>
                          <p className="text-sm">Approche centrée sur les résultats</p>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                          </div>
                          <p className="text-sm">Communication transparente</p>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                          </div>
                          <p className="text-sm">Solutions innovantes et sur mesure</p>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                          </div>
                          <p className="text-sm">Expertise technique polyvalente</p>
                        </li>
                      </ul>
                      <div className="mt-8 text-center">
                        <p className="text-sm opacity-80">
                          "Je crois que la meilleure technologie est celle qui résout de vrais problèmes tout en offrant
                          une expérience exceptionnelle."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile version of the right side */}
                  <div className="p-6 bg-blue-500 text-white md:hidden">
                    <h3 className="text-xl font-bold mb-4 text-center">Pourquoi collaborer avec moi ?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                        </div>
                        <p className="text-sm">Approche centrée sur les résultats</p>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                        </div>
                        <p className="text-sm">Communication transparente</p>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                        </div>
                        <p className="text-sm">Solutions innovantes et sur mesure</p>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                        </div>
                        <p className="text-sm">Expertise technique polyvalente</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Floating back to top button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
          aria-label="Retour en haut"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </motion.button>
      </main>
      <Footer />
    </div>
  )
}

// Project Card Component
interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  link: string
  github: string
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={itemFadeIn}
      className="group overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-xs md:text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 md:gap-3 flex-wrap">
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-xs md:text-sm h-8" asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3 w-3" />
              Voir le projet
            </a>
          </Button>
          <Button size="sm" variant="outline" className="text-xs md:text-sm h-8" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1 h-3 w-3" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
