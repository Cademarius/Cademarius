"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Fermer le menu mobile lors du changement de page
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-500 transition-transform hover:scale-105"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-30"></div>
            <span className="relative">Cademarius</span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-blue-500 relative group ${
              pathname === "/" ? "text-blue-500" : ""
            }`}
          >
            Accueil
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors hover:text-blue-500 relative group ${
              pathname === "/blog" || pathname.startsWith("/blog/") ? "text-blue-500" : ""
            }`}
          >
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-blue-500 relative group ${
              pathname === "/about" ? "text-blue-500" : ""
            }`}
          >
            À propos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-blue-500 relative group ${
              pathname === "/contact" ? "text-blue-500" : ""
            }`}
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {!isSearchOpen ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Rechercher</span>
              </Button>

              <ThemeToggle />

              {/* <Button variant="outline" size="sm" className="hidden md:flex bg-blue-500 hover:bg-blue-600">
                S'abonner
              </Button> */}

              {/* <Button variant="default" size="sm" className="hidden md:flex bg-blue-500 hover:bg-blue-600">
                Connexion
              </Button> */}

              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <SearchBar compact />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Fermer</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-500">
              Cademarius
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
         <nav className="container flex flex-col gap-6 py-8 bg-white dark:bg-gray-950">
          <Link
            href="/"
            className={`text-lg font-medium transition-colors hover:text-blue-500 ${
              pathname === "/" ? "text-blue-500" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            href="/blog"
            className={`text-lg font-medium transition-colors hover:text-blue-500 ${
              pathname === "/blog" || pathname.startsWith("/blog/") ? "text-blue-500" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`text-lg font-medium transition-colors hover:text-blue-500 ${
              pathname === "/about" ? "text-blue-500" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className={`text-lg font-medium transition-colors hover:text-blue-500 ${
              pathname === "/contact" ? "text-blue-500" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="mt-4">
            <SearchBar />
          </div>
        </nav>
      </div>
      )}
    </header>
  )
}
