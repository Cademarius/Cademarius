"use client"

import { useEffect, useRef } from "react"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajuster la taille du canvas à la taille de la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Créer des particules pour l'animation
    const particlesArray: Particle[] = []
    const numberOfParticles = 120
    const connectDistance = 150
    const mouseRadius = 100

    // Position de la souris
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: mouseRadius,
    }

    // Suivre la position de la souris
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
    })

    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      density: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.baseSize = Math.random() * 2 + 0.5
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * 0.6
        this.speedY = (Math.random() - 0.5) * 0.6
        this.color = "#0066FF"
        this.density = Math.random() * 30 + 1
      }

      update() {
        // Interaction avec la souris
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius

            const directionX = forceDirectionX * force * this.density
            const directionY = forceDirectionY * force * this.density

            this.x -= directionX
            this.y -= directionY

            // Augmenter légèrement la taille lors de l'interaction
            this.size = Math.min(this.baseSize * 2, this.baseSize + 1)
          } else {
            // Revenir à la taille normale
            this.size = Math.max(this.baseSize, this.size - 0.1)
          }
        }

        // Mouvement normal
        this.x += this.speedX
        this.y += this.speedY

        // Rebondir sur les bords
        if (this.x > canvas!.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (canvas && (this.y > canvas.height || this.y < 0)) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialiser les particules
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Connecter les particules proches
    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectDistance) {
            const opacity = 1 - distance / connectDistance
            if (ctx) {
              ctx.strokeStyle = `rgba(0, 102, 255, ${opacity * 0.3})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
              ctx.stroke()
            }
          }
        }
      }
    }

    // Animation
    function animate() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      }

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    // Réinitialiser la position de la souris lorsqu'elle quitte la zone
    window.addEventListener("mouseout", () => {
      mouse.x = null
      mouse.y = null
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", (event) => {
        mouse.x = event.x
        mouse.y = event.y
      })
      window.removeEventListener("mouseout", () => {
        mouse.x = null
        mouse.y = null
      })
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
}
