"use client"

import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Card, CardContent } from "@/components/ui/card"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface SliderItem {
  id: number
  title: string
  image: string
  description?: string
  price?: string
  badge?: string
}

interface SwiperSliderProps {
  items: SliderItem[]
  slidesPerView?: number
  spaceBetween?: number
  autoplay?: boolean
  className?: string
  showPagination?: boolean
  showNavigation?: boolean
}

export default function SwiperSlider({
  items,
  slidesPerView = 3,
  spaceBetween = 30,
  autoplay = true,
  className = "",
  showPagination = true,
  showNavigation = true,
}: SwiperSliderProps) {
  const swiperRef = useRef<any>(null)

  return (
    <div className={`relative ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={1}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: Math.min(2, slidesPerView),
          },
          768: {
            slidesPerView: Math.min(3, slidesPerView),
          },
          1024: {
            slidesPerView: slidesPerView,
          },
        }}
        className="pb-12"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-animation p-0">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg ">
                  <img
                    src={item.image || "/img/img1.png"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold font-heading line-clamp-2 text-black">{item.title}</h3>
                  {item.description && <p className="text-sm text-muted-foreground line-clamp-2 text-black">{item.description}</p>}
                  {item.price && <p className="text-lg font-bold text-primary text-black">{item.price}</p>}
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
