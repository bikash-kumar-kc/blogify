import { HStack, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <HStack spacing={3} justify="center">
      {Array.from({ length: totalSteps }, (_, i) => (
        <MotionBox
          key={i}
          w={currentStep === i ? "32px" : "10px"}
          h="10px"
          borderRadius="full"
          bg={currentStep === i ? "brand.500" : "dark.50"}
          initial={false}
          animate={{
            width: currentStep === i ? 32 : 10,
            backgroundColor: currentStep === i ? "#00D9FF" : "#2D2D30",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          cursor="pointer"
        />
      ))}
    </HStack>
  );
};

export default StepIndicator;
