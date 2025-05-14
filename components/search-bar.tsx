"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchArticles } from "@/lib/articles"

interface SearchBarProps {
  compact?: boolean
  initialQuery?: string
}

export function SearchBar({ compact = false, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Charger les recherches récentes depuis le localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSearches = localStorage.getItem("recentSearches")
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches))
      }
    }
  }, [])

  useEffect(() => {
    // Gérer les clics en dehors des suggestions pour les fermer
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Mettre à jour les suggestions lorsque la requête change
    if (query.length >= 2) {
      const results = searchArticles(query).slice(0, 5) // Limiter à 5 suggestions
      setSuggestions(results)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Sauvegarder la recherche dans l'historique
      if (typeof window !== "undefined") {
        const updatedSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
        setRecentSearches(updatedSearches)
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
      }

      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsFocused(false)
    }
  }

  const handleClear = () => {
    setQuery("")
    setSuggestions([])
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSuggestionClick = (slug: string) => {
    router.push(`/blog/${slug}`)
    setIsFocused(false)
  }

  const handleRecentSearchClick = (search: string) => {
    setQuery(search)
    router.push(`/search?q=${encodeURIComponent(search)}`)
    setIsFocused(false)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    if (typeof window !== "undefined") {
      localStorage.removeItem("recentSearches")
    }
  }

  return (
    <div className={`relative ${compact ? "w-full" : "w-full max-w-md mx-auto"}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text" // Changed from "search" to avoid browser's default search UI
            placeholder="Rechercher un article..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className={`pl-10 pr-10 ${compact ? "" : "h-11"} text-foreground dark:text-white focus-visible:ring-blue-500 transition-shadow duration-300`}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Effacer</span>
            </Button>
          )}
        </div>
      </form>

      {isFocused && (suggestions.length > 0 || recentSearches.length > 0) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 rounded-md shadow-lg border z-50 max-h-96 overflow-auto"
        >
          <div className="p-2">
            {suggestions.length > 0 && (
              <>
                <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Suggestions</p>
                {suggestions.map((article) => (
                  <div
                    key={article.slug}
                    className="flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(article.slug)}
                  >
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={article.coverImage || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-1 text-foreground dark:text-white">
                        {article.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{article.excerpt}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {recentSearches.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <div className="flex items-center justify-between mb-2 px-2">
                  <p className="text-xs font-medium text-muted-foreground">Recherches récentes</p>
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearRecentSearches}>
                    Effacer
                  </Button>
                </div>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-foreground dark:text-white">{search}</span>
                  </div>
                ))}
              </div>
            )}

            {query && (
              <div className="mt-2 pt-2 border-t">
                <Button variant="ghost" size="sm" className="w-full text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs" onClick={handleSubmit}>
                  Voir tous les résultats pour "{query}"
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}