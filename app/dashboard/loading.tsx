// /e:/NextJS/invoiceplatform/app/dashboard/loading.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
};

const loading = () => {
  return (
    <div className="loader-container">
      <motion.div
        className="loader"
        variants={loaderVariants}
        animate="animationOne"
      />
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .loader {
          width: 10px;
          height: 10px;
          background-color: #333;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default loading;
