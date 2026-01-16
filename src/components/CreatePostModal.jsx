import { useState } from 'react';
import { Box, Button, Flex, Text, VStack, Input, HStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);
const MotionButton = motion.create(Button);

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

// Reusable animated tag component
const AnimatedTag = ({ children, delay = 0 }) => (
  <MotionBox
    px={4}
    py={2}
    borderRadius="full"
    bg="rgba(0, 217, 255, 0.1)"
    color="#00D9FF"
    border="1px solid"
    borderColor="rgba(0, 217, 255, 0.3)"
    fontSize="sm"
    fontWeight="medium"
    cursor="pointer"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.2 }}
    whileHover={{ 
      scale: 1.05, 
      bg: "rgba(0, 217, 255, 0.2)",
      borderColor: "#00D9FF"
    }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </MotionBox>
);

// Step 1: Cover Image
const CoverImageStep = () => (
  <VStack gap={{ base: 4, md: 6 }} align="stretch">
    <Box textAlign="center">
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="white">
        Upload Cover Image
      </Text>
      <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }} mt={1}>
        Add a captivating cover to your blog post
      </Text>
    </Box>
    
    <MotionBox
      border="2px dashed"
      borderColor="#2D2D30"
      borderRadius="2xl"
      p={{ base: 8, md: 12 }}
      cursor="pointer"
      textAlign="center"
      bg="#18181B"
      position="relative"
      overflow="hidden"
      whileHover={{ 
        borderColor: "#00D9FF",
        bg: "#1E1E21"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated gradient overlay on hover */}
      <MotionBox
        position="absolute"
        inset={0}
        bg="radial-gradient(circle at center, rgba(0, 217, 255, 0.05) 0%, transparent 70%)"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      <VStack gap={4} position="relative">
        <MotionFlex 
          w={{ base: "60px", md: "80px" }}
          h={{ base: "60px", md: "80px" }}
          borderRadius="full" 
          bg="rgba(0, 217, 255, 0.1)"
          border="1px solid"
          borderColor="rgba(0, 217, 255, 0.2)"
          align="center" 
          justify="center"
          whileHover={{ scale: 1.1, borderColor: "#00D9FF" }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Text fontSize={{ base: "xl", md: "2xl" }}>📤</Text>
        </MotionFlex>
        <Box>
          <Text color="gray.300" fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
            Click to upload or drag and drop
          </Text>
          <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }} mt={1}>
            PNG, JPG, GIF up to 10MB
          </Text>
        </Box>
      </VStack>
    </MotionBox>
    
    <MotionBox 
      bg="#18181B" 
      borderRadius="xl" 
      h={{ base: "80px", md: "100px" }}
      border="1px solid" 
      borderColor="#2D2D30"
      overflow="hidden"
      whileHover={{ borderColor: "rgba(0, 217, 255, 0.3)" }}
    >
      <Flex h="100%" align="center" justify="center">
        <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }}>
          Image preview will appear here
        </Text>
      </Flex>
    </MotionBox>
  </VStack>
);

// Step 2: Additional Info
const AdditionalInfoStep = () => {
  const [activeStatus, setActiveStatus] = useState('published');
  
  return (
    <VStack gap={{ base: 4, md: 6 }} align="stretch">
      <Box textAlign="center">
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="white">
          Additional Information
        </Text>
        <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }} mt={1}>
          Add details to help readers find your post
        </Text>
      </Box>
      
      <Box>
        <Text fontSize="xs" fontWeight="semibold" color="gray.500" mb={2} textTransform="uppercase" letterSpacing="0.1em">
          Excerpt
        </Text>
        <Input 
          placeholder="Write a brief summary..." 
          borderRadius="xl" 
          bg="#1E1E21" 
          border="1px solid" 
          borderColor="#2D2D30" 
          color="white"
          fontSize={{ base: "sm", md: "md" }}
          py={{ base: 5, md: 6 }}
          _placeholder={{ color: "gray.600" }} 
          _hover={{ borderColor: "rgba(0, 217, 255, 0.5)" }} 
          _focus={{ borderColor: "#00D9FF", boxShadow: "0 0 0 1px #00D9FF" }}
          transition="all 0.2s"
        />
      </Box>
      
      <Box>
        <Text fontSize="xs" fontWeight="semibold" color="gray.500" mb={2} textTransform="uppercase" letterSpacing="0.1em">
          Tags
        </Text>
        <Input 
          placeholder="Add tags..." 
          borderRadius="xl" 
          bg="#1E1E21" 
          border="1px solid" 
          borderColor="#2D2D30" 
          color="white"
          fontSize={{ base: "sm", md: "md" }}
          py={{ base: 5, md: 6 }}
          _placeholder={{ color: "gray.600" }} 
          _hover={{ borderColor: "rgba(0, 217, 255, 0.5)" }} 
          _focus={{ borderColor: "#00D9FF", boxShadow: "0 0 0 1px #00D9FF" }}
          mb={3}
        />
        <Flex gap={2} flexWrap="wrap">
          {['React', 'JavaScript', 'Web Dev'].map((tag, i) => (
            <AnimatedTag key={tag} delay={i * 0.1}>{tag}</AnimatedTag>
          ))}
        </Flex>
      </Box>
      
      <Box>
        <Text fontSize="xs" fontWeight="semibold" color="gray.500" mb={3} textTransform="uppercase" letterSpacing="0.1em">
          Post Status
        </Text>
        <HStack gap={3}>
          {['published', 'draft'].map((status) => (
            <MotionButton
              key={status}
              flex={1}
              borderRadius="xl"
              py={6}
              bg={activeStatus === status ? "rgba(0, 217, 255, 0.1)" : "#1E1E21"}
              borderColor={activeStatus === status ? "#00D9FF" : "#2D2D30"}
              color={activeStatus === status ? "#00D9FF" : "gray.400"}
              border="1px solid"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="medium"
              textTransform="capitalize"
              onClick={() => setActiveStatus(status)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              _hover={{ bg: activeStatus === status ? "rgba(0, 217, 255, 0.15)" : "#252528" }}
            >
              {status}
            </MotionButton>
          ))}
        </HStack>
      </Box>
    </VStack>
  );
};

// Step 3: Confirmation
const ConfirmationStep = () => (
  <VStack gap={{ base: 4, md: 6 }} align="stretch">
    <Box textAlign="center">
      <MotionFlex
        w={{ base: "60px", md: "80px" }}
        h={{ base: "60px", md: "80px" }}
        borderRadius="full"
        bg="linear-gradient(135deg, #00D9FF 0%, #00b8d9 100%)"
        align="center"
        justify="center"
        mx="auto"
        mb={4}
        boxShadow="0 0 40px rgba(0, 217, 255, 0.4)"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <Text fontSize={{ base: "xl", md: "2xl" }} color="#0A0A0B">✓</Text>
      </MotionFlex>
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="white">
          Ready to Publish!
        </Text>
        <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }} mt={1}>
          Review your post details before publishing
        </Text>
      </MotionBox>
    </Box>
    
    <MotionBox
      bg="#18181B"
      borderRadius="xl"
      border="1px solid"
      borderColor="#2D2D30"
      overflow="hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {[
        ['Title', 'Your blog title'],
        ['Cover Image', 'Uploaded'],
        ['Excerpt', 'Added'],
        ['Tags', '3 tags'],
        ['Status', 'Published']
      ].map(([label, value], i) => (
        <MotionFlex
          key={label}
          px={{ base: 4, md: 6 }}
          py={{ base: 3, md: 4 }}
          justify="space-between"
          borderTop={i > 0 ? "1px solid" : "none"}
          borderColor="#2D2D30"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.05 }}
          _hover={{ bg: "rgba(0, 217, 255, 0.03)" }}
        >
          <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>{label}</Text>
          <Text color="gray.200" fontWeight="medium" fontSize={{ base: "xs", md: "sm" }}>{value}</Text>
        </MotionFlex>
      ))}
    </MotionBox>
    
    <MotionBox
      bg="rgba(0, 217, 255, 0.05)"
      borderRadius="xl"
      p={4}
      border="1px solid"
      borderColor="rgba(0, 217, 255, 0.2)"
      borderLeftWidth="4px"
      borderLeftColor="#00D9FF"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }}>
        🎉 Your blog post is ready to go live!
      </Text>
    </MotionBox>
  </VStack>
);

const steps = [CoverImageStep, AdditionalInfoStep, ConfirmationStep];

const CreatePostModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentStep < 2) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleClose = () => {
    setCurrentStep(0);
    setDirection(0);
    onClose();
  };

  if (!isOpen) return null;

  const CurrentStep = steps[currentStep];

  return (
    <MotionBox
      position="fixed"
      inset={0}
      zIndex={50}
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <MotionBox
        position="absolute"
        inset={0}
        bg="rgba(0, 0, 0, 0.85)"
        backdropFilter="blur(12px)"
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      {/* Modal */}
      <MotionBox
        position="relative"
        bg="#121214"
        borderRadius={{ base: "xl", md: "2xl" }}
        border="1px solid"
        borderColor="#2D2D30"
        w="full"
        maxW={{ base: "95%", sm: "md", md: "lg" }}
        mx={4}
        maxH={{ base: "85vh", md: "90vh" }}
        overflow="hidden"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Step Indicator */}
        <Flex justify="center" py={{ base: 3, md: 4 }} borderBottom="1px solid" borderColor="#2D2D30" gap={3}>
          {[0, 1, 2].map(i => (
            <MotionBox
              key={i}
              h={{ base: "8px", md: "10px" }}
              borderRadius="full"
              cursor="pointer"
              onClick={() => {
                setDirection(i > currentStep ? 1 : -1);
                setCurrentStep(i);
              }}
              initial={false}
              animate={{
                width: currentStep === i ? 32 : 10,
                backgroundColor: currentStep === i ? "#00D9FF" : "#2D2D30"
              }}
              whileHover={{ backgroundColor: currentStep === i ? "#00D9FF" : "#3D3D40" }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </Flex>

        {/* Content */}
        <Box p={{ base: 4, md: 6 }} minH={{ base: "350px", md: "420px" }} position="relative" overflow="hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <MotionBox
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              position="absolute"
              w={{ base: "calc(100% - 32px)", md: "calc(100% - 48px)" }}
            >
              <CurrentStep />
            </MotionBox>
          </AnimatePresence>
        </Box>

        {/* Footer */}
        <Flex
          justify="space-between"
          align="center"
          p={{ base: 3, md: 4 }}
          borderTop="1px solid"
          borderColor="#2D2D30"
          bg="rgba(18, 18, 20, 0.8)"
          flexDir={{ base: currentStep > 0 ? "row" : "row-reverse", sm: "row" }}
          gap={2}
        >
          <HStack gap={{ base: 2, md: 3 }}>
            {currentStep > 0 && (
              <MotionButton
                onClick={handleBack}
                variant="ghost"
                color="gray.400"
                fontSize={{ base: "sm", md: "md" }}
                _hover={{ bg: "#1E1E21", color: "white" }}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back
              </MotionButton>
            )}
            <Button
              variant="ghost"
              onClick={handleClose}
              color="gray.500"
              fontSize={{ base: "sm", md: "md" }}
              _hover={{ bg: "#1E1E21", color: "gray.300" }}
            >
              Cancel
            </Button>
          </HStack>
          
          {currentStep < 2 ? (
            <MotionButton
              onClick={handleNext}
              bg="linear-gradient(135deg, #00D9FF 0%, #00b8d9 100%)"
              color="#0A0A0B"
              fontWeight="bold"
              borderRadius="xl"
              px={{ base: 6, md: 8 }}
              fontSize={{ base: "sm", md: "md" }}
              boxShadow="0 4px 15px rgba(0, 217, 255, 0.3)"
              _hover={{ bg: "linear-gradient(135deg, #26cbff 0%, #00D9FF 100%)" }}
              whileHover={{ x: 3, boxShadow: "0 6px 20px rgba(0, 217, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </MotionButton>
          ) : (
            <MotionButton
              bg="linear-gradient(135deg, #00D9FF 0%, #00b8d9 100%)"
              color="#0A0A0B"
              fontWeight="bold"
              borderRadius="xl"
              px={{ base: 6, md: 10 }}
              py={{ base: 5, md: 6 }}
              fontSize={{ base: "sm", md: "md" }}
              boxShadow="0 4px 20px rgba(0, 217, 255, 0.3)"
              _hover={{ bg: "linear-gradient(135deg, #26cbff 0%, #00D9FF 100%)" }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0, 217, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              🚀 Post Blog
            </MotionButton>
          )}
        </Flex>
      </MotionBox>
    </MotionBox>
  );
};

export default CreatePostModal;
