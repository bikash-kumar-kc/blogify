import { Box, VStack, Text, Heading, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import TierBadge from "./TierBadge";
import SocialIconLinks from "./SocialIconsLinks";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const MotionBox = motion(Box);

const ProfileCard = ({ user }) => {
  const { user: currentUser } = useAuthContext();
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      w="100%"
      maxW="480px"
      mx="auto"
    >
      <Box
        bg="gray.800"
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        overflow="hidden"
        position="relative"
      >
        {/* Gradient header background */}
        <Box
          h="120px"
          bgGradient="to-br"
          gradientFrom="#1a1a2e"
          gradientVia="#16213e"
          gradientTo="#0f3460"
          position="relative"
        >
          <Box
            position="absolute"
            inset="0"
            bgGradient="to-b"
            gradientFrom="transparent"
            gradientTo="rgba(26, 32, 44, 0.8)"
          />
        </Box>

        {/* Profile content */}
        <VStack gap={5} px={8} pb={8} mt="-60px" position="relative">
          {/* Avatar */}

          <Box
            w="120px"
            h="120px"
            _hover={
              currentUser?.id === user?.id
                ? { outline: "3px solid", outlineColor: "blue.500" }
                : ""
            }
            borderRadius="full"
            overflow="hidden"
          >
            <Link
              to={
                currentUser?.id === user?.id
                  ? `/update-profile/${user?.id}`
                  : ""
              }
            >
              <Image
                src={user?.avatar || "images/placeholder.jpg"}
                alt="profile"
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Link>
          </Box>

          {/* Tier Badge */}
          <TierBadge tier={user?.tier} />

          {/* Name and Username */}
          <VStack gap={1}>
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <Heading
                as="h1"
                size="lg"
                color="white"
                fontWeight="bold"
                textAlign="center"
              >
                {user?.name || "your name..."}
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Text color="gray.400" fontSize="md" fontWeight="medium">
                @{user?.userName || "unique user name..."}
              </Text>
            </MotionBox>
          </VStack>

          {/* Bio */}
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            w="100%"
          >
            <Text
              color="gray.300"
              fontSize="sm"
              textAlign="center"
              lineHeight="tall"
              maxW="360px"
              mx="auto"
            >
              {user?.bio || "what describe you the best..."}
            </Text>
          </MotionBox>

          {/* Divider */}
          <Box w="60%" h="1px" bg="whiteAlpha.100" my={2} />

          {/* Social Links */}
          <SocialIconLinks
            socialLinks={user?.socialLinks}
            email={user?.email}
          />
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default ProfileCard;
