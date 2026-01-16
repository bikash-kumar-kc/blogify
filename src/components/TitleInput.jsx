import { Input, Box, Text } from '@chakra-ui/react';

const TitleInput = ({ value, onChange }) => {
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
        Title
      </Text>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Enter your blog title..."
        size="lg"
        fontSize="2xl"
        fontWeight="bold"
        py={8}
        px={6}
        borderRadius="xl"
        _placeholder={{ 
          color: 'gray.600',
          fontWeight: 'normal' 
        }}
      />
    </Box>
  );
};

export default TitleInput;
