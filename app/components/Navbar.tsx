"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import MorphingButton from "./morphing-button";

const Navbar = () => {
  return (
    <motion.div
      className="flex items-center justify-between py-5"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link className="flex items-center gap-2" href={"/"}>
          <Image
            src="/invoice.png"
            alt="logo"
            width={100}
            height={100}
            className="transition-transform duration-300 md:w-24 w-16 ease-in-out hover:rotate-6"
          />
          <h3 className="md:text-3xl text-[20px] font-bold">
            Invoice <span className="text-yellow-600">Dishant</span>
          </h3>
        </Link>
      </motion.div>
      <MorphingButton
        texts={["Get Started", "Login"]}
        interval={2000}
        href="/login"
      />
    </motion.div>
  );
};

export default Navbar;
