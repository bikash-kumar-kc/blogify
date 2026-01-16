import {
  Box,
  Text,
  VStack,
  Input,
  Textarea,
  HStack,
  Tag,
  TagLabel,
  Flex,
  Button,
} from "@chakra-ui/react";

const AdditionalInfoStep = () => {
  const sampleTags = ["React", "JavaScript", "Web Dev"];

  return (
    <VStack spacing={6} align="stretch">
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="bold" color="gray.100">
          Additional Information
        </Text>
        <Text color="gray.500" fontSize="sm" mt={1}>
          Add details to help readers find your post
        </Text>
      </Box>

      {/* Excerpt */}
      <Box>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color="gray.400"
          mb={2}
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Excerpt
        </Text>
        <Textarea
          placeholder="Write a brief summary of your post..."
          rows={3}
          borderRadius="xl"
          resize="none"
        />
      </Box>

      {/* Tags */}
      <Box>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color="gray.400"
          mb={2}
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Tags
        </Text>
        <Input
          placeholder="Add a tag and press Enter..."
          borderRadius="xl"
          mb={3}
        />
        <Flex gap={2} flexWrap="wrap">
          {sampleTags?.map((tag, index) => (
            <Tag
              key={index}
              size="lg"
              borderRadius="full"
              bg="dark.100"
              color="brand.500"
              border="1px solid"
              borderColor="dark.50"
              px={4}
              py={2}
            >
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </Box>

      {/* Post Status */}
      <Box>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color="gray.400"
          mb={3}
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Post Status
        </Text>
        <HStack spacing={3}>
          <Button
            flex={1}
            variant="outline"
            borderRadius="xl"
            py={6}
            bg="dark.200"
            borderColor="brand.500"
            color="brand.500"
            _hover={{ bg: "dark.100" }}
          >
            Published
          </Button>
          <Button
            flex={1}
            variant="outline"
            borderRadius="xl"
            py={6}
            borderColor="dark.50"
            color="gray.400"
            _hover={{ bg: "dark.200", borderColor: "gray.400" }}
          >
            Draft
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default AdditionalInfoStep;
