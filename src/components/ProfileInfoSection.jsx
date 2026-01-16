import { Box, Text, VStack, HStack, Input, Textarea } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { User, AtSign, FileText } from "lucide-react";
import { ProfileImageUpload } from "./ProfileImageUpload ";

const MotionBox = motion.create(Box);

export const ProfileInfoSection = ({
  profileImage,
  profileInfo,
  errors,
  onImageChange,
  onChange,
  imageError,
}) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Box
        bg="gray.900"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.800"
        p={6}
      >
        <Text fontSize="lg" fontWeight="semibold" color="gray.100" mb={5}>
          Profile Information
        </Text>

        <HStack gap={8} align="start" flexDir={{ base: "column", md: "row" }}>
          <ProfileImageUpload
            currentImage={profileImage}
            onImageChange={onImageChange}
            imageError={imageError}
          />

          <VStack flex={1} gap={5} align="stretch" w="full">
            <Field.Root invalid={!!errors.username} required>
              <Field.Label color={"gray.500"}>Username</Field.Label>
              <Input
                value={profileInfo?.userName}
                onChange={(e) => onChange("userName", e.target.value)}
                placeholder="your_username"
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "gray.600" }}
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                }}
                ps="2.5rem"
                color={"white"}
              />
              <Box
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                pointerEvents="none"
                mt="0.88rem"
              >
                <AtSign size={18} color="#718096" />
              </Box>
              {errors.username && (
                <Field.ErrorText>{errors.username}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors.name} required>
              <Field.Label color={"gray.500"}>Full Name</Field.Label>

              <Input
                value={profileInfo?.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="John Doe"
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "gray.600" }}
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                }}
                color={"white"}
                ps="2.5rem"
              />
              <Box
                position="absolute"
                left="3"
                top="50%"
                transform="translateY(-50%)"
                pointerEvents="none"
                mt="0.88rem"
              >
                <User size={18} color="#718096" />
              </Box>
              {errors?.name && <Field.ErrorText>{errors?.name}</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={!!errors?.bio}>
              <Field.Label>
                <HStack gap={2}>
                  <FileText size={16} color="gray" />
                  <Text color={"gray.500"}>Bio</Text>
                </HStack>
              </Field.Label>
              <Textarea
                value={profileInfo?.bio}
                onChange={(e) => onChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                bg="gray.800"
                borderColor="gray.700"
                rows={4}
                resize="none"
                _hover={{ borderColor: "gray.600" }}
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                }}
                color={"white"}
              />
              <Text fontSize="xs" color="gray.500" mt={2}>
                {profileInfo?.bio.length}/200 characters
              </Text>
              {errors?.bio && <Field.ErrorText>{errors?.bio}</Field.ErrorText>}
            </Field.Root>
          </VStack>
        </HStack>
      </Box>
    </MotionBox>
  );
};
