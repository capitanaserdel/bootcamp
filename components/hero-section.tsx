"use client"

import { Calendar, MapPin, Clock, Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/lib/use-scrol-animation"
import Image from "next/image"


interface HeroSectionProps {
  onBookNow: () => void
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2)

  const scrollToDetails = () => {
    document.getElementById("event-details")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-gradient-to-br from-pink-800 via-pink-500 to-blue-500 text-white overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 animate-pulse"></div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-1000 hidden md:block"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-pink-300/30 rounded-full animate-bounce delay-2000 hidden md:block"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-3000 hidden md:block"></div>

      <div ref={heroRef} className="relative container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-10">
        {/* Shining Voice Global Link Branding */}
     <div
  className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
    heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
  }`}
><div className="flex flex-row sm:flex-row items-start sm:items-start justify-center gap-6">
  {/* First item */}
  <div className="flex flex-col items-start sm:items-start text-center sm:text-left">
    <h1 className="text-xs sm:text-xl md:text-sm font-bold text-blue-50 text-md sm:text-xl tracking-wider animate-pulse drop-shadow-lg font-serif">
      Proudly Sponsored by
    </h1>
    <div className="w-38 h-24 sm:w-44 sm:h-20 bg-white rounded-md flex items-center justify-center mb-2 shadow-md">
      <Image
        src="/zdd.png"
        width={100}
        height={100}
        alt="Logo 1"
        className="w-16 h-16 sm:w-32 sm:h-20 object-contain"
      />
    </div>
  </div>

  {/* Second item */}
  <div className="flex flex-col items-start sm:items-start text-center sm:text-left">
    <h1 className="text-xs sm:text-xl md:text-sm font-bold text-purple-50 text-md sm:text-xl tracking-wider animate-pulse drop-shadow-lg font-serif">
      Organised by
    </h1>
    <div className="w-38 h-24 sm:w-44 sm:h-20 bg-white rounded-md flex items-center justify-center mb-2 shadow-md">
      <Image
        src="/zaa.png"
        width={100}
        height={100}
        alt="Logo 2"
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
      />
    </div>
  </div>
</div>
</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div
            className={`space-y-4 sm:space-y-6 order-2 lg:order-1 transition-all duration-1000 delay-300 ${
              heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-4 leading-tight transform hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                  CODEHER: Free Mobile App Development Bootcamp for Women
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-lg text-pink-100 leading-relaxed">
                In today’s digital era, technology has become one of the most powerful tools for opportunity, empowerment, and change. For women in Northern Nigeria, learning to build mobile apps is not only a path into tech, but also a gateway to financial independence, creative problem-solving, and global collaboration.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4 transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
              <div className="flex  gap-1  justify-start space-y-2 sm:space-y-0 sm:space-x-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Monday, 6th October 2025</span>
              </div>
              <div className="flex gap-1 sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">InnoSpace X, Murtala Muhammad Library complex, Kano</span>
              </div>
              <div className="flex gap-1 sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">10:00 AM – 1:00 PM</span>
              </div>
              <div className="flex gap-1 sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base">Monday - Friday</span>
              </div>
            </div>

            <Button
              onClick={onBookNow}
              className="bg-white text-pink-600 hover:bg-pink-50 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transform hover:scale-110 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              <span className="animate-pulse">Register Now</span>
            </Button>
          </div>

          {/* Right Content - Artist Image */}
         {/* Right Content - Artist Image */}
<div
  className={`flex justify-center lg:justify-end order-1 lg:order-2 transition-all duration-1000 delay-500 ${
    heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
  }`}
>
  <div className="relative group">
    {/* Keep same size on mobile, bigger only on sm+ */}
    <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
      <Image
        src="/3.jpg"
        width={1500}
        height={1500}
        alt="Bootcamp Image"
        className="w-full h-full object-cover transform group-hover:scale-150 transition-transform duration-700"
      />
    </div>

    {/* Animated Decorative elements */}
    <div className="absolute -top-6 -right-6 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white/20 rounded-full blur-xl animate-pulse"></div>
    <div className="absolute -bottom-6 -left-6 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-blue-300/30 rounded-full blur-lg animate-bounce delay-1000"></div>
    <div className="absolute top-1/2 -left-8 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-white/10 rounded-full animate-ping delay-2000"></div>
  </div>
</div>
        </div>

        {/* Organized by section */}
        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-1000 delay-700 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
         
        </div>

        {/* Scroll Down Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToDetails}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/70 hover:text-white transition-colors duration-300" />
        </div>
      </div>
    </section>
  )
}