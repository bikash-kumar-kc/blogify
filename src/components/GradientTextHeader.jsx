import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Box, Heading } from "@chakra-ui/react";

const GradientTextHeader = ({
  text = "OUR FEATURES",
  fromColor = "#e11d48", // Cyan
  toColor = "#d946ef", // Purple
}) => {
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".gradient-line", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.2,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <Box
      as="div"
      py="10"
      my="10 "
      ref={container}
      className="flex items-center justify-center w-full "
    >
      {/* Left Gradient Line */}
      <div
        className="gradient-line h-1 grow rounded-full"
        style={{
          background: `linear-gradient(to left, ${fromColor}, transparent)`,
        }}
      />

      {/* Center Text with Gradient Background Clip */}
      <Heading
        as="h2"
        m="1rem"
        p="1rem"
        fontSize={{
          base: "4xl",
          md: "6xl",
        }}
        className=" gradient-line  font-black uppercase tracking-tighter bg-clip-text text-transparent italic"
        style={{
          backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})`,
          filter: `drop-shadow(0 0 10px ${fromColor}55)`,
        }}
      >
        {text}
      </Heading>

      {/* Right Gradient Line */}
      <div
        className="gradient-line h-1 grow rounded-full"
        style={{
          background: `linear-gradient(to right, ${fromColor}, transparent)`,
        }}
      />
    </Box>
  );
};

export default GradientTextHeader;
