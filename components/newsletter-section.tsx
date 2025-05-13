import { NewsletterForm } from "@/components/newsletter-form"

export function NewsletterSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-500">
              Ma Newsletter
            </div>
           <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Football, IA & Big Data</h2>
            <p className="text-muted-foreground md:text-lg">
              Que vous soyez passionné par le ballon rond, curieux de data science ou amateur d’intelligence artificielle, cette newsletter est faite pour vous. 
              Abonnez-vous pour recevoir mes analyses, réflexions et découvertes directement dans votre boîte mail.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
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
                  className="h-5 w-5 text-blue-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">Analyses tactiques</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="h-5 w-5 text-blue-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">Projets IA & football</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="h-5 w-5 text-blue-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">Tutoriels data</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="h-5 w-5 text-blue-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">Publication mensuelle</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <img
                  src="/newsletter1.png?height=40&width=40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                />
                <img
                  src="/newsletter2.jpg?height=40&width=40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                />
                <img
                  src="/newsletter3.jpg?height=40&width=40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Rejoignez ma communauté de <span className="font-medium text-foreground">500+</span> passionnés
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-20"></div>
            <div className="relative bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}