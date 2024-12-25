"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileX2,
  AlertCircle,
  ReceiptIndianRupee,
  IndianRupee,
} from "lucide-react";
import { redirect } from "next/navigation";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center  rounded-lg p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <FileX2 className="w-24 h-24 text-gray-300" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="absolute -top-2 -right-2"
        >
          <AlertCircle className="w-8 h-8 text-yellow-500" />
        </motion.div>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold mb-4 text-gray-800"
      >
        No Invoices Found
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        It looks like you haven&apos;t created any invoices yet. Start by
        creating your first invoice to get an overview of your finances.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute -top-6 -left-6"
        >
          <IndianRupee className="w-12 h-12 text-green-500" />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
            delay: 0.5,
          }}
          className="absolute -bottom-6 -right-6"
        >
          <ReceiptIndianRupee className="w-12 h-12 text-blue-500" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-32 h-32 bg-white rounded-full flex hover:bg-gray-100 duration-300  items-center cursor-pointer justify-center shadow-lg"
          onClick={() => {
            redirect("/dashboard/invoices/create");
          }}
        >
          <span className="text-4xl font-bold text-gray-400">+</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
