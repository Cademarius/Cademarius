"use client"

import { Facebook, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareProps {
  url: string
  title: string
}

export function SocialShare({ url, title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank")
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank")
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Partager:</span>
      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnTwitter}>
        <Twitter className="h-4 w-4" />
        <span className="sr-only">Partager sur Twitter</span>
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnFacebook}>
        <Facebook className="h-4 w-4" />
        <span className="sr-only">Partager sur Facebook</span>
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnLinkedIn}>
        <Linkedin className="h-4 w-4" />
        <span className="sr-only">Partager sur LinkedIn</span>
      </Button>
    </div>
  )
}
