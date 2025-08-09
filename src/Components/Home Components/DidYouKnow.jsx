import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaLightbulb } from "react-icons/fa";

const facts = [
  "Reading for just 6 minutes can reduce stress by 68%.",
  "The longest novel ever written is over 9 million words long!",
  "Audiobooks count as reading too — engage your ears.",
  "Reading boosts your vocabulary more than talking or watching TV.",
  "Carrying a book everywhere helps you avoid doomscrolling.",
  "Re-reading a favorite book is like visiting an old friend.",
  "E-books save trees and space — go digital!",
  "Try reading before bed, not scrolling. It helps you sleep better.",
];

const DidYouKnow = () => {
  return (
    <section className="bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] py-10 border-t-1 border-t-[#4FD1C5]/20 px-4 cabin">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto text-center"
      >
        <div className="flex justify-center items-center gap-3 mb-4 text-2xl md:text-3xl text-[#4FD1C5]">
          <FaLightbulb />
          <h2 className="font-bold tracking-wide">Did You Know?</h2>
        </div>
        <p className="mb-8 text-sm text-[#6C6E96] dark:text-[#BCD4CC]">Fun book facts and reading tips to keep you inspired 📚</p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-[#284569] rounded-lg shadow-md p-4 md:p-6 flex items-start gap-3"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaBookOpen className="text-[#4FD1C5] mt-1" />
              <p className="text-left text-sm">{fact}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default DidYouKnow;
