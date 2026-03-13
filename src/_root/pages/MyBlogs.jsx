import { Box, Flex, Icon, Loader, Text, VStack } from "@chakra-ui/react";
import { BookCheck, BookDashed, SquareLibrary } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Snowfall from "react-snowfall";
import { PostQuery } from "../../lib/tanstack_query/post";
import { BlogCard } from "../../components";
import { useInView } from "framer-motion";


const MyBlogs = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const publishedScrollRef = useRef(null);
  const draftsScrollRef = useRef(null);
  const { ref: publishRef, inView: publishView } = useInView({
    root: publishedScrollRef,
    amount: 0.1,
  });
  const { ref: draftRef, inView: draftView } = useInView({
    root: draftsScrollRef,
    amount: 0.1,
  });

  // QUERY...
  const {
    data: draftsPosts,
    hasNextPage: draftsHasNextPage,
    fetchNextPage: draftsFetchNextPage,
    isFetchingNextPage: draftsIsFetching,
  } = PostQuery.useGettingAllDraftsPosts();

  const {
    data: publishedPosts,
    hasNextPage: publishedHasNextPage,
    fetchNextPage: publishedFetchNextPage,
    isFetchingNextPage: publishedIsFetching,
  } = PostQuery.useGettingAllPublishedPostsOFCurrentUser();

  const allPublishedPosts = publishedPosts?.pages?.flatMap(
    (page) => page.data.posts
  );
  const allDraftedPosts = draftsPosts?.pages?.flatMap(
    (page) => page.data.posts
  );

  allPublishedPosts?.forEach((post, index) => {
    console.log(`  [${index}] ${post._id} - ${post.title}`);
  });
  const glassStyle = {
    bg: isAtTop ? "" : "rgba(255, 255, 255, 0.15)",
    backdropFilter: isAtTop ? "" : "blur(12px)",
    WebkitBackdropFilter: isAtTop ? "" : "blur(12px)",
    border: isAtTop ? "" : "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: isAtTop ? "" : "xl",
    boxShadow: isAtTop ? "" : "0 8px 32px rgba(0, 0, 0, 0.25)",
  };

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (publishedHasNextPage) {
      publishedFetchNextPage();
    }
  }, [publishView]);

  useEffect(() => {
    if (draftsHasNextPage) {
      draftsFetchNextPage();
    }
  }, [draftView]);

  return (
    <>
     
      {/* Main Content */}
      <Box
        ml={{ base: 0, lg: "280px" }}
        mr={{ base: 0, lg: "300px" }}
        pt={{ base: "70px", lg: 0 }}
        pb={{ base: "80px", lg: 0 }}
        minH="100vh"
      >
        <Box maxW="700px" mx="auto" p={6} position={"relative"}>
          {/* Header */}
          <Flex
            align="center"
            gap={2}
            mb={8}
            position={"fixed"}
            top={{
              base: "6rem",
              lg: "1.5rem",
            }}
            p="1rem 2rem"
            zIndex={4}
            {...glassStyle}
          >
            <Icon as={SquareLibrary} boxSize={6} color="#a3a3a3" />
            <Text fontSize="2xl" fontWeight="bold" color="#f5f5f5">
              My Blogs
            </Text>
          </Flex>

          <VStack gap={"4rem"} mt="4rem" color="gray">
            {/* Published Posts */}
            {allPublishedPosts && allPublishedPosts.length > 0 ? (
              <Box
                ref={publishedScrollRef}
                width={"100%"}
                height="700px"
                overflow={"auto"}
                p="1rem"
              >
                <Flex align="center" gap={2} mb={8}>
                  <Icon as={BookCheck} boxSize={6} color="#a3a3a3" />
                  <Text fontSize="xl" fontWeight="bold" color="#d4d4d4">
                    Published Posts
                  </Text>
                </Flex>
                <VStack gap={16} align="stretch">
                  {allPublishedPosts?.map((post, index) => (
                    <BlogCard
                      key={post?._id}
                      _id={post?._id}
                      author={post?.author}
                      title={post?.title}
                      excerpt={post?.excerpt}
                      slug={post?.slug}
                      coverImage={post?.coverImage}
                      createdAt={post?.createdAt}
                      index={index}
                      user={true}
                      isPublished={true}
                    />
                  ))}

                  {publishedHasNextPage && (
                    <Box
                      ref={publishRef}
                      as="div"
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      mt="5rem"
                    >
                      <Loader />
                    </Box>
                  )}
                </VStack>
              </Box>
            ):"No Published Posts"}

            {/* Drafts Posts */}

            {allDraftedPosts && allDraftedPosts.length > 0 ? (
              <Box
                height="700px"
                ref={draftsScrollRef}
                width={"100%"}
                overflow={"auto"}
                p="1rem"
              >
                <Flex align="center" gap={2} mb={8}>
                  <Icon as={BookDashed} boxSize={6} color="#a3a3a3" />
                  <Text fontSize="xl" fontWeight="bold" color="#d4d4d4">
                    Drafted Posts
                  </Text>
                </Flex>
                <VStack gap={16} align="stretch">
                  {allDraftedPosts?.map((post, index) => (
                    <BlogCard
                      key={post?._id}
                      {...post}
                      index={index}
                      user={true}
                      isPublished={false}
                    />
                  ))}
                </VStack>
                {draftsHasNextPage && (
                  <Box
                    as="div"
                    ref={draftRef}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    mt="5rem"
                  >
                    <Loader />
                  </Box>
                )}
              </Box>
            ):"No Draft Posts"}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default MyBlogs;
