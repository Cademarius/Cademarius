// Fonction pour générer un ID visiteur unique
export function generateVisitorId(): string {
  return `visitor-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`
}

// Fonction pour obtenir l'ID visiteur depuis les cookies ou en créer un nouveau
export function getVisitorId(): string {
  if (typeof window === "undefined") {
    return ""
  }

  let visitorId = localStorage.getItem("visitorId")

  if (!visitorId) {
    visitorId = generateVisitorId()
    localStorage.setItem("visitorId", visitorId)
  }

  return visitorId
}
