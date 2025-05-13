"use client"

import { useEffect, useState } from "react"

export function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Calculer la hauteur totale de la page et la position actuelle
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const currentPosition = window.scrollY

      // Calculer le pourcentage de défilement
      const scrollPercentage = (currentPosition / totalHeight) * 100
      setProgress(scrollPercentage)
    }

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", updateProgress)

    // Initialiser la barre de progression
    updateProgress()

    return () => {
      window.removeEventListener("scroll", updateProgress)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  )
}
