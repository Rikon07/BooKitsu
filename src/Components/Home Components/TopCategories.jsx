import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, History, Scroll, BookMarked, Library } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';



const categories = [
  {
    name: 'Tech',
    icon: <LayoutDashboard size={32} />,
    bg: 'bg-[#C5F6F3]',
    hover: 'hover:bg-[#A6EDE8]',
  },
  {
    name: 'Comics',
    icon: <BookMarked size={32} />,
    bg: 'bg-[#FDDCE0]',
    hover: 'hover:bg-[#F8C4CB]',
  },
  {
    name: 'History',
    icon: <History size={32} />,
    bg: 'bg-[#FFF2CE]',
    hover: 'hover:bg-[#FFE9A7]',
  },
  {
    name: 'Religion',
    icon: <Scroll size={32} />,
    bg: 'bg-indigo-300',
    hover: 'hover:bg-indigo-400',
  },
  {
    name: 'Novel',
    icon: <BookOpen size={32} />,
    bg: 'bg-[#E6DAF6]',
    hover: 'hover:bg-[#D3C1F3]',
  },
];

const TopCategories = () => {
  return (
    <section className="py-12 cabin px-4 lg:px-20 bg-[#D0E7F9] dark:bg-[#223A5E]">
      <h2 className="text-3xl font-bold text-center text-[#223A5E] dark:text-[#D0E7F9] mb-5 flex items-center justify-center gap-2">
        <Library /> Top Book Categories
      </h2>

      <div className="text-right max-w-7xl mx-auto mb-4">
  <Link to="/all-categories">
    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4FD1C5] hover:bg-[#38b2ac] text-white font-semibold text-xs md:text-sm transition">
      All Categories <ArrowRightCircle size={20} />
    </button>
  </Link>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 max-w-7xl mx-auto">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/category/${cat.name}`}>
              <div
                className={`rounded-xl p-4 lg:p-6 text-center shadow-md transition duration-300 cursor-pointer ${cat.bg} ${cat.hover} text-[#223A5E] dark:text-[#D0E7F9]`}
              >
                <div className="flex text-[#223A5E] justify-center mb-3">{cat.icon}</div>
                <h3 className="text-xl text-[#223A5E] font-semibold">{cat.name}</h3>
                <p className="text-sm mt-1 text-[#6C6E96]">Explore {cat.name} books</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
