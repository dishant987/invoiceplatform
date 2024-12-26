"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

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
            src="/Invoice.png"
            alt="logo"
            width={100}
            height={100}
            className="transition-transform duration-300 ease-in-out hover:rotate-6"
          />
          <h3 className="text-3xl font-bold">
            Invoice <span className="text-yellow-600">Dishant</span>
          </h3>
        </Link>
      </motion.div>
      <RainbowButton className="flex items-center gap-2">
        <motion.div
          whileHover={{ scale: 1.1, x: 10 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link href={"/login"}>Get Started</Link>
        </motion.div>
      </RainbowButton>
    </motion.div>
  );
};

export default Navbar;
