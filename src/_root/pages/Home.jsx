import { Box, VStack, Text, Flex, Icon } from "@chakra-ui/react";
import { Sparkles } from "lucide-react";
import { BlogCard, Loader } from "../../components";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { PostQuery } from "../../lib/tanstack_query/post";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
  const { ref, inView } = useInView();
  const [savePostIds, setSavedPostIds] = useState(new Set());
  const { socket } = useAuthContext();
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
  } = PostQuery.useGetAllPublishedPost();

  const allPosts = posts?.pages?.flatMap((page) => page?.data.post) || [];

  const { data: savedPosts } = PostQuery.useGettingAllSavedPosts();
  const allSavedPosts = savedPosts?.pages.flatMap((page) => page?.data.posts);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (allSavedPosts && allSavedPosts.length > 0) {
      const newSet = new Set();
      for (const post of allSavedPosts) {
        newSet.add(post?.postId?._id);
      }
      setSavedPostIds(newSet);
    }
  }, [allSavedPosts?.length]);

  useEffect(() => {
    if (socket) {
      console.log("socket is updated");
    }
  }, [socket]);

  console.log("allPosts",allPosts)

  return (
    <>
      {/* <Snowfall /> */}
      {/* Main Content */}
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
            <Icon as={Sparkles} boxSize={6} color="#a3a3a3" />
            <Text fontSize="2xl" fontWeight="bold" color="#f5f5f5">
              Your Feed
            </Text>
          </Flex>

          {/* Blog Posts */}
          <VStack gap={16} align="stretch">
            {allPosts?.map((post, index) => (
              <BlogCard
                key={post?._id}
                {...post}
                index={index}
                savedCollection={savePostIds}
                setSavedPostIds={setSavedPostIds}
              />
            ))}
          </VStack>
        </Box>

        <Box>
          {hasNextPage && (
            <Box
              as="div"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              ref={ref}
              mt="5rem"
            >
              <Loader />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
