'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
    {
      quote: "Cette application a complètement changé ma façon de préparer mes examens. Les défis interactifs rendent l'apprentissage tellement plus amusant !",
      author: "Amira Ben Khalifa",
      role: "Étudiante",
      company: "Lycée Pierre de Coubertin",
      companyType: "Lycée"
    },
    {
      quote: "Publier des QCM et suivre la progression de mes élèves n'a jamais été aussi simple. Cette plateforme est une révolution pour les enseignants.",
      author: "Karim Jaziri",
      role: "Professeur de Physique",
      company: "Lycée Habib Bourguiba",
      companyType: "Établissement secondaire"
    },
    {
      quote: "Les défis et le système d'XP transforment les révisions en une vraie aventure. J'adore me mesurer à mes amis tout en apprenant !",
      author: "Yassine Fakhfakh",
      role: "Étudiant",
      company: "Collège Ibn Khaldoun",
      companyType: "Collège"
    }
  ];
  

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const previousTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen flex bg-gray-50 items-center justify-center p-4 ">
      <div className="relative w-full max-w-2xl">
        <div 
          className="relative overflow-hidden rounded-3xl"
        >
          <div 
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 p-8 md:p-12 backdrop-blur-xl bg-white/10"
                >
                  <blockquote className="space-y-6">
                    <p className="text-2xl  md:text-3xl lg:text-4xl font-medium  leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    
                    <footer className="space-y-4">
                      <div className="space-y-1">
                        <div className="text-xl text-blue-600 md:text-2xl font-medium ">
                          {testimonial.author}
                        </div>
                        <div className="text-sm">
                          {testimonial.role}, {testimonial.company}
                        </div>
                        <div className=" text-sm">
                          {testimonial.companyType}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-5 h-5 fill-blue-600 " 
                            />
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={previousTestimonial}
                            className="p-3 rounded-full hover:text-blue-600 hover:bg-white/10 transition-colors"
                            aria-label="Previous testimonial"
                          >
                            <ChevronLeft className="w-6 h-6  " />
                          </button>
                          <button 
                            onClick={nextTestimonial}
                            className="p-3 rounded-full hover:text-blue-600 hover:bg-white/10 transition-colors"
                            aria-label="Next testimonial"
                          >
                            <ChevronRight className="w-6 h-6 " />
                          </button>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

