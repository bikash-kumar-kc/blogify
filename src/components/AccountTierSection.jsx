import { Box, Text, HStack, VStack, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";

const MotionDiv = motion.create("div");

const TierCard = ({
  value,
  isSelected,
  icon,
  description,
  isPremium,
  children,
  onClick,
}) => {
  return (
    <Box as="label" flex={1} cursor="pointer" onClick={() => onClick(value)}>
      <Box
        bg={isSelected ? (isPremium ? "orange.900" : "brand.900") : "gray.800"}
        borderWidth="2px"
        borderColor={
          isSelected ? (isPremium ? "premium.500" : "brand.500") : "gray.700"
        }
        borderRadius="xl"
        p={5}
        position="relative"
        overflow="hidden"
        transition="all 0.2s"
        _hover={{
          borderColor: isPremium ? "premium.400" : "brand.400",
          transform: "scale(1.02)",
        }}
        _active={{
          transform: "scale(0.98)",
        }}
      >
        {isPremium && isSelected && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            height="3px"
            bgGradient="to-r"
            gradientFrom="premium.400"
            gradientTo="premium.600"
          />
        )}

        <VStack align="start" gap={3}>
          <HStack justify="space-between" w="full">
            <HStack gap={3}>
              {icon}
              <Text fontWeight="semibold" color="gray.100">
                {children}
              </Text>
            </HStack>
            {isPremium && (
              <Badge
                bg="premium.500"
                color="gray.900"
                fontSize="xs"
                px={2}
                py={0.5}
                borderRadius="full"
              >
                PRO
              </Badge>
            )}
          </HStack>
          <Text fontSize="sm" color="gray.400">
            {description}
          </Text>
        </VStack>

        {isSelected && (
          <Box
            position="absolute"
            top={3}
            right={3}
            w={3}
            h={3}
            borderRadius="full"
            bg={isPremium ? "premium.500" : "brand.500"}
          />
        )}
      </Box>
    </Box>
  );
};

export const AccountTierSection = ({ tier, onChange }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Box
        bg="gray.900"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.800"
        p={6}
      >
        <Text fontSize="lg" fontWeight="semibold" color="gray.100" mb={5}>
          Account Tier
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          Select your subscription plan
        </Text>

        <HStack gap={4} align="stretch">
          <TierCard
            value="free"
            isSelected={tier === "free"}
            icon={<User size={20} color="#a0aec0" />}
            description="Basic features with limited access"
            onClick={onChange}
          >
            Free
          </TierCard>
          <TierCard
            value="premium"
            isSelected={tier === "premium"}
            icon={<Sparkles size={20} color="#f6ad55" />}
            description="Unlock all premium features"
            isPremium
            onClick={onChange}
          >
            Premium
          </TierCard>
        </HStack>
      </Box>
    </MotionDiv>
  );
};
