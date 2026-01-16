import { Box,  HStack, IconButton } from "@chakra-ui/react";
import { Instagram, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

const socialConfig = [
  { key: "instagram", icon: Instagram, label: "Instagram", color: "pink.400" },
  { key: "github", icon: Github, label: "GitHub", color: "gray.300" },
  { key: "twitter", icon: Twitter, label: "Twitter", color: "blue.400" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn", color: "blue.500" },
];

const SocialIconLinks = ({ socialLinks, email }) => {
  const availableLinks = socialConfig?.filter(
    (social) => socialLinks[social?.key]
  );

  if (availableLinks.length === 0) return null;

  return (
    <HStack gap={3} justify="center">
      {availableLinks.map((social, index) => {
        const url = socialLinks[social?.key];
        const IconComponent = social?.icon;

        return (
         <Box position={"relative"} >
       
          <MotionIconButton
            asChild
            aria-label={social?.label}
            variant="ghost"
            size="lg"
            borderRadius="full"
            color="gray.400"
            bg="whiteAlpha.50"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            _hover={{
              bg: "whiteAlpha.100",
              color: social?.color,
              borderColor: social?.color,
              transform: "translateY(-2px)",
            }}
            css={{
              transition: "all 0.2s ease-in-out",
            }}
            position={"relative"}
          >
           
            <a href={url} target="_blank" rel="noopener noreferrer">
              <IconComponent size={20} />
            </a>
           
          </MotionIconButton></Box>
        );
      })}

      {email && (
        <MotionIconButton
          asChild
          aria-label={email}
          variant="ghost"
          size="lg"
          borderRadius="full"
          color="gray.400"
          bg="whiteAlpha.50"
          borderWidth="1px"
          borderColor="whiteAlpha.100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + 4 * 0.1, duration: 0.3 }}
          _hover={{
            bg: "whiteAlpha.100",
            color: "greenyellow",
            borderColor: "greenyellow",
            transform: "translateY(-2px)",
          }}
          css={{
            transition: "all 0.2s ease-in-out",
          }}
        >
          <a href={"#"} target="#" rel="noopener noreferrer">
            <Mail size={20} />
          </a>
        </MotionIconButton>
      )}
    </HStack>
  );
};

export default SocialIconLinks;
