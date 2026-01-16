import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { PenSquare } from "lucide-react";
import { PostForm } from "../../components";

const CreateBlogPost = () => {
  return (
    <Box
      ml={{ base: 0, lg: "280px" }}
      mr={{ base: 0, lg: "300px" }}
      pt={{ base: "70px", lg: 0 }}
      pb={{ base: "80px", lg: 0 }}
      minH="100vh"
    >
      <Box mx="auto" p={6}>
        {/* Header */}
        <Flex align="center" gap={2} mb={8}>
          <PenSquare boxSize={6} color="#a3a3a3" />
          <Text fontSize="2xl" fontWeight="bold" color="#f5f5f5">
            Create Post
          </Text>
        </Flex>

        {/* Main Content */}
        <Container
          maxW={{ base: "full", md: "3xl", lg: "4xl" }}
          px={{ base: 4, md: 6 }}
          py={{ base: 6, md: 10 }}
        >
          <PostForm action={"create"} />
        </Container>
      </Box>
    </Box>
  );
};

export default CreateBlogPost;
