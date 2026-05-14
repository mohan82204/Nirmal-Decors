"use client"

import * as React from "react"
// import { useTheme } from "next-themes"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "./animated-cards-stack"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const TESTIMONIALS = [
  {
    id: 'testimonial-3',
    name: 'Elena & Marcus',
    profession: 'Married 2024',
    rating: 5,
    description:
      'Nirmal Decor transformed our wedding into a literal fairytale. Every detail was perfect. The elegance and professionalism displayed was unmatched.',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'testimonial-1',
    name: 'Sophie & Liam',
    profession: 'Married 2025',
    rating: 5,
    description:
      'The attention to detail in their floral work is exceptional. Our guests were in awe of the ceremony arch and the ambient lighting.',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'testimonial-2',
    name: 'Chloe & Daniel',
    profession: 'Married 2023',
    rating: 5,
    description:
      'Working with Nirmal Decor was a game-changer for our project. Their expertise and professionalism exceeded our expectations.',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'testimonial-4',
    name: 'Grace & Thomas',
    profession: 'Married 2024',
    rating: 4.5,
    description:
      'The quality of work and communication throughout the project was outstanding. They delivered exactly what we needed for our Mandap.',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60',
  },
]

function getSectionClass(theme: string | undefined) {
  return "bg-transparent w-full"
}

function getReviewStarsClass(theme: string | undefined) {
  return "text-primary"
}

function getTextClass(theme: string | undefined) {
  return "text-foreground"
}

function getAvatarClass(theme: string | undefined) {
  return "!size-12 border border-stone-300"
}

function getCardVariant(theme: string | undefined): "light" | "dark" {
  return "light"
}

export function TestimonialsVariant() {
  const theme = "light"; // Since there is no next-themes in this vite app, I am hardcoding it to light

  return (
    <div className={getSectionClass(theme)}>
      <ContainerScroll className="container h-[200vh]">
        <div className="sticky left-0 top-0 h-svh w-full flex items-center justify-center">
          <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
            {TESTIMONIALS.map((testimonial, index) => (
              <CardTransformed
                arrayLength={TESTIMONIALS.length}
                key={testimonial.id}
                variant={getCardVariant(theme)}
                index={index + 1}
                role="article"
                aria-labelledby={`card-${testimonial.id}-title`}
                aria-describedby={`card-${testimonial.id}-content`}
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars
                    className={getReviewStarsClass(theme)}
                    rating={testimonial.rating}
                  />
                  <div className={`mx-auto w-4/5 text-lg ${getTextClass(theme)}`}>
                    <blockquote cite="#">{testimonial.description}</blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className={getAvatarClass(theme)}>
                    <AvatarImage
                      src={testimonial.avatarUrl}
                      alt={`Portrait of ${testimonial.name}`}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block text-lg font-semibold tracking-tight md:text-xl">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-muted-foreground ">
                      {testimonial.profession}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </div>
  )
}

import ButtonShineHoverDemo from "@/components/ui/shine-hover";

export function DemoOne() {
  return <ButtonShineHoverDemo />;
}