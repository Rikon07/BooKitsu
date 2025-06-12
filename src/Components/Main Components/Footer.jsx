import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] px-6 md:px-12 lg:px-20 py-10 cabin border-t border-[#4FD1C5]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
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
            <li><Link to="/all-books" className="hover:text-[#4FD1C5] transition">All Books</Link></li>
            <li><Link to="/add-book" className="hover:text-[#4FD1C5] transition">Add Book</Link></li>
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
          {/* <p className="text-sm text-[#3C4A61] dark:text-[#B0C4DE] mb-2">
            Join our newsletter for the latest updates.
          </p> */}
          {/* <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-white dark:bg-[#1A2A3F] text-[#223A5E] dark:text-[#D0E7F9] border border-[#4FD1C5] focus:outline-none"
            />
            <button className="bg-[#4FD1C5] text-[#223A5E] font-semibold py-2 rounded hover:bg-[#3CA6A6] hover:text-[#F7FAFC] transition">
              Subscribe
            </button>
          </form> */}
          <div className="flex gap-4 mt-4 text-2xl">
            <a href="https://www.facebook.com/programmingHero" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition">
              <FaFacebook />
            </a>
            <a href="https://github.com/Rikon07" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/rikon07/" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/c/ProgrammingHero" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD1C5] transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs mt-10 text-[#3C4A61] dark:text-[#8FA2BF]">
        &copy; {new Date().getFullYear()} BooKitsu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;