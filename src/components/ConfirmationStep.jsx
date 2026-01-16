import { Box, Text, VStack, Icon, Flex,  HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const CheckIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
    />
  </Icon>
);

const ConfirmationStep = () => {
  const summaryItems = [
    { label: 'Title', value: 'Your blog title' },
    { label: 'Cover Image', value: 'Uploaded' },
    { label: 'Excerpt', value: 'Added' },
    { label: 'Tags', value: '3 tags' },
    { label: 'Status', value: 'Published' },
  ];

  return (
    <VStack spacing={6} align="stretch">
      <Box textAlign="center">
        <MotionBox
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <Flex
            w="80px"
            h="80px"
            borderRadius="full"
            bg="brand.500"
            align="center"
            justify="center"
            mx="auto"
            mb={4}
            boxShadow="0 0 40px rgba(0, 217, 255, 0.4)"
          >
            <CheckIcon boxSize={10} color="dark.500" />
          </Flex>
        </MotionBox>
        <Text fontSize="xl" fontWeight="bold" color="gray.100">
          Ready to Publish!
        </Text>
        <Text color="gray.500" fontSize="sm" mt={1}>
          Review your post details before publishing
        </Text>
      </Box>

      {/* Summary Card */}
      <Box
        bg="dark.300"
        borderRadius="xl"
        border="1px solid"
        borderColor="dark.50"
        overflow="hidden"
      >
        <VStack spacing={0} align="stretch" divider={<Divider borderColor="dark.50" />}>
          {summaryItems.map((item, index) => (
            <HStack key={index} px={6} py={4} justify="space-between">
              <Text color="gray.500" fontSize="sm">
                {item.label}
              </Text>
              <Text color="gray.200" fontWeight="medium" fontSize="sm">
                {item.value}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Decorative message */}
      <Box
        bg="dark.200"
        borderRadius="xl"
        p={4}
        border="1px solid"
        borderColor="brand.500"
        borderLeftWidth="4px"
      >
        <Text color="gray.300" fontSize="sm">
          🎉 Your blog post is ready to go live! Click the button below to share your thoughts with the world.
        </Text>
      </Box>
    </VStack>
  );
};

export default ConfirmationStep;
