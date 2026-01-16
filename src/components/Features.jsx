import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const Features = ({ delay = 0.2, imageLeft, image, title, description }) => {
  const scope = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".shake-left", {
        x: -800,
        opacity: 0,
        rotation: -15,
        duration: 2,
        delay: Number(delay),
        ease: "elastic.out(1, 0.75)",
      })
        .from(
          ".shake-right",
          {
            x: 800,
            opacity: 0,
            rotation: 15,
            duration: 2,
            ease: "elastic.out(1, 0.75)",
          },
          "-=1"
        )
        .to(".shake-item", {
          y: "+=15",
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });
    },
    { scope }
  );
  return (
    <Box
      as="div"
      py="20"
      ref={scope}
      className="flex items-center justify-center min-h-[60vh] overflow-hidden "
    >
      <div
        className={`max-w-8xl w-full flex flex-col md:flex-row items-center gap-16 px-10 ${
          !imageLeft ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image Container */}
        <div
          className={`w-full md:w-1/2 ${
            imageLeft ? "shake-left" : "shake-right"
          } shake-item`}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <img
              src={image}
              alt={title}
              className="relative filter brightness-75   rounded-lg transition duration-400 shadow-2xl border border-white/10 w-full h-auto object-cover group-hover:brightness-100 group-hover:scale-110 "
            />
          </div>
        </div>

        {/* Text Container */}
        <Box
          as="div"
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"2rem"}
          className={`w-full md:w-1/2 space-y-6 shake-item ${
            imageLeft ? "shake-right" : "shake-left"
          }`}
        >
          <Heading
            as="h2"
            fontSize={"5xl"}
            className="text-5xl font-bold text-white tracking-tight uppercase"
          >
            {title}
          </Heading>
          <Text
            as="p"
            fontSize={"xl"}
            className="text-xl text-slate-400 leading-relaxed"
          >
            {description}
          </Text>
          <Button
            as="button"
            px="8"
            py="3"
            _hover={{
              bg: "green",
            }}
            className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-black hover:scale-110 transition duration-300"
          >
            Learn More
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default Features;
