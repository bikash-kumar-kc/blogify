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
    { scope: cardRef, dependencies: [direction] }
  );

  return (
    <Box
      as="div"
      width={"90%"}
      p="4"
      ref={cardRef}
      className="group relative   p-4 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
    >
      {/* Image with Tilt Effect on Hover */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={image || "/images/image1.jpg"}
          alt={title}
          className=" h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent opacity-80" />
      </div>

      {/* Content */}
      <Box as="div" p="6">
        <Heading
          as="h3"
          fontSize={"2xl"}
          className="text-2xl font-bold text-white mb-4 transition-colors group-hover:text-cyan-400"
        >
          {title || "What is AI?"}
        </Heading>

        <div className="flex items-center gap-4">
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image src="/images/image1.jpg" />
          </Avatar.Root>
          <span className="text-slate-400 font-medium group-hover:text-white transition-colors">
            {userName || " Bikash Kumar KC"}
          </span>
        </div>
      </Box>
    </Box>
  );
};

export default PopularPost;
