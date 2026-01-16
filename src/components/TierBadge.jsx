import { Badge } from "@chakra-ui/react";
import { Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const MotionBadge = motion.create(Badge);

const TierBadge = ({ tier }) => {
  const isPremium = tier === "premium";
  const IconComponent = isPremium ? Crown : Sparkles;

  return (
    <MotionBadge
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      px={4}
      py={1.5}
      borderRadius="full"
      fontSize="sm"
      fontWeight="semibold"
      textTransform="capitalize"
      bgGradient={isPremium ? "to-r" : undefined}
      gradientFrom={isPremium ? "#7C3AED" : undefined}
      gradientTo={isPremium ? "#A855F7" : undefined}
      bg={isPremium ? undefined : "whiteAlpha.100"}
      color={isPremium ? "white" : "gray.400"}
      borderWidth="1px"
      borderColor={isPremium ? "purple.400" : "whiteAlpha.200"}
      boxShadow={isPremium ? "0 0 20px rgba(139, 92, 246, 0.3)" : "none"}
      display="flex"
      alignItems="center"
      gap={2}
    >
      <IconComponent size={16} />
      {tier}
    </MotionBadge>
  );
};

export default TierBadge;