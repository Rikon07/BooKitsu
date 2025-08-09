import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How to borrow?",
    answer:
      "Just click on the 'Borrow' button on a book's details page, select a return date, and confirm. You'll see a success message once it's done!",
  },
  {
    question: "Can I renew books?",
    answer:
      "Currently, renewal is not supported directly. Please return the book and borrow it again if it's still available.",
  },
  {
    question: "What happens if I miss the return date?",
    answer:
      "You’ll receive a reminder. Repeated late returns may temporarily restrict borrowing access, so return on time!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-6 px-6 xl:pb-16 cabin border-t-1 border-t-[#4FD1C5]/20 bg-[#D0E7F9] dark:bg-[#223A5E]">
        <div className=" text-[#223A5E] dark:text-[#D0E7F9] rounded-2xl max-w-[1435px] mx-auto ">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#4FD1C5]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-[#4FD1C5] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between px-5 py-1 xl:px-12 bg-white dark:bg-[#284569] hover:bg-[#4FD1C5]/10 transition duration-300"
            >
              <span className="font-semibold text-base md:text-lg text-left">{item.question}</span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 py-3 bg-white dark:bg-[#223A5E] text-sm text-gray-700 dark:text-gray-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQ;
