import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
const Footer = () => {

    useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <div className="bg-[#D0E7F9] dark:bg-[#223A5E] border-t border-[#4FD1C5]/20">
      <footer className="max-w-[1440px] mx-auto bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] pt-6 md:pt-10 cabin ">
      <div className="mx-auto px-6 xl:px-2 grid grid-cols-1 md:grid-cols-4 gap-10" data-aos="fade-up">
        <div className="text-center md:text-left ">
          <Link to="/" className="text-xl md:text-2xl font-bold qyore tracking-wide text-[#223A5E] dark:text-[#D0E7F9] drop-shadow-sm dark:drop-shadow-[0_0_10px_#4FD1C5]">
            BooKitsu
          </Link>
          <p className="mt-3 text-sm text-[#3C4A61] dark:text-[#B0C4DE]">
            Your ultimate school library companion. Discover, track, and enjoy books with ease.
          </p>
          
        </div>


        <div>
          <h3 className="text-xl font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#4FD1C5] transition">Home</Link></li>
            <li><Link to="/all-categories" className="hover:text-[#4FD1C5] transition">Categories</Link></li>
            <li><Link to="/all-books" className="hover:text-[#4FD1C5] transition">All Books</Link></li>
            <li><Link to="/borrowed" className="hover:text-[#4FD1C5] transition">Borrowed Books</Link></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#4FD1C5] transition">Library Policy</a></li>
            <li><a href="#" className="hover:text-[#4FD1C5] transition">Help & Support</a></li>
            <li><a href="#" className="hover:text-[#4FD1C5] transition">Community</a></li>
            <li><a href="#" className="hover:text-[#4FD1C5] transition">Developers</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <div className="flex gap-4 mt-4 text-2xl">
            <a href="https://www.facebook.com/programmingHero" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition" data-aos="zoom-in">
              <FaFacebook />
            </a>
            <a href="https://github.com/Rikon07" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition" data-aos="zoom-in">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/rikon07/" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition" data-aos="zoom-in">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition" data-aos="zoom-in">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/c/ProgrammingHero" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition" data-aos="zoom-in">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      
      
    </footer>
    {/* Bottom Copyright */}
    <div className="border-t border-[#4FD1C5] text-center text-xs mt-10 text-[#3C4A61] dark:text-[#8FA2BF] pt-4 pb-10">
        &copy; {new Date().getFullYear()} BooKitsu. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;