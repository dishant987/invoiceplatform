"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Small Business Owner",
    content:
      "This invoice platform has revolutionized my billing process. It's so easy to use and saves me hours every week!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Freelance Designer",
    content:
      "I love how professional my invoices look now. My clients are impressed, and I get paid faster!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "Marketing Consultant",
    content:
      "The automated reminders have significantly reduced my late payments. This platform is a game-changer!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "IT Services Provider",
    content:
      "The ability to customize invoice templates has helped me brand my business better. Highly recommended!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef(null);
  const controls = useAnimation();

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent,
    info: { velocity: { x: number } }
  ) => {
    const threshold = 50;
    const velocity = info.velocity.x;

    if (velocity < -threshold && currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (velocity > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      controls.start({ x: 0 });
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Customers Say
      </h2>
      <div className="relative overflow-hidden" ref={constraintsRef}>
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="cursor-grab active:cursor-grabbing"
        >
          <motion.div
            key={currentIndex}
            custom={currentIndex > testimonials.length / 2 ? -1 : 1}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <Avatar  className="mr-4 size-14">
                <AvatarFallback>
                  {testimonials[currentIndex].name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-gray-600">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
            <Quote className="w-8 h-8 text-gray-400 mb-4" />
            <p className="text-gray-700 italic">
              {testimonials[currentIndex].content}
            </p>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shadow-md hover:shadow-lg"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shadow-md hover:shadow-lg"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
