"use client";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import SparklesText from "@/components/ui/sparkles-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <motion.section
      className="relative flex flex-col items-center justify-center py-12 lg:py-20 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Button Section */}
      <motion.div
        className="z-10 flex min-h-34 items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <Link href="/dashboard/invoices">✨ Introducing Invoice 1.0 </Link>
            <ArrowRightIcon className="ml-1 w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <SparklesText
          className="text-4xl md:text-6xl lg:text-[90px] leading-tight"
          text="Invoice made"
        />
        <motion.span
          className="block -mt-2 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text text-2xl md:text-4xl lg:text-7xl font-extrabold pb-2"
          whileHover={{ scale: 1.05 }}
        >
          super easy!
        </motion.span>
        <p className="mt-6 text-lg text-neutral-500 dark:text-neutral-400">
          Invoice is a simple and easy-to-use invoicing software that helps you
          create and send invoices in seconds.
        </p>
        <motion.button
          className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Unlimited Access
        </motion.button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="relative items-center w-full py-12 mx-auto mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        <svg
          className="absolute inset-0 -mt-24 blur-3xl"
          style={{ zIndex: -1 }}
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path
                d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                fill="#08ecd1"
              ></path>
              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#c6cbff"
              ></path>
              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#8291da"
              ></path>
              <path
                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                fill="#9daeee"
              ></path>
            </g>
          </g>
        </svg>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="mt-8 relative object-cover w-full border rounded-lg lg:rounded-2xl shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
