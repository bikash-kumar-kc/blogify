import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Box,
  Button,
  Text,
  Flex,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const heroImages = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".animate-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      position="relative"
      minH="100vh"
      w="full"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Background Slideshow */}
      {heroImages.map((image, index) => (
        <Box
          as="div"
          key={image}
          position="absolute"
          inset="0"
          bgSize="cover"
          bgPosition="center"
          opacity={index === currentImageIndex ? 0.5 : 0}
          transition="opacity 1s ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: currentImageIndex === index ? 1 : 0,
          }}
          className="filter brightness-50 blur-[1px]"
        />
      ))}

      {/* Gradient Overlay */}
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-b, blackAlpha.600, blackAlpha.800)"
      />

      {/* Glassmorphism Content Card */}
      <Box position="relative" zIndex="10" mx="4" maxW="3xl" textAlign="center">
        <Box
          borderRadius="3xl"
          px={{ base: 8, md: 16 }}
          py={{ base: 12, md: 20 }}
        >
          {/* Greeting Badge */}

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1 * 0.1 }}
          >
            <Badge
              display="inline-flex"
              alignItems="center"
              gap="2"
              borderRadius="full"
              bg="#171717"
              px="4"
              py="2"
              fontSize="sm"
              fontWeight="medium"
              color="white"
              mb="6"
            >
              <Box
                w="2"
                h="2"
                borderRadius="full"
                bg="white"
                animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              />
              Discover stories that matter
            </Badge>
          </MotionBox>

          {/* Headline */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.2 * 0.1 }}
          >
            <Text
              as="h1"
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              lineHeight="tight"
              letterSpacing="tight"
              color="white"
              mb="6"
              className="animate-item"
            >
              Welcome to Your Daily Dose of{" "}
              <Text as="span" color="blue.400">
                Insight
              </Text>
            </Text>
          </MotionBox>

          {/* Subheadline */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.4 * 0.1 }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="relaxed"
              color="gray.200"
              maxW="xl"
              mx="auto"
              mb="10"
            >
              Where stories find their voice and ideas spark connection. Join a
              community of curious minds sharing knowledge, creativity, and the
              art of thoughtful writing.
            </Text>
          </MotionBox>

          {/* CTA Buttons */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            align="center"
            justify="center"
            gap="4"
          >
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.6 * 0.1 }}
            >
              <Link to="/signin">
                <Button
                  colorScheme="blue"
                  size="lg"
                  minW="140px"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                >
                  Sign In
                </Button>
              </Link>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.8 * 0.1 }}
            >
              <Link to="/signup">
                <Button
                  variant="outline"
                  size="lg"
                  minW="140px"
                  color="white"
                  borderColor="whiteAlpha.400"
                  _hover={{
                    bg: "whiteAlpha.200",
                    borderColor: "whiteAlpha.600",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  Sign Up
                </Button>
              </Link>
            </MotionBox>
          </Flex>
        </Box>
      </Box>

      {/* Slide Indicators */}
      <HStack
        position="absolute"
        bottom="8"
        left="50%"
        transform="translateX(-50%)"
        zIndex="10"
        gap="2"
      >
        {heroImages.map((_, index) => (
          <Box
            as="button"
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            h="2"
            borderRadius="full"
            transition="all 0.3s"
            w={index === currentImageIndex ? "8" : "2"}
            bg={index === currentImageIndex ? "blue.400" : "whiteAlpha.500"}
            _hover={{
              bg: index === currentImageIndex ? "blue.400" : "whiteAlpha.700",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </HStack>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </Box>
  );
};

export default Hero;
