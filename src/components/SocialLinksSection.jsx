import {
  VStack,
  Input,
  Box,
  Text,
} from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Instagram, Github, Twitter, Linkedin } from 'lucide-react';

const MotionBox = motion.create(Box);

const socialFields = [
  { key: 'instagram', icon: Instagram, placeholder: 'username', label: 'Instagram' },
  { key: 'github', icon: Github, placeholder: 'username', label: 'GitHub' },
  { key: 'twitter', icon: Twitter, placeholder: 'username', label: 'Twitter / X' },
  { key: 'linkedin', icon: Linkedin, placeholder: 'username', label: 'LinkedIn' },
];

export const SocialLinksSection = ({
  socialLinks,
  errors,
  onChange,
}) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Box
        bg="gray.900"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.800"
        p={6}
     
       
      >
        <Text fontSize="lg" fontWeight="semibold" color="gray.100" mb={5}>
          Social Links
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          Connect your social profiles (optional)
        </Text>
        <VStack gap={4} align="stretch" >
          {socialFields.map(({ key, icon: Icon, placeholder, label }) => (
            <Field.Root key={key} invalid={!!errors[key]}>
              <Field.Label color={"gray.500"}>{label}</Field.Label>
              <Box position="relative" width={"100%"}>
                <Input
              
                  value={socialLinks[key]}
                  onChange={(e) => onChange(key, e.target.value)}
                  placeholder={placeholder}
                  bg="gray.800"
                  borderColor="gray.700"
                  _hover={{ borderColor: 'gray.600' }}
                  _focus={{
                    borderColor: 'brand.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
                  }}
                  ps="2.5rem"
                  color="white"
                />
                <Box
                  position="absolute"
                  left="3"
                  top="50%"
                  transform="translateY(-50%)"
                  pointerEvents="none"
                >
                  <Icon size={18} color="#718096" />
                </Box>
              </Box>
              {errors[key] && (
                <Field.ErrorText>{errors[key]}</Field.ErrorText>
              )}
            </Field.Root>
          ))}
        </VStack>
      </Box>
    </MotionBox>
  );
};