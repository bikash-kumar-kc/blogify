import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogCard, Loader } from "../../components";
import { PostQuery } from "../../lib/tanstack_query/post";
import { useInView } from "react-intersection-observer";

const SavedPosts = () => {
  const {
    data: savedPosts,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = PostQuery.useGettingAllSavedPosts();
  const allPosts = savedPosts?.pages?.flatMap((page) => page.data.posts);
  const { mutateAsync: toogleBookMark} =
    PostQuery.useTogglePostBookmark();
  const { ref, inView } = useInView();
  const [saved, setSaved] = useState(true);
  const [savedPostIds, setSavedPostIds] = useState(new Set());

  const handleToggleBookMark = async (postId) => {
    const saveToggle = await toogleBookMark({ postId: postId });
    if (!saveToggle) {
      console.log("problem in saving/unsaving post:: ");
      return;
    }

    setSaved(saveToggle?.data?.bookmarked);
    return;
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    console.log("allPosts",allPosts)
    if (allPosts && allPosts.length > 0) {
      const newSet = new Set();
      for (const post of allPosts) {
        newSet.add(post?.postId?._id);
      }
      setSavedPostIds(newSet);
    }
  }, [allPosts?.length]);

  if (isFetching && !allPosts) {
    return (
      <Box as="div" className="flex justify-center items-center min-h-screen">
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
          <Icon as={Save} boxSize={6} color="#a3a3a3" />
          <Text fontSize="2xl" fontWeight="bold" color="#f5f5f5">
            Saved Posts
          </Text>
        </Flex>

        {/* Blog Posts */}
        {allPosts && allPosts.length > 0 ? (
          <VStack gap={16} align="stretch">
            {allPosts.filter((each)=>each.postId)?.map((post, index) => {
              
              return (
              <BlogCard
                key={index + 1}
                {...post?.postId}
                index={index}
                saved={saved}
                handleSave={handleToggleBookMark}
                savedCollection={savedPostIds}
              />
            )
            })}
          </VStack>
        ) : (
          <div className="flex justify-center items-center min-h-screen text-gray-500">
            <p>no saved post...</p>
          </div>
        )}
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
  );
};

export default SavedPosts;
