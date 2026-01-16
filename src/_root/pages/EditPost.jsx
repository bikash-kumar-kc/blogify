import { useParams } from "react-router";
import { PostQuery } from "../../lib/tanstack_query/post";
import { Loader, PostForm } from "../../components";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Edit } from "lucide-react";

const EditPost = () => {
  const { id } = useParams();
  const { data: postInfo, isLoading: gettingPost } =
    PostQuery.useGettingPostForEdit(id);
  if (gettingPost) {
    return (
      <Box as="div" minH="100vh" className="flex justify-center items-center">
        <Loader />
      </Box>
    );
  }
  return (
    <Box
      ml={{ base: 0, lg: "280px" }}
      mr={{ base: 0, lg: "300px" }}
      pt={{ base: "70px", lg: 0 }}
      pb={{ base: "80px", lg: 0 }}
      minH="100vh"
    >
      <Box maxW="700px" mx="auto" p={6}>
        {/* Header */}
        <Flex align="center" gap={2} mb={8}>
          <Icon as={Edit} boxSize={6} color="#a3a3a3" />
          <Text fontSize="2xl" fontWeight="bold" color="#f5f5f5">
            Edit Post
          </Text>
        </Flex>

        {/* Blog Posts */}
        <PostForm action="edit" post={postInfo} />
      </Box>
    </Box>
  );
};

export default EditPost;
