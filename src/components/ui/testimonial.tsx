import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
  profession?: string
  rating?: number
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
}

// Helper to render stars
const ReviewStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1 text-[#d4af37] mb-2">
      {[...Array(Math.floor(rating))].map((_, i) => (
        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          setExitX(0)
        }, 200)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full flex items-center justify-center py-12",
          className
        )}
        {...props}
      >
        <div className="relative w-[350px] sm:w-[400px] h-[450px]">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing",
                  "flex flex-col items-center justify-center p-8",
                  "bg-[rgba(10,10,10,0.9)] backdrop-blur-xl border border-[rgba(212,175,55,0.2)] shadow-2xl"
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 12 : 24,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -3 : -6,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 12 : 24,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -3 : -6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-4 flex justify-between px-6 pointer-events-none">
                    <span className="text-3xl select-none text-[#d4af37] opacity-50">&larr;</span>
                    <span className="text-3xl select-none text-[#d4af37] opacity-50">&rarr;</span>
                  </div>
                )}

                <div className="flex flex-col items-center gap-6 mt-4 w-full">
                  {testimonial.rating && <ReviewStars rating={testimonial.rating} />}
                  
                  <blockquote className="text-center font-serif text-xl sm:text-2xl italic leading-relaxed text-[#e2d9c9]">
                    "{testimonial.description}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 mt-6 w-full justify-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border border-[rgba(212,175,55,0.3)]"
                    />
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg font-serif text-[#d4af37]">
                        {testimonial.name}
                      </h3>
                      {testimonial.profession && (
                        <span className="text-[11px] text-white/40 uppercase tracking-[2px]">
                          {testimonial.profession}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          {showDots && (
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-300",
                    index === currentIndex
                      ? "bg-[#d4af37]"
                      : "bg-[#d4af37]/20"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel, type Testimonial }
