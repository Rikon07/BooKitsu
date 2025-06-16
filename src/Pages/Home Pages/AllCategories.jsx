import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, History, Scroll, BookMarked, Library, BrainCircuit, GraduationCap, Landmark, BriefcaseBusiness, Clapperboard, HeartPulse, Ghost, LucideSearch, Baby, HeartHandshake, BookCopy, AlertTriangle, Drama } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../Components/Main Components/Navbar';
import Footer from '../../Components/Main Components/Footer';
import { Helmet } from 'react-helmet';



const categories = [
  { name: 'Tech', icon: <LayoutDashboard size={32} />, bg: 'bg-[#C5F6F3]', hover: 'hover:bg-[#A6EDE8]' },
  { name: 'Education', icon: <GraduationCap size={32} />, bg: 'bg-[#E0F7FA]', hover: 'hover:bg-[#B2EBF2]' },
  { name: 'Sci-Fi', icon: <BrainCircuit size={32} />, bg: 'bg-[#F1F8E9]', hover: 'hover:bg-[#DCEDC8]' },
  { name: 'Comics', icon: <BookMarked size={32} />, bg: 'bg-[#FDDCE0]', hover: 'hover:bg-[#F8C4CB]' },
  { name: 'Biographies', icon: <Landmark size={32} />, bg: 'bg-[#FFF3E0]', hover: 'hover:bg-[#FFE0B2]' },
  { name: 'Business', icon: <BriefcaseBusiness size={32} />, bg: 'bg-[#E3F2FD]', hover: 'hover:bg-[#BBDEFB]' },
  { name: 'Entertainment', icon: <Clapperboard size={32} />, bg: 'bg-[#F3E5F5]', hover: 'hover:bg-[#E1BEE7]' },
  { name: 'Health', icon: <HeartPulse size={32} />, bg: 'bg-[#E8F5E9]', hover: 'hover:bg-[#C8E6C9]' },
  { name: 'Horror', icon: <Ghost size={32} />, bg: 'bg-[#FBE9E7]', hover: 'hover:bg-[#FFCCBC]' },
  { name: 'Mystery', icon: <LucideSearch size={32} />, bg: 'bg-[#F0F4C3]', hover: 'hover:bg-[#E6EE9C]' },
  { name: 'Kids', icon: <Baby size={32} />, bg: 'bg-[#FFECB3]', hover: 'hover:bg-[#FFD54F]' },
  { name: 'Religion', icon: <Scroll size={32} />, bg: 'bg-indigo-300', hover: 'hover:bg-indigo-400' },
  { name: 'Novel', icon: <BookOpen size={32} />, bg: 'bg-[#E6DAF6]', hover: 'hover:bg-[#D3C1F3]' },
  { name: 'Thriller', icon: <AlertTriangle size={32} />, bg: 'bg-[#FFCDD2]', hover: 'hover:bg-[#EF9A9A]' },
  { name: 'History', icon: <History size={32} />, bg: 'bg-[#FFF2CE]', hover: 'hover:bg-[#FFE9A7]' },
  { name: 'Drama', icon: <Drama size={32} />, bg: 'bg-[#D7CCC8]', hover: 'hover:bg-[#BCAAA4]' },
];
const AllCategories = () => {
  return (
    <div className="min-h-screen bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] ">
        <Helmet>
        <title>All Categories | Bookitsu</title>
        </Helmet>
      <Navbar />
      <div className="cabin px-4 lg:px-20 py-20">
        <h2 className="dark:text-[#D0E7F9] text-3xl font-bold text-center mb-8">All Book Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/category/${cat.name}`}>
                <div className={`rounded-xl p-6 text-center shadow-md transition ${cat.bg} ${cat.hover} text-[#223A5E] dark:text-[#D0E7F9]`}>
                  <div className="text-[#223A5E] flex justify-center mb-3">{cat.icon}</div>
                  <h3 className="text-[#223A5E] text-xl font-semibold">{cat.name}</h3>
                  <p className="text-sm mt-1 hover:underline text-[#6C6E96]">Explore {cat.name} books</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllCategories;
