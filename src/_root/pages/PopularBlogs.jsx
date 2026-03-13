import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChartNoAxesColumnIncreasing, Search, SortAsc } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { BlogCard } from "../../components";
import { PostQuery } from "../../lib/tanstack_query/post";

const MotionBox = motion(Box);

const PopularBlogs = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 300);
  console.log(debouncedSearchTerm + "debounce");
  const [searchBasedPosts, setSearchBasedPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  const { data: allPublishedPosts } = PostQuery.useGetAllPublishedPost(5);
  const allSavedPosts = allPublishedPosts?.pages.flatMap(
    (page) => page?.data?.post,
  );

  console.log(allSavedPosts);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const posts = allSavedPosts.filter((post) =>
        post.title?.includes(debouncedSearchTerm),
      );
      setSearchBasedPosts(posts);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (allSavedPosts && allSavedPosts.length > 0) {
      console.log(allSavedPosts.map((p) => p.views));
      const sortedPosts = [...allSavedPosts];
      sortedPosts.sort((a, b) => b.views - a.views);
      setPopularPosts(sortedPosts);
    }
  }, [allSavedPosts?.length]);

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
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Flex align="center" gap={2} mb={8}>
            <Icon
              as={ChartNoAxesColumnIncreasing}
              boxSize={6}
              color="#a3a3a3"
            />
            <Text fontSize="2xl" fontWeight="bold" color="#f5f5f5">
              Popular Posts
            </Text>
          </Flex>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1 * 0.1 }}
          display={"flex"}
          justifyContent={"flex-end"}
          width={"100%"}
        >
          <div className=" group  relative  flex   items-center gap-2 h-12 rounded-md  focus-within:border-[#22c55e] border bg-[#171717] transition duration-100">
            {/* icon */}
            <Box ml={3}>
              <Search
                size={18}
                className=" text-gray-400 transition group-focus-within:scale-125"
              />
            </Box>

            {/* input */}
            <Input
              name="name"
              type="text"
              bg="#171717"
              placeholder="Search Blogs..."
              className="w-full bg-transparent px-3 py-2 
                                                  focus:outline-none"
              border={"none"}
              outline={"none"}
              color={"white"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 2 * 0.1 }}
          display={"flex"}
          justifyContent={"space-between"}
          mt="4rem"
        >
          <Heading
            as="h1"
            color={"white"}
            letterSpacing={"0.05rem"}
            textDecoration={"underline"}
            mb={10}
          >
            Today Popular
          </Heading>
          <Box color={"gray.500"} display={"flex"} gap="1.5rem">
            <Text letterSpacing={"0.05rem"}>All</Text>
            <SortAsc />
          </Box>
        </MotionBox>

        {searchText && searchBasedPosts && searchBasedPosts.length > 0 && (
          <VStack gap={16} align="stretch" color="white">
            {searchBasedPosts?.map((post, index) => (
              <BlogCard
                key={post?._id}
                {...post}
                index={index}
                explore={true}
              />
            ))}
          </VStack>
        )}

        {!searchText && popularPosts && popularPosts.length > 0 ? (
          <VStack gap={16} align="stretch">
            {popularPosts?.map((post, index) => (
              <BlogCard
                key={post?._id}
                {...post}
                index={index}
                explore={true}
              />
            ))}
          </VStack>
        ) : (
          "No popular posts"
        )}
      </Box>
    </Box>
  );
};

export default PopularBlogs;
