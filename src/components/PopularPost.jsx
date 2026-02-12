import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Avatar, Box, Heading } from "@chakra-ui/react";
gsap.registerPlugin(ScrollTrigger);

const PopularPost = ({
  image,
  title,
  userName,
  delay = 0,
  direction = "left",
  category,
  date,
  readTime,
  description,
  authorImage,
  userRole,
}) => {
  const cardRef = useRef();

  useGSAP(
    () => {
      const startX = direction === "left" ? -900 : 900;

      gsap.from(cardRef.current, {
        x: startX,
        opacity: 0,
        scale: 0.8,
        rotateY: direction === "left" ? -30 : 30,
        duration: 0.5,
        delay: delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: cardRef, dependencies: [direction] },
  );

  return (
    <Box
      as="div"
      width={"90%"}
      p="4"
      ref={cardRef}
      mb={"1rem"}
      className="group relative p-4 rounded-2xl overflow-hidden border border-white/10 bg-linear-to-br from-slate-950 to-slate-900 transition-all duration-500"
    >
      {/* Animated Background Gradient on Hover */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 " />

      {/* Image with Tilt Effect on Hover */}
      <div className="relative h-60 w-full overflow-hidden rounded-xl">
        <img
          src={image || "/images/image1.jpg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80" />
      </div>

      {/* Content */}
      <Box as="div" p="6" className="relative z-10">
        {/* Date and Reading Time */}
        <div className="flex items-center gap-3 mb-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="group-hover:text-slate-300 transition-colors">
              {date || "Feb 12, 2026"}
            </span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="group-hover:text-slate-300 transition-colors">
              {readTime || "5 min read"}
            </span>
          </div>
        </div>

        {/* Title */}
        <Heading
          as="h3"
          fontSize={"2xl"}
          marginTop={"1rem"}
          marginBottom={"1rem"}
          className="text-2xl font-bold text-white  transition-colors duration-300  line-clamp-2"
        >
          {title || "What is AI? Understanding Artificial Intelligence"}
        </Heading>

        {/* Description */}
        <p className="text-slate-400 text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-slate-300 transition-colors duration-300 text-left">
          {description ||
            "Explore the fascinating world of artificial intelligence and discover how machine learning is transforming our daily lives and shaping the future of technology."}
        </p>

        {/* Author Info and Button */}
        <Box as="div" className="flex items-center justify-between" mt={"1.5rem"}>
          <div className="flex items-center gap-3">
            <Avatar.Root className="w-10 h-10 ring-2 ring-slate-800 group-hover:ring-cyan-500/50 transition-all duration-300">
              <Avatar.Fallback className="bg-slate-800 text-slate-400" />
              <Avatar.Image src={authorImage || "/images/image1.jpg"} />
            </Avatar.Root>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                {userName || "Bikash Kumar KC"}
              </span>
              <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                {userRole || "Tech Writer"}
              </span>
            </div>
          </div>

          {/* Read More Button */}
          <button className="px-5 py-2.5 bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-300 backdrop-blur-sm transition-all duration-300 flex items-center gap-2 group/btn">
            Read More
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default PopularPost;
