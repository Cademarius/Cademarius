"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, MapPin, Twitter, ArrowRight, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster" // Ajout du composant Toaster
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    contactReason: "question",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, contactReason: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Envoi réel des données du formulaire à votre API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Status code:', response.status)
      
      if (!response.ok) {
        const errorData = await response.text()
        console.error('Réponse d\'erreur:', errorData)
        throw new Error(`Erreur ${response.status}: ${errorData || 'Envoi échoué'}`)
      }

      const data = await response.json()
      console.log('Réponse succès:', data)

      // Message de succès
      toast({
        title: "Message envoyé",
        description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
      })

      // Réinitialisation du formulaire
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        contactReason: "question",
      })
    } catch (error) {
      console.error('Erreur complète:', error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500">
                Contact
              </div>
             <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Vous avez une question ?
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Que ce soit pour une question, une collaboration ou un projet, n'hésitez pas à me contacter. Je serais ravi d'échanger avec vous.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Comment me contacter ?</h2>
                  <p className="text-muted-foreground mb-6">
                    Vous pouvez me contacter via le formulaire ci-dessous ou directement par email. Je suis ouvert aux questions, collaborations et projets liés à la Data, à l'IA ou au Football.
                  </p>
                </div>

                <Tabs defaultValue="form" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="form">Formulaire</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                  </TabsList>

                  <TabsContent value="form" className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-800 p-2">
                        <Mail className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Formulaire de contact</h3>
                        <p className="text-sm text-muted-foreground">
                          Remplissez le formulaire ci-contre et je vous répondrai dans les plus brefs délais.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="email" className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-800 p-2">
                        <Mail className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email direct</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Envoyez-moi un email directement à l'adresse suivante :
                        </p>
                        <a href="mailto:cadem.adangnitode@epitech.eu" className="text-blue-500 font-medium hover:underline">
                          cadem.adangnitode@epitech.eu
                        </a>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-20"></div>
                <div className="relative rounded-lg border bg-card p-6 shadow-lg">
                  <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">Envoyez-moi un message</h2>
                    </div>

                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="contactReason">Raison du contact</Label>
                        <RadioGroup
                          value={formData.contactReason}
                          onValueChange={handleRadioChange}
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="question" id="question" />
                            <Label htmlFor="question" className="cursor-pointer">
                              Question
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="collaboration" id="collaboration" />
                            <Label htmlFor="collaboration" className="cursor-pointer">
                              Collaboration
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="project" id="project" />
                            <Label htmlFor="project" className="cursor-pointer">
                              Commentaire
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="football" id="football" />
                            <Label htmlFor="football" className="cursor-pointer">
                              Autre
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Votre email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Sujet de votre message"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Votre message"
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Toaster />
      <Footer />
    </div>
  )
}