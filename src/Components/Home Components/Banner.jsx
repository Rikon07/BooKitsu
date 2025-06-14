import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";

import Anime1 from "../../assets/Animations/Anime -1.json";
import Anime2 from "../../assets/Animations/Anime -2.json";
import Anime3 from "../../assets/Animations/Anime -3.json";
import Anime4 from "../../assets/Animations/Anime -4.json";
import Anime6 from "../../assets/Animations/Animation - 6.json";

const bannerData = [
  {
    id: 1,
    image: "https://i.pinimg.com/originals/5a/34/9a/5a349a9870b2d04de8130dc977183e48.gif",
    title: "Your Digital Library",
    desc: "Carry your library in your pocket, anytime, anywhere.",
    animation: Anime1,
  },
  {
    id: 2,
    image: "https://i.pinimg.com/originals/4f/d3/0e/4fd30efd8301e3551a3a63da0d9c4d88.gif",
    title: "Streamlined Library System",
    desc: "Built for students, teachers, and staff to simplify book tracking.",
    animation: Anime2,
  },
  {
    id: 3,
    image: "https://i.pinimg.com/originals/20/96/4c/20964c996a414f28e1b9b670ded07eb4.gif",
    title: "Easy Book Borrowing",
    desc: "Track borrowed books and return deadlines seamlessly.",
    animation: Anime3,
  },
  {
    id: 4,
    image: "https://i.pinimg.com/originals/2f/ab/f3/2fabf3ceb5a35b51a70e27137d56e4d2.gif",
    title: "Effortless Book Management",
    desc: "Manage, update, and organize books with ease.",
    animation: Anime4,
  },
  {
    id: 5,
    image: "https://i.pinimg.com/originals/63/c2/96/63c296e8a56aa999a8807285fff4fc6b.gif",
    title: "Unlimited Access to Books",
    desc: "Explore, borrow, and manage all your favorite books in one place.",
    animation: Anime6,
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  return (
    <section className="w-full md:min-h-[90vh] mt-16 lg:mt-[74px] relative bg-gradient-to-br from-[#D0E7F9] via-[#b3d2f1] to-[#a2c8ec] dark:from-[#102535] dark:via-[#1e3b56] dark:to-[#223A5E] text-[#001E2D] dark:text-[#D0E7F9]">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        arrows
        showDots
        className="relative"
      >
        {bannerData.map((slide) => (
          <div
            key={slide.id}
            className="relative flex items-center justify-center h-[60vh] md:h-[90vh]"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute w-full h-full object-cover opacity-30"
            />

            <div className="absolute z-20 text-center max-w-4xl px-6">
              <Fade cascade damping={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  <Typewriter
                    words={[slide.title]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                  {slide.desc}
                </p>
                <Link to="/all-books">
                  <button className="text-white px-8 py-3 rounded-full font-semibold transition-all bg-gradient-to-b from-[#4FD1C5] to-[#223A5E] shadow-lg hover:shadow-xl hover:bg-gradient-to-b hover:from-[#223A5E] hover:to-[#4FD1C5]">
                    Explore Books
                  </button>
                </Link>
              </Fade>

              <div className="w-48 mx-auto opacity-50 mt-8">
                <Lottie animationData={slide.animation} loop autoplay />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
