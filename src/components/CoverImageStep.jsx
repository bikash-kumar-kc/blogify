import { Box, Text, VStack, Icon, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const UploadIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M11 16V7.85l-2.6 2.6L7 9l5-5 5 5-1.4 1.45-2.6-2.6V16h-2zm-5 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6z"
    />
  </Icon>
);

const CoverImageStep = () => {
  return (
    <VStack spacing={6} align="stretch">
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="bold" color="gray.100">
          Upload Cover Image
        </Text>
        <Text color="gray.500" fontSize="sm" mt={1}>
          Add a captivating cover to your blog post
        </Text>
      </Box>

      <MotionBox
        border="2px dashed"
        borderColor="dark.50"
        borderRadius="xl"
        p={12}
        cursor="pointer"
        textAlign="center"
        bg="dark.300"
        whileHover={{ 
          borderColor: "#00D9FF",
          backgroundColor: "#18181B"
        }}
        transition={{ duration: 0.2 }}
      >
        <VStack spacing={4}>
          <Flex
            w="80px"
            h="80px"
            borderRadius="full"
            bg="dark.200"
            align="center"
            justify="center"
          >
            <UploadIcon boxSize={8} color="brand.500" />
          </Flex>
          <Box>
            <Text color="gray.300" fontWeight="medium">
              Click to upload or drag and drop
            </Text>
            <Text color="gray.600" fontSize="sm" mt={1}>
              PNG, JPG, GIF up to 10MB
            </Text>
          </Box>
        </VStack>
      </MotionBox>

      {/* Preview Placeholder */}
      <Box
        bg="dark.300"
        borderRadius="xl"
        h="120px"
        border="1px solid"
        borderColor="dark.50"
        overflow="hidden"
      >
        <Flex h="100%" align="center" justify="center">
          <Text color="gray.600" fontSize="sm">
            Image preview will appear here
          </Text>
        </Flex>
      </Box>
    </VStack>
  );
};

export default CoverImageStep;
