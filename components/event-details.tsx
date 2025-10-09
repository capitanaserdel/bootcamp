"use client"

import { useScrollAnimation } from "@/lib/use-scrol-animation"
import { CheckCircle, Award, Palette, Mic, Heart } from "lucide-react"
import Image from "next/image"


export default function EventDetails() {
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation(0.1)
  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollAnimation(0.2)
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation(0.2)
  const { ref: speakersRef, isVisible: speakersVisible } = useScrollAnimation(0.2)

  const highlights = [
    "Learn mobile app development using Flutter from scratch",
    "Complete mini projects and a capstone project",
    "Showcase their final apps and receive certificates",
    "Join a community of women empowered for tech careers",
    "Gain the soft skills needed for remote work (communication, time management, CV writing)",
  ]

  const eligibility = [
    "Women aged 18–35",
    "Passionate about learning mobile development",
    "Committed to attending full 6-week training",
    "Must have access to a computer",
  ]

  const agenda = [
    {
      time: "Week 1",
      title: "Orientation, tech careers, remote work intro, soft skill",
      description: "Check-in, networking, and opening remarks",
    },
    {
      time: "Week 2-4",
      title: "Technical training (Flutter, UI/UX, APIs) with mini-projects",
      description: "The power of creative expression in social change",
    },
    {
      time: "Week 5",
      title: "Capstone project development",
      description: "Young voices sharing their stories through poetry",
    },
    {
      time: "Week 6",
      title: "Showcase & graduation",
      description: "Hands-on creative workshop for participants",
    },

  ]

  const speakers = [
    {
      title: "Idea and Data Global Acadamy",
    },
  ]

  return (
    <section id="event-details" className="py-12 sm:py-16 bg-gradient-to-b from-blue-100 to-white scroll-smooth">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div
            ref={detailsRef}
            className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${detailsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">
              About the Event
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A 6-week bootcamp empowering 30 women in Northern Nigeria with mobile app development skills, career readiness, and opportunities for the digital economy.
            </p>
          </div>

          <div ref={highlightsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Event Highlights */}
            <div
              className={`transition-all duration-1000 ${highlightsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 mr-2 animate-pulse" />
                What to Expect
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 transform hover:translate-x-2 transition-all duration-300 ${highlightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                      }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 mt-1 flex-shrink-0 animate-pulse" />
                    <p className="text-sm sm:text-base text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Agenda */}
            <div
              className={`transition-all duration-1000 delay-300 ${highlightsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 mr-2 animate-pulse" />
                Program Outline
              </h3>
              <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-2">
                {agenda.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-orange-100 transform hover:scale-105 hover:shadow-md transition-all duration-300 ${highlightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                      }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <span className="bg-pink-100 text-pink-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full flex-shrink-0 animate-pulse">
                        {item.time}
                      </span>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900">{item.title}</h4>
                    </div>
                    {/* <p className="text-gray-600 text-xs sm:text-sm ml-0 sm:ml-2">{item.description}</p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div
            ref={missionRef}
            className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 transform hover:scale-105 transition-all duration-500 ${missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="text-center">
              <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-pink-50 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl sm:text-3xl font-bold mb-4">Who Should Apply / Eligibility</h3>

              <div className="space-y-3 sm:space-y-4">
                {eligibility.map((eligibility, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 transform hover:translate-x-2 transition-all duration-300 ${highlightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                      }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-50 mt-1 flex-shrink-0 animate-pulse" />
                    <p className="text-xs sm:text-lg font-bold text-white">{eligibility}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Voices */}
          <div ref={speakersRef}>
            <h3
              className={`text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center flex items-center justify-center transition-all duration-1000 ${speakersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              Sponsors
            </h3><div className="max-w-7xl mx-auto px-4">
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-3 justify-items-center">
    {speakers.map((speaker, index) => (
      <div
        key={index}
        className={`bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-purple-100 text-center hover:shadow-lg transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ${
          speakersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
          <Image
            src="/zd.png"
            width={800}
            height={800}
            alt="Sponsor logo"
            className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <p className="text-blue-800 text-xs sm:text-sm font-medium mb-2">{speaker.title}</p>
      </div>
    ))}
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  )
}