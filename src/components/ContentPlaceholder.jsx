import { Box, Text, Flex, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ContentPlaceholder = () => {
  return (
    <Box>
      <Text 
        fontSize="sm" 
        fontWeight="medium" 
        color="gray.400" 
        mb={2}
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Content
      </Text>
      <MotionBox
        bg="dark.200"
        border="1px solid"
        borderColor="dark.50"
        borderRadius="xl"
        minH="400px"
        p={8}
        position="relative"
        overflow="hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Placeholder lines */}
        <Flex direction="column" gap={4}>
          <Box h="24px" bg="dark.100" borderRadius="md" w="85%" />
          <Box h="24px" bg="dark.100" borderRadius="md" w="100%" />
          <Box h="24px" bg="dark.100" borderRadius="md" w="90%" />
          <Box h="24px" bg="dark.100" borderRadius="md" w="75%" />
          <Box h="24px" bg="dark.100" borderRadius="md" w="95%" />
          <Box h="24px" bg="dark.100" borderRadius="md" w="60%" />
        </Flex>
        
        {/* Rich text editor placeholder overlay */}
        <Flex
          position="absolute"
          inset={0}
          align="center"
          justify="center"
          bg="blackAlpha.400"
          backdropFilter="blur(2px)"
        >
          <Box 
            textAlign="center"
            bg="dark.300"
            px={8}
            py={6}
            borderRadius="xl"
            border="1px solid"
            borderColor="dark.50"
          >
            <Text color="gray.400" fontSize="lg" fontWeight="medium">
              Rich Text Editor
            </Text>
            <Text color="gray.600" fontSize="sm" mt={1}>
              Will be integrated here
            </Text>
          </Box>
        </Flex>
      </MotionBox>
    </Box>
  );
};

export default ContentPlaceholder;
