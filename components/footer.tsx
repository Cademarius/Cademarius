import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="w-full border-t py-12 md:py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-500">
              Cadem Arius
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Football, IA & Big Data. Passionné par le ballon rond et expert en data science, je partage mes réflexions et analyses sur ce blog.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild className="rounded-full h-9 w-9">
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Accueil
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                À propos
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* <div>
            <h3 className="font-medium mb-4">Ressources</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Documentation
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Tutoriels
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                API
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Glossaire
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-medium mb-4">Légal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Conditions d'utilisation
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Cookies
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                Mentions légales
              </Link>
            </nav>
          </div> */}
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Cademarius. Tous droits réservés.</p>
          {/* <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
              Français
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
              English
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
