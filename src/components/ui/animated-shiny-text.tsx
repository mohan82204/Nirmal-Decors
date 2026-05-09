import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, #d4af37, #fff8dc, #d4af37, #b8860b, #d4af37)",
      gradientAnimationDuration = 3,
      hoverEffect = false,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const textVariants: Variants = {
      initial: {
        backgroundPosition: "0 0",
      },
      animate: {
        backgroundPosition: "300% 0", /* Increased from 200% for more motion range */
        transition: {
          duration: gradientAnimationDuration,
          repeat: Infinity,
          ease: "linear"
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn("flex justify-center items-center", className)}
        {...props}
      >
        <motion.h1
          className={cn("", textClassName)}
          style={{
            background: gradientColors,
            backgroundSize: "300% auto", /* Increased for more dramatic shimmer */
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "brightness(1.2) contrast(1.1)", /* Boost visibility */
            textShadow: "0 0 20px rgba(0,0,0,0.5)", /* Better separation from bg */
            display: 'inline-block',
          }}
          variants={textVariants}

          initial="initial"
          animate="animate"
          onHoverStart={() => hoverEffect && setIsHovered(true)}
          onHoverEnd={() => hoverEffect && setIsHovered(false)}
        >
          {text}
        </motion.h1>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
