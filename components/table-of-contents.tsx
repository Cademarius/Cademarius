"use client"

import { useEffect, useState } from "react"
import { Link } from "lucide-react"

export function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    // Récupérer tous les titres h2 et h3 de l'article
    const articleContent = document.querySelector(".article-content")
    if (!articleContent) return

    const headingElements = articleContent.querySelectorAll("h2, h3")
    const headingsData = Array.from(headingElements).map((heading) => {
      // Ajouter un ID s'il n'en a pas déjà un
      if (!heading.id) {
        heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      }

      return {
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
      }
    })

    setHeadings(headingsData)

    // Observer l'intersection des titres pour mettre à jour la table des matières
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    headingElements.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [])

  if (headings.length === 0) return null

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border dark:border-gray-800">
      <div className="flex items-center gap-2 mb-3">
        <Link className="h-4 w-4 text-blue-500" />
        <h3 className="font-medium">Table des matières</h3>
      </div>
      <nav>
        <ul className="space-y-1 text-sm">
          {headings.map((heading) => (
            <li key={heading.id} className={`${heading.level === 3 ? "ml-4" : ""}`}>
              <a
                href={`#${heading.id}`}
                className={`
                  block py-1 transition-colors hover:text-blue-500
                  ${activeId === heading.id ? "text-blue-500 font-medium" : "text-muted-foreground"}
                `}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                  // Mettre à jour l'URL sans recharger la page
                  window.history.pushState(null, "", `#${heading.id}`)
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}