import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";
const page = () => {
  return (
    <main className=" mx-auto max-w-7xl px-4 s">
      <Navbar />
      <Hero />
      <Testimonial />
    </main>
  );
};

export default page;
