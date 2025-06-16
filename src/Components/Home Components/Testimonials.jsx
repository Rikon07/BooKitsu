import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Book, Star } from "lucide-react";
import { motion } from "framer-motion";
const Testimonials = () => {

  const reviews = [
    {
      name: "Naruto Uzumaki",
      rating: 5,
      comment: "BooKitsu makes book hunting easy! I borrowed all the ninja scrolls I needed.",
      photo: "https://images.immediate.co.uk/production/volatile/sites/3/2023/04/naruto-762b09d.jpg?quality=90&resize=980,654",
    },
    {
      name: "Sakura Haruno",
      rating: 4,
      comment: "Finally, a system that tracks my borrowed books! No more overdue panic.",
      photo: "https://cdn.costumewall.com/wp-content/uploads/2018/09/sakura-haruno.jpg",
    },
    {
      name: "Gon Freecss",
      rating: 5,
      comment: "Felt like a quest! Searching, borrowing, and returning—all super smooth.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyiNOGSd1g5Cl6eyQEQoekiBP26GkmpfL6HQ&s",
    },
    {
      name: "Killua Zoldyck",
      rating: 4,
      comment: "The dark mode interface is clean, and the return reminders are a lifesaver.",
      photo: "https://i0.wp.com/hunterxhunter2016.wordpress.com/wp-content/uploads/2016/05/kilua.png?fit=1200%2C1038&ssl=1&w=640",
    },
    {
      name: "Luffy D. Monkey",
      rating: 5,
      comment: "This system is a treasure! Borrowed my favorite novels with no hassle.",
      photo: "https://i.pinimg.com/564x/be/53/52/be535275d7d0998c67de1fa0e01189f5.jpg",
    },
    {
      name: "Levi Ackerman",
      rating: 5,
      comment: "Clean and efficient. BooKitsu is just what our school library needed.",
      photo: "https://i.pinimg.com/736x/1e/6c/da/1e6cda3141c1bd9ac02beb59599f85cc.jpg",
    },
    {
      name: "Hinata Hyuga",
      rating: 5,
      comment: "BooKitsu is super easy to use. Borrowing books has never felt this soft.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTcn7Jq_hIKZHdWiQCWaugjGPxbS-l2DDiA&s",
    },
    {
      name: "Zero Two",
      rating: 5,
      comment: "Darling, this library system is beautiful. Every book feels handpicked!",
      photo: "https://i.scdn.co/image/ab676161000051743fa0496e4b6c820053ba0e21",
    },
    {
      name: "Tanjiro Kamado",
      rating: 4,
      comment: "I love how organized everything is. Borrowing is now super peaceful.",
      photo: "https://preview.redd.it/who-would-make-a-better-protagonist-than-tanjiro-and-why-v0-vrgvxvkeie8d1.png?auto=webp&s=5e43e666f623f9737c034c17784e99d022219309",
    },
    {
      name: "Nezuko Kamado",
      rating: 5,
      comment: "So cute and simple! BooKitsu helps me keep track without saying a word.",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9dwpbXA2PXllGlrUWhp3CWjbH6EEB_Ca9g&s",
    },
  ];

  return (
    <div className="bg-[#D0E7F9] dark:bg-[#223A5E] cabin border-t-1 border-t-[#4FD1C5]/20 pb-6">
        <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-[#D0E7F9] dark:bg-[#223A5E] drop-shadow-lg py-6 px-4 max-w-[1440px] mx-auto "
    >
      <h2 className="text-3xl flex justify-center items-center gap-2 font-bold text-[#4FD1C5] mb-6 text-center">
        <Book/> Testimonials
      </h2>
      <Marquee direction="right" pauseOnHover gradient={false} speed={40}>
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="w-72 mx-4 flex-shrink-0 bg-white dark:bg-[#284569] rounded-xl p-4 border border-[#4FD1C5] shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.photo}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border border-[#4FD1C5]"
              />
              <div>
                <p className="font-semibold text-[#223A5E] dark:text-white text-sm">
                  {review.name}
                </p>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < review.rating ? "#FACC15" : "none"}
                      strokeWidth={1}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm italic text-[#284569] dark:text-[#D0E7F9]">
              “{review.comment}”
            </p>
          </div>
        ))}
      </Marquee>
    </motion.div>
    </div>
  );
};

export default Testimonials;
