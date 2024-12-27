'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { RainbowButton } from '@/components/ui/rainbow-button'

interface MorphingButtonProps {
  texts: string[]
  interval?: number
  href: string
}

export default function MorphingButton({ texts, interval = 3000, href }: MorphingButtonProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts, interval])

  return (
    <motion.div
      whileHover={{ scale: 1.1, x: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <RainbowButton className='w-[150px]'>
        <Link href={href} className="font-semibold text-[14px] md:text-[15px] text-white">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentTextIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {texts[currentTextIndex]}
            </motion.span>
          </AnimatePresence>
        </Link>
      </RainbowButton>
    </motion.div>
  )
}

