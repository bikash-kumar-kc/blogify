import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Box } from '@chakra-ui/react';

const TextReveal = ({word="Blogify"}) => {
  const container = useRef();
  const text = word;
  const letters = text.split("");

  useGSAP(() => {
    // Target all elements with the class ".letter"
    const tl = gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 1 
    });

    // 1. The Entrance: Staggered "pop" with a focus effect
    tl.from(".letter", {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      stagger: 0.1,
      duration: 0.7,
      ease: "back.out(1.7)",
    })
    // 2. The Pulse: A subtle "breathing" effect while the user reads
    .to(".letter", {
      scale: 1.05,
      duration: 1,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    })
    // 3. The Exit: Smooth fade out to restart
    .to(".letter", {
      opacity: 0,
      filter: "blur(5px)",
      duration: 0.5,
    });
  }, { scope: container }); // Scoping prevents targeting letters in other components

  return (
    <Box as ="div" ref={container} py={10} className="flex overflow-hidden ">
      {letters.map((char, index) => (
        <Box as="div"
          key={index} 
           fontSize={{
            base:"5xl",
            md:"7xl",
            lg:"9xl"
          }}
          className=" text-[#2D3E33] font-black "
        style={{
              background: "linear-gradient(135deg, #38bdf8 0%, #34d399 50%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
            }}
        >
          {char}
        </Box>
      ))}
    </Box>
  );
};

export default TextReveal;